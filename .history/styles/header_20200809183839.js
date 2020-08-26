import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-material-ui';

const header = StyleSheet.create({
	headerViewStyle: {
        height: 100,
        backgroundColor: theme.primaryColor
    },
});
export default withTheme(header);