import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TournamentsScreen, {tournamentsScreenOptions} from './TournamentsScreen';
import TournamentEditScreen from './TournamentEditScreen';

const TournamentsStack = createNativeStackNavigator();

export default function TournamentStackComponent(): JSX.Element {
  return (
    <TournamentsStack.Navigator>
      <TournamentsStack.Screen
        name={TournamentsScreen.name}
        component={TournamentsScreen}
        options={tournamentsScreenOptions}
      />
      <TournamentsStack.Screen
        name={TournamentEditScreen.name}
        component={TournamentEditScreen}
      />
      <TournamentsStack.Screen
        name="Tournament Details"
        component={TournamentEditScreen}
      />
    </TournamentsStack.Navigator>
  );
}
