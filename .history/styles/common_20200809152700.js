import React from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
import { withTheme } from 'react-native-material-ui';
const common = (props) => {
    const { primaryColor } = props.theme.palette;
    return {
        scrollViewStyle: {
            flex: 1,
            backgroundColor: primaryColor
        }
    }
}
export default withTheme(common);