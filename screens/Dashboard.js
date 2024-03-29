import React, { useState, useEffect,useContext } from 'react';
import styles from '../styles/paisaStyle';
import {
  Image,
  ScrollView,
  View,
  StatusBar,
  Text,
  PermissionsAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ThemeContext from '../themeContext';
import { Button,Divider } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';
import Icon from 'react-native-vector-icons/FontAwesome';
import BankNameObj from '../utils/bankNames';

const Dashboard = (props) => {
  const [transactionDetails, setTransactionDetails] = useState({});
  const [lastSixMonths, setLastSixMonths] = useState([]);
  const [lastSixMonthsExpanse, setLastSixMonthsExpanse] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [readAccess, setReadAccess] = useState(false);
  const [availBalance, setAvailBalance] = useState({});
  const theme = useContext(ThemeContext);
  const requestSMSPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "READ Bank SMS",
            message: "To read only bank transactions messages",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setReadAccess(true);
          return true;
        } else {
          setReadAccess(false);
          return false;
        }
      } catch (err) {
        setReadAccess(false);
        console.warn(err);
        return false;
      }
  };
  
  /*
  Calculate dynamic width and height using image url
  useEffect(() => {
      Image.getSize(this.props.uri, (width, height) => {
        if (this.props.width && !this.props.height) {
            this.setState({
                width: this.props.width,
                height: height * (this.props.width / width)
            });
        } else if (!this.props.width && this.props.height) {
            this.setState({
                width: width * (this.props.height / height),
                height: this.props.height
            });
        } else {
            this.setState({ width: width, height: height });
        }
    });
  }))*/

  useEffect(() => {
    if(readAccess){
      getLastSixMonthsData();
    }else{
      requestSMSPermission()
    }
  },[readAccess]);

  const startDay = (y,m) => {
    if(new Date() < new Date(y,m,0)){
      return new Date(y-1,m, 1).setHours(0,0,0,0);
    }else{
      return new Date(y,m, 1).setHours(0,0,0,0);
    }
  }

  const lastDay = (y,m) => {
    if(new Date() < new Date(y,m,0)){
      return  new Date(y-1, m +1, 0).getDate();
    }else{
      return  new Date(y, m +1, 0).getDate();
    }
  }

  const getMonth = (month) => {
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.indexOf(month.toUpperCase());
  }

  const getLastSixMonthsData = async () => {
    try {
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      var today = new Date();
      var d;
      var month = [];

      for(var i = 6; i > 0; i -= 1) {
        d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        var num = d.getMonth()+1;
        num = num === 12 ? 0 : num;
        var isValidMonth = monthNames[num];
        if(isValidMonth){
          month.push(monthNames[num]);
        }else{
          month.push(monthNames[i-1]);
        }
      }
      //console.log(month,"****")
      month = month.map((item) => item.substr(0,3));
      //month = month.map((item) => item.substr(0,3)).reverse();
      //month.unshift('Today');
      setLastSixMonths(month);
      setSelectedMonth(month[month.length-1]);

      var previousSixthMonth = getMonth(month[0]);
      var start = startDay(today.getFullYear(),previousSixthMonth);
      getTransactions(start,new Date().getTime(),month);
    } catch(error) {
      console.log(`******${error}*******1`);
    }
  }

  const getTransactionsDate = (_this,month) => {
    setSelectedMonth(month);
    if(month === 'Today'){
      var start = new Date();
      start.setHours(0,0,0,0);
      _retrieveData(start.getTime(),new Date().getTime());
    }else {
      var month = getMonth(month);
      var today = new Date();
      var year = today.getFullYear();
      var start = startDay(today.getFullYear(),month);
      if(new Date() < new Date(year,month,0)){
        year = year - 1;
      }
      var end = new Date(year, month, lastDay(today.getFullYear(),month));
      end.setHours(23,59,59,999);
      _retrieveData(start,end.getTime());
    }
  }

  const populateBankMessages = (transactions) => {
    let bankList = {};
    transactions.map((item) => {
        let bankName = item.accountDetails.bankName;
        if(!bankList[bankName]){
          bankList[bankName] = {
            transactions : [],
            credits : [],
            debits : [],
            balance : []
          }
        }
        // if(bankName === "ICICI"){
        //   console.log(item.message)
        // }
        // console.log("************")
        // console.log(item.message)
        // console.log("************")
        bankList[bankName].transactions.push(item);
        bankList[bankName].balance.push(item);
        if(item.type === 'credited'){
          bankList[bankName].credits.push(item.amount);
        }
        if(item.type === 'debited' || item.type === 'withdrawn'){
          bankList[bankName].debits.push(item.amount);
        }
    });
    setTransactionDetails(bankList);
  }

  const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('transactions', data);
      } catch (error) {
          console.log(`******${error}*******2`);
      }
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
      console.log(`******${error}*******3`);
    }
  } 

  const getLastSixMonthExpanse = (transactions,sixMonths) => {
      var expense = [];
      var currentBalance = {};
      for(var i=0;i<sixMonths.length;i++){
        var today = new Date();
        var month = getMonth(sixMonths[i]);
        let minDate = startDay(today.getFullYear(),month);;
        let maxDate = new Date(today.getFullYear(),month, lastDay(today.getFullYear(),month));
        maxDate.setHours(23,59,59,999);
        var bankObj = {};
        for(var j=0;j<transactions.length;j++){
          var item = transactions[j];
          let bankName = item.accountDetails.bankName;
          if(!bankObj[bankName]){
            bankObj[bankName] = 0;
          }
          if(!currentBalance[bankName]){
            currentBalance[bankName] = [];
          }
          if(item.availBalance && Array.isArray(currentBalance[bankName])){
            currentBalance[bankName][currentBalance[bankName].length] = item.availBalance;
          }
          if((item.type === 'debited'|| item.type === 'withdrawn') && item.mode !== 'NEFT' && item.mode !== 'IMPS' && item.timestamp > minDate && item.timestamp < maxDate.getTime()){
            bankObj[bankName] +=item.amount;
          }
        }
        expense.push(bankObj)
      }
      setAvailBalance(currentBalance);
      setLastSixMonthsExpanse(expense);
  }

  const getTransactions = (minDate,maxDate,month) => {
    getSMS(minDate,maxDate).then((data) => {
      getLastSixMonthExpanse(data,month);
      _storeData(JSON.stringify(data));
      var today = new Date();
      var lstMonth = getMonth(month[month.length-1]);
      var start = startDay(today.getFullYear(),lstMonth);
      _retrieveData(start,today.getTime());
    }).catch((error)=>{
      console.log(error.message);
    });
  }

  // const renderItem = ({ item }) => {
  //   return (<View style={styles(theme).cardViewStyle}>
  //   <View style={styles(theme).leftElements}>
  //     <Text style={{}}>{item.merchantName}</Text>
  //     <Text style={{}}>{item.date} <Text>{item.mode}</Text></Text>
  //   </View>
  //   <View style={styles(theme).rightElements}>
  //     <Text style={{textAlign:'right'}}>{item.amount} {item.type === "credited" && <Icon name="sort-down" />}{item.type === "debited" && <Icon name="sort-up"  />}</Text>
  //     <Text style={{textAlign:'right'}}>{item.accountDetails.type} <Text>{item.accountDetails.number}</Text></Text>
  //   </View>
  // </View>)
  // };

  const handlePress = () => {
    console.log("clicked handlePress");
    props.route.params.theme('default');
  }
  const handlePress1 = () => {
    console.log("clicked handlePress");
    props.route.params.theme('HDFC');
  }

  const viewTransactions = (_this,selectedBank) => {
    props.route.params.theme(selectedBank || 'default');
    props.navigation.navigate('BankTransaction',{
      theme:props.route.params.theme,
      months: lastSixMonths,
      selectedMonth,
      lastSixMonthsExpanse: JSON.stringify(lastSixMonthsExpanse.map((item) => item[selectedBank])),
      selectedBank,
      availBalance : availBalance[selectedBank].length && availBalance[selectedBank][0]
    });
  }
  // <Button default text="Default" onPress={handlePress} />
  // <Button primary text="HDFC" onPress={handlePress1} />
  // <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{display:'flex',flexDirection:'row'}}>{lastSixMonths.map((item,index) => <Text primary text={item} key={index} style={{display:'flex',borderColor:'red',borderWidth:1}}>{item}</Text>)}</ScrollView>
  // <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>

  const RenderMonths = () => {
    if(lastSixMonths.length){
      return <View style={styles(theme).monthView}>{lastSixMonths.map((item,index) => {
        return (selectedMonth===item ? <Text primary testID={item} key={index} style={styles(theme).selectedMonth} onPress={() => getTransactionsDate(this, item)}>{item}</Text> : <Text primary testID={item} key={index} style={styles(theme).monthViewText} onPress={() => getTransactionsDate(this, item)}>{item}</Text>) 
      })}</View>
    }
    return <Text></Text>;
  }
  
  // <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>
  const RenderBankTransactions = () => {
    const banks = Object.keys(transactionDetails)
    if(banks.length){
      return (<View style={styles(theme).flexView}>{banks.map((item,index) => {
        const transactions = transactionDetails[item].transactions.slice(0,5);
        //const balance = transactionDetails[item].balance.map((item) => item.availBalance).filter(item => item);
        return (<View style={(banks.length-1 === index) ? styles(theme).lastTransactionsView : styles(theme).transactionsView} key={index}>
            <View style={styles(theme).transactionsHeader}>
              <Text testID={item} key={index} style={styles(theme).bankName}><Image
              style={styles(theme).bankLogo}
              source={BankNameObj[item].logo}
            /> {BankNameObj[item].name}</Text>
            {availBalance[item] && availBalance[item].length > 0 && <Text testID={item} style={styles(theme).bankBalance} key={`${index} balance`}>Avail Bal. ₹ {availBalance[item][0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>}
            </View>
            <Divider/>
            <View>
              {transactions.length && transactions.map((item,index) => {
                return (<View key={index} style={styles(theme).cardViewStyle}>
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
            })}
            </View>
            <Divider/>
            <View style={styles(theme).transactionsFooter}>
              {/*<View style={{flex:1,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Icon name="angle-double-right" size={20} color={theme.dark.primaryColor} /></View>*/} 
              <Text style={styles(theme).transactionsFooterTxt} onPress={() => viewTransactions(this,item)}>View Transactions</Text>
            </View>
          </View>)
      })
      }</View>)
    }
    return <Text></Text>;
  }
    
  const NoTransactions = () => {
    return (<View style={{flex:1,backgroundColor:"white",paddingTop:10}}><Image style={styles(theme).noTransactionsImage} source={require('../logo/noTransaction.png')} /><View style={styles(theme).noTransactions}>
      <Text style={styles(theme).noTransactionText}>Sorry, no transactions found</Text>
      <Text style={styles(theme).subText}>Kindly try with different months</Text>
    </View></View>);
  };
  const TransactionView = () => {
    const banks = Object.keys(transactionDetails)
    
      return (<View style={{flex:1}}>
        <StatusBar backgroundColor={theme.dark.primaryColor} />
        {banks.length > 0 ? <StatusBarView transactions={transactionDetails} /> : <Image resizeMode="contain" style={styles(theme).headerImage} source={require('../logo/header.png')} />}
        <HeaderView />
        <View>
            <RenderMonths />
        </View>
        {banks.length > 0 ? <ScrollView>
          <RenderBankTransactions />
        </ScrollView> : <NoTransactions />}
      </View>)
  }

  return (
    <View style={styles(theme).container}>
        {readAccess ? <TransactionView /> : <View style={styles(theme).enableAccessView}><Text style={styles(theme).enableAccessText}>Enable to read bank transactions messages!</Text><Button primary raised text="Read SMS" onPress={requestSMSPermission}/></View>}
    </View>
  );
};



export default Dashboard;