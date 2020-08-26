import React, {useState,useEffect} from 'react';
import {
  View,ScrollView,
  Text,LogBox
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import AsyncStorage from '@react-native-community/async-storage';

const BankTransaction = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(props.route.params.selectedMonth);
  const [selectedDay, setSelectedDay] = useState('All');
  const [dates, setDates] = useState([]);
  
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
    let bankList = [];
    transactions.map((item) => {
        let bankName = item.accountDetails.bankName;
        if(bankName === props.route.params.selectedBank){
          bankList.push(item);
        }
    });
    setTransactions(bankList);
    console.log(bankList);
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
      return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  style={{display:'flex',flexDirection:'row'}}>{dates.map((item,index) => <Text primary key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)}</ScrollView>
    }
    return <Text></Text>;
  }
  return (
    <View>
        <StatusBarView />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {props.route.params.months.map((item,index) => <Picker.Item key={index} label={item} value={item} />)}
        </Picker>
        <View>
             <RenderDates />
        </View>
        <Button default text="Create post" onPress={goBack}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;