import React from 'react';
import {
  View,
  Text,YellowBox
} from 'react-native';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';

const BankTransaction = (props) => {
  const goBack = () => {
    props.route.params.theme('default');
    props.navigation.goBack();
  }
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <View>
        <StatusBarView />
        <Button default text="Create post" onPress={goBack}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;