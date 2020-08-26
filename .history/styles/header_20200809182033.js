import { StyleSheet } from 'react-native';
import ThemeContext from '../themeContext';
const theme = useContext(ThemeContext);
const styles = StyleSheet.create({
	headerViewStyle: {
        height: 100,
        backgroundColor: theme.primaryColor
    },
});
export default styles;