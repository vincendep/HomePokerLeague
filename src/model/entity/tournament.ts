import Chip from '../vo/chip';
import {TournamentLevel} from '../vo/tournamentLevel';

export default class Tournament {
  constructor(
    public readonly name: string,
    public readonly players: number,
    public readonly levels: TournamentLevel[],
    public readonly chipset: Chip[],
    public readonly id?: string,
  ) {}

  static create(): Tournament {
    return new Tournament('', 10, [], []);
  }

  decrementPlayers(): Tournament {
    return this.setPlayers(this.players - 1);
  }

  incrementPlayers(): Tournament {
    return this.setPlayers(this.players + 1);
  }

  setPlayers(players: number): Tournament {
    return this.copyWith({players: players});
  }

  setChipset(chipset: Chip[]): Tournament {
    return this.copyWith({chipset: chipset});
  }

  removeLevel(index: number): Tournament {
    return this.copyWith({
      levels: this.levels.filter((_, idx) => idx !== index),
    });
  }

  setLevelsDuration(duration: number): Tournament {
    return this.copyWith({
      levels: this.levels.map(l => l.setDuration(duration)),
    });
  }

  addLevel(level: TournamentLevel, index?: number): Tournament {
    const newLevels = [...this.levels];
    if (index === undefined) {
      newLevels.push(level);
    } else {
      newLevels.splice(index, 0, level);
    }
    return this.copyWith({levels: newLevels});
  }

  copyWith({
    name,
    players,
    levels,
    chipset,
    id,
  }: {
    name?: string;
    players?: number;
    levels?: TournamentLevel[];
    chipset?: Chip[];
    id?: string;
  }): Tournament {
    return new Tournament(
      name ?? this.name,
      players ?? this.players,
      levels ?? this.levels,
      chipset ?? this.chipset,
      id ?? this.id,
    );
  }
}
