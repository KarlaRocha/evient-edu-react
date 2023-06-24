export const apiPaths = {
  allMatches: 'http://localhost:8000/matches/',
  match: (id) => `http://localhost:8000//matches/${id}/`,
  allPlayer: 'http://localhost:8000//player/',
  player: (id) => `http://localhost:8000//players/${id}/`,
  allCells: 'http://localhost:8000//cells/',
  cell: (id) => `http://localhost:8000//cells/${id}/`,
  playerMove: (id) => `http://localhost:8000//match/player-move/${id}/`,
};
