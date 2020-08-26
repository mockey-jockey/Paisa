import React, {useContext} from 'react';
import { View } from 'react-native';
import styles from '../screens/scanStyle';
import ThemeContext from '../themeContext';

const HeaderView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    return <View style={{
        height: 100,
        backgroundColor: primaryColor
    }} />
}

export default HeaderView;