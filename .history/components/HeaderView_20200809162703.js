import React from 'react';
import { View } from 'react-native';
import styles from '../screens/scanStyle';
import { withTheme } from 'react-native-material-ui';

const HeaderView = (props) => {

    return <View style={styles.headerViewStyle} />
}

export default withTheme(HeaderView);