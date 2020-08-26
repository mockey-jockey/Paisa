import React, {useContext} from 'react';
import { StatusBar } from 'react-native';
import ThemeContext from '../themeContext';

const StatusBarView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    const chartConfig = {
        backgroundColor: primaryColor,
          backgroundGradientFrom: primaryColor,
          backgroundGradientTo: primaryColor,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "primaryColor"
          },
        // backgroundGradientFrom: "#3f51b5",
        // backgroundGradientFromOpacity: 1,
        // backgroundGradientTo: "#3f51b5",
        // backgroundGradientToOpacity: 1,
        // color: (opacity = 0) => `rgba(63, 81, 181, ${opacity})`,
        // strokeWidth: 3, // optional, default 3
        // barPercentage: 1,
        // useShadowColorFromDataset: false // optional
      };

    return <LineChart
    data={data}
    width={screenWidth}
    height={220}
    withInnerLines={false}
    chartConfig={chartConfig}
  /><StatusBar barStyle="default" backgroundColor = {primaryColor}/>
}

export default StatusBarView;