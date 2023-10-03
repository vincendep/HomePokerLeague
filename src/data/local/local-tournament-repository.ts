import Tournament from '../../model/entity/tournament';
import ITournamentRepository from '../../model/repository/tournamentRepository';

export default class LocalTournamentRepository
  implements ITournamentRepository
{
  private readonly data: Map<string, Tournament>;

  constructor(data?: Map<string, Tournament>) {
    this.data = data ?? new Map();
  }

  _generateId(): string {
    return new Date().valueOf().toString();
  }

  findAll(): Promise<Tournament[]> {
    return Promise.resolve(Array.from(this.data.values()));
  }

  findById(id: string): Promise<Tournament | undefined> {
    return Promise.resolve(this.data.get(id));
  }

  save(tournament: Tournament): Promise<Tournament> {
    if (tournament.id !== null) {
      tournament = tournament.copyWith({id: this._generateId()});
    }
    this.data.set(tournament.id!, tournament);
    return Promise.resolve(tournament);
  }

  delete(id: string): Promise<boolean> {
    return Promise.resolve(this.data.delete(id));
  }
}
