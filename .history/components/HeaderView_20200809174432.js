import React from 'react';
import { View } from 'react-native';
import styles from '../screens/scanStyle';
import { withTheme } from 'react-native-material-ui';

const HeaderView = (props) => {
    return <View style={{
        height: 100,
        backgroundColor: 'green'
    }} />
}

export default withTheme(HeaderView);