import React, {useState,useEffect} from 'react';
import {
  View,
  Text,LogBox
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';

const BankTransaction = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.route.params.selectedMonth);
  const [dates, setDates] = useState([]);
  
  const goBack = () => {
    props.route.params.theme('default');
    props.navigation.goBack();
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  
  useEffect(() => {
    getDates();
  },[])
  
  const getMonth = (month) => {
    console.log("_____________",month)
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.indexOf(month.toUpperCase());
  }

  const getDates = () => {
    const today = new Date();
    const month = getMonth(selectedValue);
    const lastDayOfMonth = new Date(today.getFullYear(), month +1, 0).getDate();
    const values = [];
    for(var i=1;i<=lastDayOfMonth;i++){
      values.push(i);
    }
    setDates(values);
  }
  
  const getTransactionsDate = (_this,month) => {
    // setSelectedMonth(month);
    // if(month === 'Today'){
    //   var start = new Date();
    //   start.setHours(0,0,0,0);
    //   _retrieveData(start.getTime(),new Date().getTime());
    // }else {
    //   var month = getMonth(month);
    //   var today = new Date();
    //   var start = startDay(today.getFullYear(),month);
      
    //   var end = new Date(today.getFullYear(), month, lastDay(today.getFullYear(),month));
    //   end.setHours(23,59,59,999);
    //   _retrieveData(start,end.getTime());
    // }
  }
  const RenderDates = () => {
    if(dates.length){
      return <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>{dates.map((item,index) => <Text primary key={index} style={{display:'flex',justifyContent:'center',padding:10}} onPress={() => getTransactionsDate(this, item)}>{item}</Text>)}</View>
    }
    return <Text></Text>;
  }
  return (
    <View>
        <StatusBarView />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {props.route.params.months.map((item,index) => <Picker.Item key={index} label={item} value={item} />)}
        </Picker>
        <View>
             <RenderDates />
        </View>
        <Button default text="Create post" onPress={goBack}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;