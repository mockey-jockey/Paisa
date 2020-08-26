/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import ThemeContext, { themes } from 'react-native-material-ui';
import DashBoard from './screens/dashboard';
// you can set your style right here, it'll be propagated to application


const App = () => {
  return (
    <ThemeContext.Provider value={themes.default}>
      <DashBoard />
    </ThemeContext.Provider>
  );
};



export default App;