import React, {useContext} from 'react';
import { View } from 'react-native';
import ThemeContext from '../themeContext';
import styles from '../styles/paisaStyle';

const HeaderView = (props) => {
    const theme = useContext(ThemeContext);
    return <View style={styles(theme).headerViewStyle} />
}

export default HeaderView;