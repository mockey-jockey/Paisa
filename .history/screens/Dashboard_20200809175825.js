/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useContext } from 'react';
import styles from './scanStyle';
// import SendSMSContainer from './SendSMSContainer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
const Dashboard = (props) => {

  const handlePress = () => {
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
                <Button primary text="HDFC" onPress={handlePress} />
                <Button secondary text="ICIC" onPress={handlePress} />
            </View>
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;