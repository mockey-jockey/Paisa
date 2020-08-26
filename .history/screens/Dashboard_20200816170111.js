/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import styles from './scanStyle';
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Dashboard = (props) => {
  const {transactions, setTransactions} = useState([]);

  useEffect(() => {
    getSMS().then((data)=> {
      setTransactions(data)
    },(error) => {

    })
  },[])
  const renderItem = ({ item }) => (
    <Item title={item.title} />
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
            <HeaderView />
            <View>
                <Button default text="Default" onPress={handlePress} />
                <Button primary text="HDFC" onPress={handlePress1} />
            </View>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
    </View>
  );
};



export default Dashboard;