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

  const setTheme = (name) => {
    console.log("clicked---", name);
    setTheme(themes[name]);
  }
  return (
    <ThemeContext.Provider value={theme}>
      <DashBoard theme={setTheme}/>
    </ThemeContext.Provider>
  );
};



export default App;