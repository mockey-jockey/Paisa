import { withTheme } from 'react-native-material-ui'

const StatusBarView = (props) => {
    const { primaryColor } = props.theme.palette;

    return <StatusBar barStyle="default" backgroundColor = "#00BCD4"/>
}

export default withTheme(StatusBarView);