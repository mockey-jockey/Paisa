import React, {useContext} from 'react';
import { View } from 'react-native';
import ThemeContext from '../themeContext';
import header from '../styles/header';

const HeaderView = (props) => {
    const theme = useContext(ThemeContext);
    return <View style={header(theme).headerViewStyle} />
}

export default HeaderView;