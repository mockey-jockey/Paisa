/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import SendSMSContainer from './screens/SendSMSContainer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { COLOR, ThemeContext, getTheme,Button } from 'react-native-material-ui';
// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};
const App = () => {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
    <View>
      <Button primary text="Primary" />
    </View>
    </ThemeContext.Provider>
  );
};



export default App;