import React, {useContext, useEffect,useState} from 'react';
import ThemeContext from '../themeContext';
import { View } from 'react-native';
import { VictoryChart,VictoryGroup,VictoryBar,VictoryLegend,VictoryAxis,VictoryTheme } from "victory-native";
import { Dimensions } from "react-native";
import Svg, { G } from 'react-native-svg';
const screenWidth = Dimensions.get("window").width;
const StatusBarView = (props) => {
    const theme = useContext(ThemeContext);
    const { primaryColor } = theme.palette;
    const [creditsData, setCreditsData] = useState([]);
    const [debitsData, setDebitsData] = useState([]);
    const banks = Object.keys(props.transactions);
    useEffect(()=>{
      var data = [];
      if(banks.length){
        banks.map((item,index) => {
          var obj = {};
          obj.bank = item;
          obj.credits = props.transactions[item].credits.length && props.transactions[item].credits.reduce((a,b) => a+b);
          obj.debits = props.transactions[item].debits.length && props.transactions[item].debits.reduce((a,b) => a+b);
          data.push(obj)
        });
        var creditsArr = data.map((item) => {
          return {
            x:item.bank,
            y:item.credits
          }
        })
        setCreditsData(creditsArr);
        var debitsArr = data.map((item) => {
          return {
            x:item.bank,
            y:item.debits
          }
        })
        setDebitsData(debitsArr);
      }
    },[props.transactions])
    return (
      <View>
      <Svg style={{backgroundColor:theme.dark.primaryColor}} viewBox={`0 0 ${screenWidth} 300`} height="240" width={screenWidth}>
        <G>
          <VictoryLegend x={125} y={10}
            orientation="horizontal"
            gutter={20}
            x={0}
            colorScale={[theme.dark.secondaryColor, theme.light.primaryColor]}
            data={[
              { name: "Credits",labels:{fill:theme.palette.primaryColor} }, { name: "Debits",labels:{fill:theme.palette.primaryColor} }
            ]}
          />
          <VictoryChart>
            <VictoryGroup offset={30} colorScale={[theme.dark.secondaryColor, theme.light.primaryColor]}>
              <VictoryBar 
                name="Credits"
                style={{
                  data: {
                    width:20
                  },
                  labels:{
                    fill: theme.dark.secondaryColor
                  }
                }}
                labels={({ datum }) => {
                  if (datum.y < 1e3) return datum.y;
                  if (datum.y >= 1e3 && datum.y < 1e6) return +(datum.y / 1e3).toFixed(1) + "K";
                  if (datum.y >= 1e6 && datum.y < 1e9) return +(datum.y / 1e6).toFixed(1) + "M";
                  if (datum.y >= 1e9 && datum.y < 1e12) return +(datum.y / 1e9).toFixed(1) + "B";
                  if (datum.y >= 1e12) return +(datum.y / 1e12).toFixed(1) + "T";
                }}
                data={creditsData}
              />
              <VictoryBar 
                name="Debits"
                style={{
                  data: {
                    width:20
                  },
                  labels:{
                    fill: theme.light.primaryColor
                  }
                }}
                labels={({ datum }) => {
                  if (datum.y < 1e3) return datum.y;
                  if (datum.y >= 1e3 && datum.y < 1e6) return +(datum.y / 1e3).toFixed(1) + "K";
                  if (datum.y >= 1e6 && datum.y < 1e9) return +(datum.y / 1e6).toFixed(1) + "M";
                  if (datum.y >= 1e9 && datum.y < 1e12) return +(datum.y / 1e9).toFixed(1) + "B";
                  if (datum.y >= 1e12) return +(datum.y / 1e12).toFixed(1) + "T";
                }}
                data={debitsData}
              />
            </VictoryGroup>
            <VictoryAxis crossAxis style={{
              axis: {stroke: "none"},
              tickLabels: {fontSize: 20,fill: theme.palette.primaryColor}
            }}/> 
          </VictoryChart>
        </G>
      </Svg>
      </View>
    );
}

export default StatusBarView;