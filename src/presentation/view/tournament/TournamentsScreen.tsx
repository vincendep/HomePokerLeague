import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import TournamentEditScreen from './TournamentEditScreen';
import serviceLocator from '../../../infra/service-locator';
import Tournament from '../../../model/entity/tournament';

export const tournamentsScreenOptions: NativeStackNavigationOptions = {
  headerRight: function HeaderRight(_props) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return (
      <Button
        title="Add"
        onPress={_event => navigation.navigate(TournamentEditScreen.name)}
      />
    );
  },
};

export default function TournamentsScreen(): React.JSX.Element {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(function () {
    async function fetchTournaments() {
      let t = await serviceLocator.tournamentRepository.findAll();
      setTournaments(t);
    }
    fetchTournaments();
  });

  return (
    <View>
      {tournaments.map(t => (
        <View id={t.id}>
          <Text>{t.name}</Text>
        </View>
      ))}
    </View>
  );
}
