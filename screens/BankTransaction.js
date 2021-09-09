import React, {useState,useEffect,useContext} from 'react';
import {
  View,ScrollView,Image,
  Text,LogBox,FlatList
} from 'react-native';
import { Button,Divider } from 'react-native-material-ui';
import StatusLineView from '../components/StatusLineView';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomNavigation } from 'react-native-material-ui';
import ThemeContext from '../themeContext';
import BankNameObj from '../utils/bankNames';
import styles from '../styles/paisaStyle';
import { color } from 'react-native-reanimated';

const BankTransaction = (props) => {
  const [transactionDetails, setTransactionDetails] = useState({});
  const [selectedValue, setSelectedValue] = useState(props.route.params.selectedMonth);
  const [selectedDay, setSelectedDay] = useState('All');
  const [dates, setDates] = useState([]);
  const [active, setActive] = useState('All');
  const theme = useContext(ThemeContext);
  const goBack = () => {
    props.route.params.theme('default');
    props.navigation.goBack();
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'componentWillReceiveProps has been renamed, and is not recommended for use.'
  ]);

  useEffect(() => {
    getDates();
  },[selectedValue])
  
  const getMonth = (month) => {
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.indexOf(month.toUpperCase());
  }

  const getDates = () => {
    const today = new Date();
    const month = getMonth(selectedValue);
    const lastDayOfMonth = new Date(today.getFullYear(), month +1, 0).getDate();
    const values = ['All'];
    for(var i=1;i<=lastDayOfMonth;i++){
      values.push(i);
    }
    setDates(values);
    getTransactionsDate(null,'All');
  }
  const populateBankMessages = (transactions) => {
    let bankList = {};
    transactions.map((item) => {
        if(item.accountDetails.bankName === props.route.params.selectedBank){
          let bankName = item.accountDetails.bankName;
          if(!bankList[bankName]){
            bankList[bankName] = {
              transactions : [],
              income : [],
              expense : [],
              others : [],
              balance : []
            }
          }
          bankList[bankName].transactions.push(item);
          bankList[bankName].balance.push(item);
          if(item.type === 'credited'){
            bankList[bankName].income.push(item);
          }else if((item.type === 'debited' || item.type === 'withdrawn') && item.mode !== 'IMPS' && item.mode !== 'NEFT'){
            bankList[bankName].expense.push(item);
          }else if(item.type === 'debited' && item.mode === 'IMPS' && item.mode === 'NEFT'){
            bankList[bankName].others.push(item);
          } else{
            bankList[bankName].others.push(item);
          }
        }
    });
    // console.log(JSON.stringify(bankList));
    setTransactionDetails(bankList);
  }
  const _retrieveData = async (minDate,maxDate) => {
    try {
        const transactions = await AsyncStorage.getItem('transactions');
        if (transactions !== null) {
          let parsedTransactions = JSON.parse(transactions).filter((item) => {
            if(item.timestamp > minDate && item.timestamp < maxDate){
              return item
            }
          });
          populateBankMessages(parsedTransactions);
        }
    } catch (error) {
      console.log(`******${error}*******`);
    }
  } 
  const getTransactionsDate = (_this,day) => {
    setSelectedDay(day);
    if(day === 'All'){
      var month = getMonth(selectedValue);
      var today = new Date();
      var start = new Date(today.getFullYear(),month, 1).setHours(0,0,0,0);
      const lastDayOfMonth = new Date(today.getFullYear(), month +1, 0).getDate();
      var end = new Date(today.getFullYear(),month, lastDayOfMonth).setHours(23,59,59,999);
      _retrieveData(start,end);
    }else {
      var month = getMonth(selectedValue);
      var today = new Date();
      var start = new Date(today.getFullYear(),month, day).setHours(0,0,0,0);
      
      var end = new Date(today.getFullYear(),month, day).setHours(23,59,59,999);
      _retrieveData(start,end);
    }
  }
  const RenderDates = () => {
    const currentMonth = new Date().toDateString();
    let disableDate;
    if(currentMonth.indexOf(selectedValue) !== -1){
      disableDate = new Date().getDate();
    }
    if(dates.length){
      return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  style={styles(theme).scrollViewDates}>
        {dates.map((item,index) => {
          if((!disableDate && selectedDay === item) || (disableDate && selectedDay === item)){
            return (<Text primary key={index} style={styles(theme).selectedDates} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)
          }else if(!disableDate || disableDate >= item || item === 'All'){
            return (<Text primary key={index} style={styles(theme).dates} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)
          }else if(disableDate && disableDate < item){
            return (<Text primary key={index} style={styles(theme).disableDates}>{item}</Text>)
          }
        })}</ScrollView>
    }
    return <Text></Text>;
  }
  const renderItem = ({ item }) => {
    return (<View style={styles(theme).cardViewStyle}>
    <View style={styles(theme).leftElements}>
      <Text style={styles(theme).textColor}>{item.merchantName}</Text>
      <Text style={styles(theme).flexView}><Text style={styles(theme).dateColor}>{item.date}</Text> <Text>{item.mode && <View style={styles(theme).chipView}><Text
      style={styles(theme).chipViewText}
    >{item.mode}
    </Text></View>}</Text></Text>
    </View>
    <View style={styles(theme).rightElements}>
      <Text>₹ {item.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} <View style={styles(theme).transactionsTypeView}>{item.type === "credited" && <Icon name="sort-down" style={styles(theme).iconDown} />}{item.type === "debited" && <Icon name="sort-up" style={styles(theme).iconUp}/>}</View></Text>
      <Text>{item.accountDetails.type === 'account' && <Image
        style={styles(theme).bankLogo}
        source={BankNameObj[item.accountDetails.bankName].logo}
      />}{item.accountDetails.type === 'card' && <Text style={{color:theme.dark.secondaryColor}}>card</Text>} <Text style={styles(theme).dateColor}>{item.accountDetails.number}</Text></Text>
    </View>
  </View>)
  };

  const NoTransactions = () => <View style={styles(theme).noTransactions}><Text style={styles(theme).noTransactionText}>No Transactions</Text></View>;

  const RenderBankTransactions = ({type}) => {
    const banks = Object.keys(transactionDetails);
    const availBalance = props.route.params.availBalance;
    console.log(type)
    if(banks.length){
      return (<View style={styles(theme).flexView}>{banks.map((item,index) => {
        const transactions = transactionDetails[item][type];
        if(transactions.length){
          let total = transactions.map((item) => item.amount);
          total = total.length ? total.reduce((a,b) => a+b) : 0;
          return (<View key={index} style={{flex:1,display:'flex',flexDirection:'column',backgroundColor:'#fff'}}>
                <View style={styles(theme).transactionsHeader}>
                  <Text testID={item} key={index} style={styles(theme).bankName}><Image
                  style={styles(theme).bankLogo}
                  source={BankNameObj[item].logo}
                /> {BankNameObj[item].name}</Text>
                {availBalance.length > 0 && <Text testID={item} style={styles(theme).bankBalance} key={`${index} balance`}>Avail Bal. ₹ {availBalance.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>}
              </View>
              <Divider/>
              <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>
              <View style={styles(theme).totalView}>
                <Text key={`${index} total`} style={styles(theme).totalText}>Total</Text>
                <Text key={`${index} amt`} style={styles(theme).totalValue}>₹ {total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
              </View>
            </View>)
        }else{
          return <NoTransactions key={index}/>;
        }
      })
      }</View>)
    }
    return <NoTransactions />;
  }

  const setSelectedMonth = (_this,month) => {
    setSelectedValue(month);
  }

  const RenderMonths = () => {
    if(props.route.params.months.length){
      return <View style={styles(theme).monthView}>{props.route.params.months.map((item,index) => {
        return (selectedValue===item ? <Text primary testID={item} key={index} style={styles(theme).selectedMonth} onPress={() => setSelectedMonth(this, item)}>{item}</Text> : <Text primary testID={item} key={index} style={styles(theme).monthViewText} onPress={() => setSelectedMonth(this, item)}>{item}</Text>) 
      })}</View>
    }
    return <Text></Text>;
  }
 
  return (
    <View style={styles(theme).container}>
        <View style={styles(theme).headerViewStyle}>
          <Button default icon={<Icon name="arrow-left" size={20} color="#fff" />} text="" onPress={goBack}/>
        </View>
        <View>
          <StatusLineView selectedMonth={props.route.params.selectedMonth} lastSixMonthsExpanse={props.route.params.lastSixMonthsExpanse} monthLabels={props.route.params.months}/>
        </View>
        <View>
          <RenderMonths />
        </View>
        <View>
          <RenderDates />
        </View>
        <View style={styles(theme).flexView}>
          {active === 'All' && <RenderBankTransactions type="transactions" />}
          {active === 'Income' && <RenderBankTransactions type="income" />}
          {active === 'Expense' && <RenderBankTransactions type="expense" />}
          {active === 'Others' && <RenderBankTransactions type="others" />}
        </View>
        <View style={{bottom:0}}>
          <BottomNavigation active={active} hidden={false} >
            <BottomNavigation.Action
                key="All"
                icon="today"
                label="All"
                style={{
                  icon:{
                    color: active === 'All' ? theme.light.primaryColor : theme.light.secondaryColor
                  },
                  label: active === 'All' ? {
                    color: theme.dark.primaryColor,
                    fontFamily: 'Roboto-Bold',
                    width:50
                  } : {
                    color: theme.light.primaryColor,
                    width:50
                  }
                }}
                onPress={() => setActive('All')}
            />
            <BottomNavigation.Action
                key="Income"
                icon="people"
                label="Income"
                style={{
                  icon:{
                    color: active === 'Income' ? theme.light.primaryColor : theme.light.secondaryColor
                  },
                  label: active === 'Income' ? {
                    color: theme.dark.primaryColor,
                    fontFamily: 'Roboto-Bold',
                    width:50
                  } : {
                    color: theme.dark.secondaryColor,
                    width:50
                  }
                }}
                onPress={() => setActive('Income')}
            />
            <BottomNavigation.Action
                key="Expense"
                icon="bookmark-border"
                label="Expense"
                style={{
                  icon:{
                    color: active === 'Expense' ? theme.light.primaryColor : theme.light.secondaryColor
                  },
                  label: active === 'Expense' ? {
                    color: theme.dark.primaryColor,
                    fontFamily: 'Roboto-Bold',
                  } : {
                    color: theme.dark.secondaryColor,
                  }
                }}
                onPress={() => setActive('Expense')}
            />
            <BottomNavigation.Action
                key="Others"
                icon="settings"
                label="Others"
                style={{
                  icon:{
                    color: active === 'Others' ? theme.light.primaryColor : theme.light.secondaryColor
                  },
                  label: active === 'Others' ? {
                    color: theme.dark.primaryColor,
                    fontFamily: 'Roboto-Bold',
                    width:50
                  } : {
                    color: theme.dark.secondaryColor,
                    width:50
                  }
                }}
                onPress={() => setActive('Others')}
            />
          </BottomNavigation>
        </View>
    </View>
  );
};



export default BankTransaction;