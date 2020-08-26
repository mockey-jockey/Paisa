import {useContext} from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from '../themeContext';
const theme = useContext(ThemeContext);
const header = StyleSheet.create({
	headerViewStyle: {
        height: 100,
        backgroundColor: theme.primaryColor
    },
});
export default header;