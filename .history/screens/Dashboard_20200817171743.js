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
import { Button, Card } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';

import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [lastSixMonths, setLastSixMonths] = useState([]);

  useEffect(() => {
    getTransactions();
    getLastSixMonths();
  },[]);

  const getLastSixMonths = () => {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var today = new Date();
    var d;
    var month = [];;


    for(var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month.push(monthNames[d.getMonth()+1]);
      
    }
    month = month.map((item) => item.substr(0,3)).reverse();
    month.unshift('Today');
    setLastSixMonths(month);
  }

  const getTransactions = () => {
    getSMS().then((data) => {
      setTransactions(data);
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

  const RenderMonths = () => {
    if(lastSixMonths.length){
      return <Text style={{display: "flex"}}>{lastSixMonths.map((item,index) => <Button primary text={item} key={index} style={{text:{textAlign:"right",fontFamily: 'lucida grande',}}} />)}</Text>
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