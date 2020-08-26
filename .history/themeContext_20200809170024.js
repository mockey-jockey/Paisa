import React from 'react';
import { COLOR, ThemeContext } from 'react-native-material-ui';
export const uiTheme = {
    default: {
      palette: {
        primaryColor: COLOR.indigo500,
      },
      toolbar: {
        container: {
          height: 50,
        },
      },
    },
    HDFC: {
      palette: {
        primaryColor: COLOR.yellow500,
      },
      toolbar: {
        container: {
          height: 50,
        },
      },
    }
  };

  const ThemeContext = React.createContext(uiTheme);

  export default ThemeContext;