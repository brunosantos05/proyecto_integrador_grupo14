import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import ComentariosNavigation from '../navigation/ComentariosNavigation';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={ComentariosNavigation}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPost}
        options={{
          tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}