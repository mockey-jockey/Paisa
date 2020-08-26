import { StyleSheet } from 'react-native';

const card = (theme) => StyleSheet.create({
	cardViewStyle: {
        height: 100,
        backgroundColor: theme.palette.primaryColor
    },
});
export default card;