import React from 'react';
import { View } from 'react-native';
import styles from './scanStyle';
import { withTheme } from 'react-native-material-ui'

const HeaderView = (props) => {
    const { primaryColor } = props.theme.palette;

    return <View style={styles.headerViewStyle} />
}

export default withTheme(HeaderView);