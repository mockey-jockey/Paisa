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
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';

//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  },[]);

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
        <Text style={{}}>{item.amount} <Text><Icon name="adb" backgroundColor="#3b5998" />{item.type}</Text></Text>
        <Text style={{}}>{item.accountDetails.type} <Text>{item.accountDetails.number}</Text></Text>
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

  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <SafeAreaView>
          <HeaderView />
          <View>
              <Button default text="Default" onPress={handlePress} />
              <Button primary text="HDFC" onPress={handlePress1} />
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