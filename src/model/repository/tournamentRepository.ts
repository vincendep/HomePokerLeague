import Tournament from '../entity/tournament';

export default interface ITournamentRepository {
  findAll(): Promise<Tournament[]>;
  findById(id: string): Promise<Tournament | undefined>;
  save(tournament: Tournament): Promise<Tournament>;
  delete(id: string): Promise<boolean>;
}
