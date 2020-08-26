/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import styles from './scanStyle';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import StatusBarView from '../components/StatusBarView';
import HeaderView from '../components/HeaderView';
import utils from '../utils/message';
import { ListItem,Subheader } from 'react-native-material-ui';
const Dashboard = (props) => {
  const {transactions, setTransactions} = useState([]);
  
  const handlePress = () => {
    console.log("clicked handlePress");
    props.theme('default');
  }
  const handlePress1 = () => {
    console.log("clicked handlePress");
    props.theme('HDFC');
  }

  return (
    <View style={styles.scrollViewStyle}>
        <StatusBarView />
            <HeaderView />
            <View>
                <Button default text="Default" onPress={handlePress} />
                <Button primary text="HDFC" onPress={handlePress1} />
            </View>
            <ScrollView style={{flex:1}}>
            <ListItem
                divider
                centerElement={{
                    primaryText: 'Center element ',
                    secondaryText: 'sum',
                }}
                rightElement={{
                  element: <Text>sdsd</Text>
                  string: 'Centegggr element ',
                }}
            />
                <ListItem
                    divider
                    centerElement="Center element as a text"
                    onPress={() => {}}
                />
                <ListItem
                    divider
                    centerElement={{
                        primaryText: 'Custom center element',
                        primaryText: <Text>Custom center element</Text>,
                    }}
                    onPress={() => {}}
                />
                <ListItem
                    divider
                    centerElement="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
                <ListItem
                    divider
                    dense
                    centerElement="Center element as a text (dense)"
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Center element as an object',
                    }}
                    onPress={() => {}}
                />

                <ListItem
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Center element as an object (dense)',
                        secondaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum',
                    }}
                />
                <ListItem
                    divider
                    centerElement={{
                        primaryText: 'Center element as an object',
                        secondaryText: 'Subtext',
                    }}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Center element as an object',
                        secondaryText: 'Subtext',
                    }}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        secondaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum',
                    }}
                    rightElement="info"
                    onLeftElementPress={() => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('Left element pressed', ToastAndroid.SHORT);
                        }
                    }}
                    onPress={() => ToastAndroid.show('List item pressed', ToastAndroid.SHORT)}
                    onRightElementPress={() => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('Right element pressed', ToastAndroid.SHORT);
                        }
                    }}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Center element as an object',
                        secondaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing.',
                    }}
                    numberOfLines={3}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Center element as an object',
                        secondaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing.',
                        tertiaryText: 'Praesent in ipsum. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
                    }}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                        primaryText: 'Ali Connors',
                        secondaryText: 'Brunch this weekend?',
                        tertiaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum.',
                    }}
                />
                <ListItem
                    divider
                    leftElement="person"
                    numberOfLines="dynamic"
                    centerElement={{
                        primaryText: 'With dynamic second line',
                        secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum',
                    }}
                    onPress={() => {}}
                />
                <ListItem
                    divider
                    leftElement="person"
                    centerElement={<Text>Custom center element</Text>}
                />
            </ScrollView>
    </View>
  );
};



export default Dashboard;