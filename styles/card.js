import { StyleSheet } from 'react-native';

const card = (theme) => StyleSheet.create({
	cardViewStyle: {
        padding: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftElements: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'flex-start'
    },
    rightElements: {
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});
export default card;