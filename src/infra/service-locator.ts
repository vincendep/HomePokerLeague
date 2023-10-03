import LocalTournamentRepository from '../data/local/local-tournament-repository';
import ITournamentRepository from '../model/repository/tournamentRepository';

class ServiceLocator {
  private _tournamentRepository?: ITournamentRepository;

  public get tournamentRepository(): ITournamentRepository {
    if (this._tournamentRepository === undefined) {
      this._tournamentRepository = new LocalTournamentRepository();
    }
    return this._tournamentRepository;
  }
}

export default new ServiceLocator();
