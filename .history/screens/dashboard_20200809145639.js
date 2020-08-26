/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import styles from './scanStyle'
// import SendSMSContainer from './SendSMSContainer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';

const Dashboard = () => {
  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <SafeAreaView>
            <Header />
            <View>
                <Button primary text="Primary" />
            </View>
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;