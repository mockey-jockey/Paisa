import React, {useContext} from 'react';
import ThemeContext from '../themeContext';
import {
    LineChart,
    BarChart,
    // PieChart,
    // ProgressChart,
    // ContributionGraph,
     StackedBarChart
  } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const StatusBarView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    // const data = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //         {
    //         data: [20, 45, 28, 80, 99, 43],
    //         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
    //         strokeWidth: 3 // optional
    //         }
    //     ],
    //     legend: ["Rainy Days"] // optional
    // };
      
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
            stroke: primaryColor
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
      const data = {
        labels: ["Test1", "Test2"],
        legend: ["L1", "L2", "L3"],
        data: [
          [60, 60, 60],
          [30, 30, 60]
        ],
        barColors: ["red", "green", "#a4b0be"]
      };
    return <StackedBarChart
    data={data}
    width={screenWidth}
    height={220}
    chartConfig={chartConfig}
  />
  //   // return <LineChart
  //   // data={data}
  //   // width={screenWidth}
  //   // height={220}
  //   // withInnerLines={false}
  //   // chartConfig={chartConfig}
  // />
}

export default StatusBarView;