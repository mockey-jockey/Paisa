import React, { useState, useEffect } from 'react';
import styles from '../styles/scanStyle';
import card from '../styles/card';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button, Card,Divider } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';

import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = (props) => {
  const [transactionDetails, setTransactionDetails] = useState({});
  const [lastSixMonths, setLastSixMonths] = useState([]);
  const [lastSixMonthsExpanse, setLastSixMonthsExpanse] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    getLastSixMonthsData();
  },[]);

  const startDay = (y,m) => {
    return new Date(y,m, 1).setHours(0,0,0,0);
  }

  const lastDay = (y,m) => {
    return  new Date(y, m +1, 0).getDate();
  }

  const getMonth = (month) => {
    console.log("_____________",month)
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
        month.push(monthNames[d.getMonth()+1]);
      }
      month = month.map((item) => item.substr(0,3));
      //month = month.map((item) => item.substr(0,3)).reverse();
      //month.unshift('Today');
      setLastSixMonths(month);
      setSelectedMonth(month[month.length-1]);

      var previousSixthMonth = getMonth(month[0]);
      var start = startDay(today.getFullYear(),previousSixthMonth);
      getTransactions(start,new Date().getTime(),month[month.length-1]);
    } catch(error) {
      console.log(`******${error}*******`);
    }
  }

  const getTransactionsDate = (_this,month) => {
    console.log(month)
    setSelectedMonth(month);
    if(month === 'Today'){
      var start = new Date();
      start.setHours(0,0,0,0);
      _retrieveData(start.getTime(),new Date().getTime());
    }else {
      var month = getMonth(month);
      var today = new Date();
      var start = startDay(today.getFullYear(),month);
      
      var end = new Date(today.getFullYear(), month, lastDay(today.getFullYear(),month));
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
            income : [],
            expanse : [],
            withdrawn : []
          }
        }
        bankList[bankName].transactions.push(item);
        if(item.type === 'credited'){
          bankList[bankName].income.push(item);
        }
        if(item.type === 'debited'){
          bankList[bankName].expanse.push(item);
        }
        if(item.type === 'withdrawn'){
          bankList[bankName].withdrawn.push(item);
        }
    });
    setTransactionDetails(bankList);
  }

  const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('transactions', data);
      } catch (error) {
          console.log(`******${error}*******`);
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
      console.log(`******${error}*******`);
    }
  } 

  const getLastSixMonthExpanse = (transactions) => {
      var expanse = [];
      for(var i=0;i<lastSixMonths.length;i++){
        var today = new Date();
        var month = getMonth(lastSixMonths[i]);
        let minDate = startDay(today.getFullYear(),month);;
        let maxDate = new Date(today.getFullYear(),month, lastDay(today.getFullYear(),month));
        maxDate.setHours(23,59,59,999);
        let expanseAmount = transactions.map((item) => {
          let bankName = item.accountDetails.bankName;
          if(bankName === 'HDFC' && (item.type === 'debited'|| item.type === 'withdrawn') && item.timestamp > minDate && item.timestamp < maxDate.getTime()){
            return item.amount;
          }
        });
        expanse.push(expanseAmount.filter((item) => item).reduce((a,b) => a+b));
      }
      
      console.log(expanse);
      setLastSixMonthsExpanse(expanse);
  }

  const getTransactions = (minDate,maxDate,month) => {
    getSMS(minDate,maxDate).then((data) => {
      _storeData(JSON.stringify(data));
      getLastSixMonthExpanse(data);
      var today = new Date();
      var lstMonth = getMonth(month);
      var start = startDay(today.getFullYear(),lstMonth);
      _retrieveData(start,today.getTime());
    }).catch((error)=>{
      console.log(error.message);
    });
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

  const handlePress = () => {
    console.log("clicked handlePress");
    props.route.params.theme('default');
  }
  const handlePress1 = () => {
    console.log("clicked handlePress");
    props.route.params.theme('HDFC');
  }

  const viewTransactions = (_this,item) => {
    props.route.params.theme(item);
    props.navigation.navigate('BankTransaction',{
      theme:props.route.params.theme,
      months: lastSixMonths,
      selectedMonth,
      selectedBank: item
    });
  }
  // <Button default text="Default" onPress={handlePress} />
  // <Button primary text="HDFC" onPress={handlePress1} />
  // <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{display:'flex',flexDirection:'row'}}>{lastSixMonths.map((item,index) => <Text primary text={item} key={index} style={{display:'flex',borderColor:'red',borderWidth:1}}>{item}</Text>)}</ScrollView>
  // <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>

  const RenderMonths = () => {
    if(lastSixMonths.length){
      return <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>{lastSixMonths.map((item,index) => <Text primary testID={item} key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)}</View>
    }
    return <Text></Text>;
  }

  const RenderBankTransactions = () => {
    const banks = Object.keys(transactionDetails)
    if(banks.length){
      return (<View>{banks.map((item,index) => {
        const transactions = transactionDetails[item].transactions.slice(0,5);
        const balance = transactionDetails[item].expanse.map((item) => item.availBalance).filter(item => item);
        return (<Card key={index}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <Text testID={item} key={index}>{item}</Text>
              <Text testID={item} key={`${index} balance`}>{balance.length && balance[0]}</Text>
            </View>
            <Divider/>
            <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.index}/>
            <Divider/>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:10}}>
              <Text onPress={() => viewTransactions(this,item)} testID={item} key={`${index} balance`}>View Transactions <Icon name="angle-double-right" size={20} color="#000" /></Text>
            </View>
          </Card>)
      })
      }</View>)
    }
    return <Text></Text>;
  }
    
  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <SafeAreaView>
          <HeaderView />
          <View>
             <RenderMonths />
          </View>
          <RenderBankTransactions />
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;