import React from 'react';
import {
    StatusBar,
  } from 'react-native';
import { withTheme } from 'react-native-material-ui'

const StatusBarView = (props) => {
    const { primaryColor } = props.theme.palette.primaryColor;

    return <StatusBar barStyle="default" backgroundColor = {primaryColor}/>
}

export default withTheme(StatusBarView);