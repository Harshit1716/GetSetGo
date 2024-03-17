import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FlightListScreen, Home, Splash} from '../screens';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="FlightList" component={FlightListScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
