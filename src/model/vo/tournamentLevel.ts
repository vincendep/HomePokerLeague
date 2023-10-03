enum LevelType {
  game,
  break,
}

abstract class TournamentLevel {
  constructor(
    public readonly type: LevelType,
    public readonly duration: number,
  ) {}

  abstract setDuration(duration: number): TournamentLevel;
}

class BlindLevel extends TournamentLevel {
  constructor(
    duration: number,
    public readonly smallBlind?: number,
    public readonly bigBlind?: number,
    public readonly ante?: number,
  ) {
    super(LevelType.game, duration);
  }

  setDuration(duration: number): TournamentLevel {
    return new BlindLevel(duration, this.smallBlind, this.bigBlind, this.ante);
  }
}

class BreakLevel extends TournamentLevel {
  constructor(duration: number) {
    super(LevelType.break, duration);
  }

  setDuration(duration: number): TournamentLevel {
    return new BreakLevel(duration);
  }
}

export {TournamentLevel, LevelType, BreakLevel, BlindLevel};
