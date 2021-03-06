/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import common from '../styles/common';
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

const Dashboard = () => {
  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <SafeAreaView>
            <HeaderView />
            <View>
                <Button primary text="Primary" />
            </View>
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;