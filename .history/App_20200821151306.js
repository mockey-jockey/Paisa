import React,{ useState } from 'react';
import ThemeContext, { themes } from './themeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/Dashboard';
import BankTransaction from './screens/BankTransaction';

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