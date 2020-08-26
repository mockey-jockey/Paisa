import React, {useContext} from 'react';
import { StatusBar } from 'react-native';
import ThemeContext from '../themeContext';

const StatusBarView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;

    return <StatusBar barStyle="default" backgroundColor = {primaryColor}/>
}

export default StatusBarView;