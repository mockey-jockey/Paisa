import React, {useContext} from 'react';
import { View } from 'react-native';
import styles from '../screens/scanStyle';
import { withTheme } from 'react-native-material-ui';

const HeaderView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    return <View style={{
        height: 100,
        backgroundColor: primaryColor
    }} />
}

export default withTheme(HeaderView);