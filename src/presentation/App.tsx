/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import HomeScreen from './view/home/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TournamentStackComponent from './view/tournament/TournamentStackComponent';
import LeagueScreen from './view/league/LeagueScreen';

const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={HomeStackComponent.name}
          component={HomeStackComponent}
        />
        <Tab.Screen
          name={TournamentStackComponent.name}
          component={TournamentStackComponent}
        />
        <Tab.Screen
          name={LeagueStackComponent.name}
          component={LeagueStackComponent}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackComponent(): JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const LeagueStack = createNativeStackNavigator();
function LeagueStackComponent(): JSX.Element {
  return (
    <LeagueStack.Navigator>
      <LeagueStack.Screen name="League" component={LeagueScreen} />
    </LeagueStack.Navigator>
  );
}
