import React, {useContext, useEffect,useState} from 'react';
import ThemeContext from '../themeContext';
import { LineChart} from "react-native-chart-kit";
import { Text,View } from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const StatusLineView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    
    var points = JSON.parse(props.lastSixMonthsExpanse);
    points = points.length ? points : [0,0,0,0,0,0];
    console.log(points)
    const data = {
        labels: props.monthLabels,
        datasets: [
            {
                data: points,
                color: () => theme.dark.secondaryColor, // optional
            }
        ],
    };
    const chartConfig = {
        backgroundColor: primaryColor,
        backgroundGradientFrom: primaryColor,
        backgroundGradientTo: primaryColor,
        decimalPlaces: 2, // optional, defaults to 2dp
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: 'white',
        },
        backgroundGradientFrom: theme.dark.primaryColor,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: theme.dark.primaryColor,
        backgroundGradientToOpacity: 1,
        color: (opacity = 0) => `rgba(63, 81, 181, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
    };

    const getValue = (y) => {
        if (y < 1e3) return y;
        if (y >= 1e3 && y < 1e6) return +(y / 1e3).toFixed(1) + "K";
        if (y >= 1e6 && y < 1e9) return +(y / 1e6).toFixed(1) + "M";
        if (y >= 1e9 && y < 1e12) return +(y / 1e9).toFixed(1) + "B";
        if (y >= 1e12) return +(y / 1e12).toFixed(1) + "T";
    }
     
    return (<View><LineChart
            data={data}
            width={screenWidth}
            height={200}
            withDots={true}
            fromZero
            withInnerLines={true}
            renderDotContent={(item) => {
                let value = getValue(points[item.index]);
                return (<View
                style={{
                    height: 24,
                    width: 50,
                    position: "absolute",
                    top: item.y - 24, // <--- relevant to height / width (
                    left: item.x - 10 // <--- width / 2
                }}
                ><Text key={item.index} style={{color:'white',fontSize:10}}>{value}</Text></View>)
            }}
            withHorizontalLabels={false}
            chartConfig={chartConfig}
            bezier
        /></View>)
}

export default StatusLineView;