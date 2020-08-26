import React from 'react';
import {
  View,
  Text,Button
} from 'react-native';

const BankTransaction = (props) => {
  return (
    <View>
        <Button default text="Create post" onPress={() => props.navigation.navigate('Dashboard')}/>
        <Text>Bank transaction screen</Text>
    </View>
  );
};



export default BankTransaction;