/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import ThemeContext, { themes } from './themeContext';
import DashBoard from './screens/Dashboard';


const App = () => {
  return (
    <ThemeContext.Provider value={themes.default}>
      <DashBoard />
    </ThemeContext.Provider>
  );
};



export default App;