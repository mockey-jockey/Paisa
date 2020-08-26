import React from 'react';

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