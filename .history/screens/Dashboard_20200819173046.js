/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import styles from './scanStyle';
import card from '../styles/card';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Button, Card } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import {getSMS} from '../utils/message';
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
  const screenWidth = Dimensions.get("window").width;
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [lastSixMonths, setLastSixMonths] = useState([]);

  useEffect(() => {
    var start = new Date();
    start.setHours(0,0,0,0);
    getTransactions(start.getTime(),new Date().getTime());
    getLastSixMonths();
  },[]);

  const getLastSixMonths = () => {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var today = new Date();
    var d;
    var month = [];


    for(var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month.push(monthNames[d.getMonth()+1]);
      
    }
    month = month.map((item) => item.substr(0,3)).reverse();
    month.unshift('Today');
    setLastSixMonths(month);
  }

  const lastDay = function(y,m){
    return  new Date(y, m +1, 0).getDate();
  }

  const getTransactionsDate = (_this,month) => {
    if(month === 'Today'){
      var start = new Date();
      start.setHours(0,0,0,0);
      getTransactions(start.getTime(),new Date().getTime());
    }else {
      var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      var month = monthNames.indexOf(month.toUpperCase());
      var today = new Date();
      var start = new Date(today.getFullYear(), month, 1);
      start.setHours(0,0,0,0);
      
      var end = new Date(today.getFullYear(), month, lastDay(today.getFullYear(),month));
      end.setHours(23,59,59,999);
      getTransactions(start.getTime(),end.getTime());
    }
  }

  const getTransactions = (minDate,maxDate) => {
    getSMS(minDate,maxDate).then((data) => {
      // setTransactions(data);
      console.log(data)
    }).catch((error)=>{
      console.log(error.message);
    });
  }

  const renderItem = ({ item }) => (
    <View style={card().cardViewStyle}>
      <View style={card().leftElements}>
        <Text style={{}}>{item.merchantName}</Text>
        <Text style={{}}>{item.date} <Text>{item.mode}</Text></Text>
      </View>
      <View style={card().rightElements}>
        <Text style={{textAlign:'right'}}>{item.amount} {item.type === "credited" && <Icon name="sort-down" />}{item.type === "debited" && <Icon name="sort-up"  />}</Text>
        <Text style={{textAlign:'right'}}>{item.accountDetails.type} <Text>{item.accountDetails.number}</Text></Text>
      </View>
    </View>
  );
  

  const handlePress = () => {
    console.log("clicked handlePress");
    props.theme('default');
  }
  const handlePress1 = () => {
    console.log("clicked handlePress");
    props.theme('HDFC');
  }
  // <Button default text="Default" onPress={handlePress} />
  // <Button primary text="HDFC" onPress={handlePress1} />
  // <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{display:'flex',flexDirection:'row'}}>{lastSixMonths.map((item,index) => <Text primary text={item} key={index} style={{display:'flex',borderColor:'red',borderWidth:1}}>{item}</Text>)}</ScrollView>
  const RenderMonths = () => {
    if(lastSixMonths.length){
      return <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>{lastSixMonths.map((item,index) => <Text primary testID={item} key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)}</View>
    }
    return <Text></Text>;
  }
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 3 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  
  const chartConfig = {
    backgroundColor: "#3f51b5",
      backgroundGradientFrom: "#3f51b5",
      backgroundGradientTo: "#3f51b5",
      decimalPlaces: 2, // optional, defaults to 2dp
      //color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      // style: {
      //   borderRadius: 16
      // },
      // propsForDots: {
      //   r: "6",
      //   strokeWidth: "2",
      //   stroke: "#3f51b5"
      // }
    // backgroundGradientFrom: "#3f51b5",
    // backgroundGradientFromOpacity: 1,
    // backgroundGradientTo: "#3f51b5",
    // backgroundGradientToOpacity: 1,
    // color: (opacity = 0) => `rgba(63, 81, 181, ${opacity})`,
    // strokeWidth: 3, // optional, default 3
    // barPercentage: 1,
    // useShadowColorFromDataset: false // optional
  };  
  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
        <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
        <SafeAreaView>
          <HeaderView />
          <View>
             <RenderMonths />
          </View>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.index}
          />
        </SafeAreaView>
    </View>
  );
};



export default Dashboard;