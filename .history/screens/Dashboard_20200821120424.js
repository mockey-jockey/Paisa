/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import styles from './scanStyle';
import card from '../styles/card';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button, Card } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';

import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [lastSixMonths, setLastSixMonths] = useState([]);

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
      month = month.map((item) => item.substr(0,3)).reverse();
      month.unshift('Today');
      setLastSixMonths(month);
      
      var lstMonth = getMonth(month[month.length-1]);
      var today = new Date();
      var start = startDay(today.getFullYear(),lstMonth);

      getTransactions(start.getTime(),new Date().getTime());
    } catch(error) {
      console.log(`******${error}*******`);
    }
  }

  const getTransactionsDate = (_this,month) => {
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
      _retrieveData(start.getTime(),end.getTime());
    }
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
        const value = await AsyncStorage.getItem('transactions');
        if (value !== null) {
            // Our data is fetched successfully
            console.log(value);
        }
    } catch (error) {
      console.log(`******${error}*******`);
    }
}

  const getTransactions = (minDate,maxDate) => {
    getSMS(minDate,maxDate).then((data) => {
      _storeData(JSON.stringify(data));
    }).catch((error)=>{
      console.log(error.message);
    });
  }

  const renderItem = ({ item }) => (
    <View style={card().cardViewStyle}>
      <View style={card().leftElements}>
        <Text style={{}}>{item.merchantName}</Text>
        <Text style={{}}>{item.date} <Text>{item.mode}</Text></Text>
      </View>
      <View style={card().rightElements}>
        <Text style={{textAlign:'right'}}>{item.amount} {item.type === "credited" && <Icon name="sort-down" />}{item.type === "debited" && <Icon name="sort-up"  />}</Text>
        <Text style={{textAlign:'right'}}>{item.accountDetails.type} <Text>{item.accountDetails.number}</Text></Text>
      </View>
    </View>
  );
  

  const handlePress = () => {
    console.log("clicked handlePress");
    props.theme('default');
  }
  const handlePress1 = () => {
    console.log("clicked handlePress");
    props.theme('HDFC');
  }
  // <Button default text="Default" onPress={handlePress} />
  // <Button primary text="HDFC" onPress={handlePress1} />
  // <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{display:'flex',flexDirection:'row'}}>{lastSixMonths.map((item,index) => <Text primary text={item} key={index} style={{display:'flex',borderColor:'red',borderWidth:1}}>{item}</Text>)}</ScrollView>
  const RenderMonths = () => {
    if(lastSixMonths.length){
      return <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>{lastSixMonths.map((item,index) => <Text primary testID={item} key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)}</View>
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
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.index}
          />
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;