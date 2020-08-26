import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-material-ui';

const BankTransaction = (props) => {
  return (
    <View>
        <Button default text="Create post" onPress={() => props.navigation.goBack()}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;