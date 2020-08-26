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

  const uiTheme = (name) => {
    setTheme(themes[name]);
  }
  return (
    <ThemeContext.Provider value={theme}>
      <DashBoard theme={uiTheme}/>
    </ThemeContext.Provider>
  );
};



export default App;