export const pagePaths = {
  home: '/',
  matches: 'matches',
  matchWtihArgs: (id = ':matchId') => `/match/${id}`,
  match: `match/:matchId`,
  createNewPlayer: 'create-new-player',
  choosePlayers: 'choose-players',
};
