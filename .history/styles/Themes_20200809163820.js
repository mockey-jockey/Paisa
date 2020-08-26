import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLOR } from 'react-native-material-ui';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const themes = {
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
};
let themeObject = {};

export function getTheme() {
	return themeObject;
}

export default function useTheme(name) {
    console.log("NAME--------", name)
    themeObject = themes[name];
	return themes[name];
}