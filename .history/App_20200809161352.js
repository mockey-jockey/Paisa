/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

// import { COLOR, ThemeContext, getTheme,Button } from 'react-native-material-ui';
import DashBoard from './screens/Dashboard';
// you can set your style right here, it'll be propagated to application
// const uiTheme = {
  
// };

const App = () => {
  return (
    // <ThemeContext.Provider value={getTheme(uiTheme.default)}>
      <DashBoard />
    // </ThemeContext.Provider>
  );
};



export default App;