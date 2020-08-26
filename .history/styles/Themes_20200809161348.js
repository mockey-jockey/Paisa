import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLOR } from 'react-native-material-ui';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const Colors = {
	light: 'white',
	dark: 'black'
};

const themes = StyleSheet.create({
	default: {
        palette: {
            primaryColor: COLOR.indigo500,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
    },
    HDFC: {
        palette: {
            primaryColor: COLOR.yellow500,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
    }
});

export default function useTheme(name) {
	return themes[name];
}