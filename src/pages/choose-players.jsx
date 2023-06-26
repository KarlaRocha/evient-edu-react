import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pagePaths } from './pagePaths';
import { apiPaths } from '../apiPaths';

export const ChoosePlayers = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(undefined);
  const [player2, setPlayer2] = useState(undefined);

  useEffect(() => {
    let isComplete = true;
    if (isComplete) getPlayers();

    return () => {
      isComplete = false;
    };
  }, []);

  const getPlayers = () => {
    fetch(apiPaths.allPlayers)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPlayers(data);
        }
      });
  };

  const onCreateMatch = () => {
    fetch(apiPaths.match, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_1_id: player1,
        player_2_id: player2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(pagePaths.matchWtihArgs(data.match_id));
        }
      });
  };

  const PlayerSelect = ({ onChange, value }) => (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Select"
    >
      s
      {players?.map((player) => (
        <option
          selected={player.id === Number(value)}
          key={Math.random()}
          value={player.id}
        >
          {player.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="container m-3">
      <h1>Choose Players</h1>
      <div className="row">
        <div className="col-4">
          <p>Player 1 (X)</p>
          <PlayerSelect onChange={setPlayer1} value={player1} />
        </div>
        <div className="col-4">
          <p>Player 2 (O)</p>
          <PlayerSelect onChange={setPlayer2} value={player2} />
        </div>
      </div>
      {player1 && player2 && (
        <div className="row mt-3">
          <div className="col-8 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={onCreateMatch}>
              Start New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
