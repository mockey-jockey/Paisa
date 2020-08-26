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
import ThemeContext, { themes } from './themeContext';
const Dashboard = () => {
  const [theme, setTheme] = useState(themes.default);

  const handlePress = () => {
    console.log("clicked");
    setTheme(themes.HDFC);
  }
  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <SafeAreaView>
            <HeaderView />
            <View>
                <Button primary text="Primary" onPress={handlePress} />
            </View>
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;