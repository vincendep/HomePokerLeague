import React, {useReducer} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {
  BlindLevel,
  BreakLevel,
  LevelType,
} from '../../../model/vo/tournamentLevel';
import {MenuButton} from '../../component/MenuButton';
import Tournament from '../../../model/entity/tournament';
import serviceLocator from '../../../infra/service-locator';

type TournamentEditState = {
  tournament: Tournament;
  nameError?: string;
  levelDuration: string;
  levelDurationError?: string;
};

const initialState: TournamentEditState = {
  tournament: Tournament.create(),
  levelDuration: '20',
};

enum TournamentEditActionType {
  ADD_BREAK = 'ADD_BREAK',
  ADD_LEVEL = 'ADD_LEVEL',
  REMOVE_LEVEL = 'REMOVE_LEVEL',
  UPDATE_NAME = 'UPDATE_NAME',
  SET_PLAYERS = 'SET_PLAYERS',
  INCREMENT_PLAYERS = 'INCREMENT_PLAYERS',
  DECREMENT_PLAYERS = 'DECREMENT_PLAYERS',
  UPDATE_LEVEL_DURATION = 'UPDATE_LEVEL_DURATION',
  GENERATE_LEVELS = 'GENERATE_LEVELS',
  SAVE_TOURNAMENT = 'SAVE_TOURNAMENT',
}

type AddBreakAction = {
  type: TournamentEditActionType.ADD_BREAK;
};

type RemoveLevelAction = {
  type: TournamentEditActionType.REMOVE_LEVEL;
  index: number;
};

type AddLevelAction = {
  type: TournamentEditActionType.ADD_LEVEL;
};

type UpdateNameAction = {
  type: TournamentEditActionType.UPDATE_NAME;
  name: string;
};

type SetPlayersAction = {
  type: TournamentEditActionType.SET_PLAYERS;
  players: number;
};

type IncrementPlayersAction = {
  type: TournamentEditActionType.INCREMENT_PLAYERS;
  players: string;
};

type DecrementPlayersAction = {
  type: TournamentEditActionType.DECREMENT_PLAYERS;
  players: string;
};

type UpdateLevelDurationAction = {
  type: TournamentEditActionType.UPDATE_LEVEL_DURATION;
  duration: string;
};

type SaveTournamentAction = {
  type: TournamentEditActionType.SAVE_TOURNAMENT;
};

type TournamentEditAction =
  | AddBreakAction
  | AddLevelAction
  | RemoveLevelAction
  | UpdateNameAction
  | SetPlayersAction
  | IncrementPlayersAction
  | DecrementPlayersAction
  | UpdateLevelDurationAction
  | SaveTournamentAction;

function reducer(
  state: TournamentEditState,
  action: TournamentEditAction,
): TournamentEditState {
  let newState = {...state};
  switch (action.type) {
    case TournamentEditActionType.ADD_BREAK:
      newState.tournament = state.tournament.addLevel(
        new BreakLevel(parseInt(state.levelDuration, 10)),
      );
      break;
    case TournamentEditActionType.ADD_LEVEL:
      newState.tournament = state.tournament.addLevel(
        new BlindLevel(parseInt(state.levelDuration, 10)),
      );
      break;
    case TournamentEditActionType.UPDATE_NAME:
      newState.tournament = state.tournament.copyWith({name: action.name});
      break;
    case TournamentEditActionType.SET_PLAYERS: {
      newState.tournament = state.tournament.copyWith({
        players: action.players,
      });
      break;
    }
    case TournamentEditActionType.INCREMENT_PLAYERS: {
      newState.tournament = state.tournament.incrementPlayers();
      break;
    }
    case TournamentEditActionType.DECREMENT_PLAYERS: {
      newState.tournament = state.tournament.decrementPlayers();
      break;
    }
    case TournamentEditActionType.UPDATE_LEVEL_DURATION: {
      const n = parseInt(action.duration, 10);
      if (!isNaN(n)) {
        newState.levelDuration = n.toString();
        newState.tournament = state.tournament.setLevelsDuration(n);
        newState.levelDurationError = undefined;
      } else {
        newState.levelDuration = action.duration;
        newState.levelDurationError = 'Error';
      }
      break;
    }
    case TournamentEditActionType.REMOVE_LEVEL:
      newState.tournament = state.tournament.removeLevel(action.index);
      break;
    case TournamentEditActionType.SAVE_TOURNAMENT:
      serviceLocator.tournamentRepository.save(state.tournament);
      newState = initialState;
      break;
    default:
      throw `Missing switch case for action type: ${
        (action as TournamentEditAction).type
      }`;
  }
  return newState;
}

export default function TournamentEditScreen(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View>
      <Text>Tournament name</Text>
      <TextInput
        value={state.tournament.name}
        onChangeText={text =>
          dispatch({type: TournamentEditActionType.UPDATE_NAME, name: text})
        }
      />
      <Text>Number of players</Text>
      <MenuButton
        selected={state.tournament.players}
        items={[10, 11, 12, 13]}
        onSelection={value =>
          dispatch({type: TournamentEditActionType.SET_PLAYERS, players: value})
        }
      />
      <Text>Level duration</Text>
      <TextInput
        inputMode="numeric"
        value={state.levelDuration.toString()}
        onChangeText={text =>
          dispatch({
            type: TournamentEditActionType.UPDATE_LEVEL_DURATION,
            duration: text,
          })
        }
      />
      {state.levelDurationError && <Text>{state.levelDurationError}</Text>}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'space-between',
        }}>
        <Text>Levels</Text>
        <Button
          title="Add level"
          onPress={() => dispatch({type: TournamentEditActionType.ADD_LEVEL})}
        />
        <Button
          title="Add break"
          onPress={() => dispatch({type: TournamentEditActionType.ADD_BREAK})}
        />
        <Button title="Generate levels" onPress={() => {}} />
      </View>
      {state.tournament.levels.map((level, index) =>
        level.type === LevelType.game ? (
          <View>
            <Text>Duration: {level.duration} m</Text>
            <Text>Small blind: {(level as BlindLevel).smallBlind}</Text>
            <Text>Big blind: {(level as BlindLevel).bigBlind}</Text>
            <Text>Ante: {(level as BlindLevel).ante}</Text>
            <Button
              title="Remove"
              onPress={() =>
                dispatch({
                  type: TournamentEditActionType.REMOVE_LEVEL,
                  index: index,
                })
              }
            />
          </View>
        ) : (
          <View>
            <Text>Break: {level.duration} m</Text>
            <Button
              title="Remove"
              onPress={() =>
                dispatch({
                  type: TournamentEditActionType.REMOVE_LEVEL,
                  index: index,
                })
              }
            />
          </View>
        ),
      )}
      <Button
        title="Save"
        onPress={() =>
          dispatch({type: TournamentEditActionType.SAVE_TOURNAMENT})
        }
      />
    </View>
  );
}
