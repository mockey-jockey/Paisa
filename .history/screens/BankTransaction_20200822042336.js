import React from 'react';
import {
  View,Picker,
  Text,LogBox
} from 'react-native';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';

const BankTransaction = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.route.params.selectedMonth);
  const goBack = () => {
    props.route.params.theme('default');
    props.navigation.goBack();
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <View>
        <StatusBarView />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {props.route.params.months.map((item) => <Picker.Item label={item} value={item} />)}
        </Picker>
        <Button default text="Create post" onPress={goBack}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;