import React, {useState,useEffect,useContext} from 'react';
import {
  View,ScrollView,
  Text,LogBox,FlatList
} from 'react-native';
import card from '../styles/card';
import {Picker} from '@react-native-community/picker';
import { Button,Card,Divider } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomNavigation } from 'react-native-material-ui';
import ThemeContext from '../themeContext';


const BankTransaction = (props) => {
  const [transactionDetails, setTransactionDetails] = useState({});
  const [selectedValue, setSelectedValue] = useState(props.route.params.selectedMonth);
  const [selectedDay, setSelectedDay] = useState('All');
  const [dates, setDates] = useState([]);
  const [active, setActive] = useState('');
  const theme = useContext(ThemeContext);
  const { primaryColor } = theme.palette;
  const goBack = () => {
    props.route.params.theme('default');
    props.navigation.goBack();
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  
  useEffect(() => {
    getDates();
  },[selectedValue])
  
  const getMonth = (month) => {
    console.log("_____________",month)
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.indexOf(month.toUpperCase());
  }

  const getDates = () => {
    const today = new Date();
    const month = getMonth(selectedValue);
    const lastDayOfMonth = new Date(today.getFullYear(), month +1, 0).getDate();
    const values = [];
    for(var i=1;i<=lastDayOfMonth;i++){
      values.push(i);
    }
    values.unshift('All');
    setDates(values);
    setSelectedDay('All');
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
              expanse : [],
              others : [],
            }
          }
          bankList[bankName].transactions.push(item);
          if(item.type === 'credited'){
            bankList[bankName].income.push(item);
          }
          if(item.type === 'debited' && item.mode !== 'IMPS' && item.mode !== 'NEFT'){
            bankList[bankName].expanse.push(item);
          }
          if(item.type === 'withdrawn' || (item.type === 'debited' && item.mode === 'IMPS' && item.mode === 'NEFT')){
            bankList[bankName].others.push(item);
          }
        }
    });
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
      return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  style={{display:'flex',flexDirection:'row'}}>
        {dates.map((item,index) => {
          if(!disableDate || disableDate >= item){
            return (<Text primary key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)
          }else if(disableDate && disableDate < item){
            return (<Text primary key={index} style={{display:'flex',justifyContent:'center',padding:10,color:'red'}}>{item}</Text>)
          }
        })}</ScrollView>
    }
    return <Text></Text>;
  }
  const renderItem = ({ item }) => {
    return (<View style={card().cardViewStyle}>
    <View style={card().leftElements}>
      <Text style={{}}>{item.merchantName}</Text>
      <Text style={{}}>{item.date} <Text>{item.mode}</Text></Text>
    </View>
    <View style={card().rightElements}>
      <Text style={{textAlign:'right'}}>{item.amount} {item.type === "credited" && <Icon name="sort-down" />}{item.type === "debited" && <Icon name="sort-up"  />}</Text>
      <Text style={{textAlign:'right'}}>{item.accountDetails.type} <Text>{item.accountDetails.number}</Text></Text>
    </View>
  </View>)
  };

  const RenderBankTransactions = ({type}) => {
    const banks = Object.keys(transactionDetails)
    if(banks.length){
      return (<View style={{flex:1}}>{banks.map((item,index) => {
        const transactions = transactionDetails[item][type];
        const balance = transactionDetails[item].expanse.map((item) => item.availBalance).filter(item => item);
        return (<View key={index} style={{flex:1,display:'flex',flexDirection:'column',backgroundColor:'#fff'}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <Text testID={item} key={index}>{item}</Text>
              <Text testID={item} key={`${index} balance`}>{balance.length && balance[0]}</Text>
            </View>
            <Divider/>
            <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <Text key={`${index} total`}>Total</Text>
              <Text key={`${index} amt`}>{transactions.reduce((a,b) => a+b)}</Text>
            </View>
          </View>)
      })
      }</View>)
    }
    return <View style={{flex:1,display:'flex',flexDirection:'column',backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:20,opacity:0.5}}>No Transactions</Text></View>;
  }

  const setSelectedMonth = (_this,month) => {
    setSelectedValue(month);
  }

  const RenderMonths = () => {
    if(props.route.params.months.length){
      return <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>{props.route.params.months.map((item,index) => <Text primary testID={item} key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => setSelectedMonth(this, item)}>{item}</Text>)}</View>
    }
    return <Text></Text>;
  }
  // <Picker
  //           selectedValue={selectedValue}
  //           style={{ height: 50, width: 150 }}
  //           onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  //         >
  //           {props.route.params.months.map((item,index) => <Picker.Item key={index} label={item} value={item} />)}
  //         </Picker>
  return (
    <View style={{flex:1}}>
        <View style={{backgroundColor:primaryColor,alignItems:'flex-start'}}>
          <Button default icon={<Icon name="arrow-left" size={20} color="#fff" />} text="" onPress={goBack}/>
        </View>
        <View>
          <StatusBarView />
        </View>
        <View>
          <RenderMonths />
        </View>
        <View>
          <RenderDates />
        </View>
        <View style={{flex:1}}>
          {active === 'All' && <RenderBankTransactions type="transactions" />}
          {active === 'Income' && <RenderBankTransactions type="income" />}
          {active === 'Expanse' && <RenderBankTransactions type="expanse" />}
          {active === 'Others' && <RenderBankTransactions type="others" />}
        </View>
        <View style={{bottom:0}}>
          <BottomNavigation active={active} hidden={false} >
            <BottomNavigation.Action
                key="All"
                icon="today"
                label="All"
                onPress={() => setActive('All')}
            />
            <BottomNavigation.Action
                key="Income"
                icon="people"
                label="Income"
                onPress={() => setActive('Income')}
            />
            <BottomNavigation.Action
                key="Expanse"
                icon="bookmark-border"
                label="Expanse"
                onPress={() => setActive('Expanse')}
            />
            <BottomNavigation.Action
                key="Others"
                icon="settings"
                label="Others"
                onPress={() => setActive('Others')}
            />
          </BottomNavigation>
        </View>
    </View>
  );
};



export default BankTransaction;