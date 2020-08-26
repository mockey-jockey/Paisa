import React,{ useState } from 'react';
import ThemeContext, { themes } from './themeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/Dashboard';
import BankTransaction from './screens/BankTransaction';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: "#3f51b5",
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="DashBoard" 
        component={DashBoard} 
      />
      <Stack.Screen 
        name="BankTransaction" 
        component={BankTransaction} 
        options={{ title: 'BankTransaction' }}
      />
    </Stack.Navigator>
  );
}
// <DashBoard theme={uiTheme}/>
const App = () => {
  const [theme, setTheme] = useState(themes.default);

  const uiTheme = (name) => {
    setTheme(themes[name]);
  }
  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer>
        <NavStack theme={uiTheme}/>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};



export default App;