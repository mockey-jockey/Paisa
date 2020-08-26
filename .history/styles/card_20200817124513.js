import { StyleSheet } from 'react-native';

const card = (theme) => StyleSheet.create({
	cardViewStyle: {
        padding: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
        display: 'flex',
        alignContent: 'space-between',
        alignSelf: 'auto'
    },
    leftElements: {
       alignItems: 'flex-start'
    },
    rightElements: {
        alignItems: 'flex-end'
    },
});
export default card;