/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import styles from './scanStyle';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import utils from '../utils/message';
import { ListItem } from 'react-native-material-ui';
const Dashboard = (props) => {
  const {transactions, setTransactions} = useState([]);
  
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
            <View>
            <ListItem
            divider
            leftElement={{
              element: <View><Text>merchant name</Text></View>
            }}
            centerElement={{
              primaryText: 'Primary text',
            }}
            onPress={() => {}}
          />
            </View>
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;