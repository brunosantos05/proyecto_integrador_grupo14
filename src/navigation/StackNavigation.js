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
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loading: false,
        });
      } else {
        this.setState({
          loggedIn: false,
          loading: false,
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

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
