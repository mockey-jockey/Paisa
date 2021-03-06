/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useState } from 'react';
import ThemeContext, { themes } from './themeContext';
import DashBoard from './screens/Dashboard';


const App = () => {
  const [theme, setTheme] = useState(themes.default);

  const handlePress = () => {
    console.log("clicked");
    setTheme(themes.HDFC);
  }
  return (
    <ThemeContext.Provider value={theme}>
      <DashBoard />
    </ThemeContext.Provider>
  );
};



export default App;