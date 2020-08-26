import { StyleSheet } from 'react-native';

const header = (theme) => StyleSheet.create({
	headerViewStyle: {
        height: 100,
        backgroundColor: theme.primaryColor
    },
});
export default header;