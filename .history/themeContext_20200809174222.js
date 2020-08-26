import React from 'react';
import { COLOR } from 'react-native-material-ui';
export const themes = {
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

  const ThemeContext = React.createContext(themes.default);

  export default ThemeContext;