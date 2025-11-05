import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigation from './TabNavigation';
import { auth } from '../firebase/config';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
    });
  }

  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {this.state.loggedIn ? (
            <Stack.Screen name="Main" component={TabNavigation} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNavigation;
