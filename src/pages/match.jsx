import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { apiPaths } from '../apiPaths';
import { checkForWinner } from '../gameHasWinner';
import { pagePaths } from './pagePaths';

export const Match = () => {
  let { matchId } = useParams();
  const navigate = useNavigate();

  const [matchData, setMatchData] = useState(undefined);
  const [currentTurn, setCurrentTurn] = useState({
    id: -1,
    name: '',
    age: 0,
  });
  const [winner, setWinner] = useState({
    id: -1,
    name: '',
    age: 0,
  });
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    let isComplete = true;
    if (isComplete) getData();

    return () => {
      isComplete = false;
    };
  }, []);

  const getData = () => {
    fetch(apiPaths.matchById(matchId))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.info({ data });
          setMatchData(data.data);
          if (data.data.turn === data.data.player_2.id)
            setCurrentTurn(data.data.player_2);
          else setCurrentTurn(data.data.player_1);
          setSymbol(data.data.symbol);
          if (data.data.winner) {
            if (data.data.winner === data.data.player_1.id)
              setWinner(data.data.player_1);
            else setWinner(data.data.player_2);
          }
        }
      });
  };

  const onPlayerMove = (cellId, cellSymbol) => {
    if (cellSymbol !== '') return;
    fetch(apiPaths.playerMove(matchId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_id: currentTurn.id,
        cell_id: cellId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const currentPlayer = currentTurn;
        const currentSymbol = symbol;
        if (data.success) {
          if (symbol === 'X') setSymbol('O');
          else setSymbol('X');
        }
        if (currentTurn.id === -1 || currentTurn.id === data.data.player_2.id)
          setCurrentTurn(data.data.player_1);
        else setCurrentTurn(data.data.player_2);
        setMatchData(data.data);
        return { data: data.data, currentPlayer, currentSymbol };
      })
      .then(({ data, currentPlayer, currentSymbol }) => {
        const isWinner = checkForWinner(data.cells, currentSymbol);
        if (isWinner) {
          setWinner(currentPlayer);
          onPlayerWins(currentPlayer.id);
        }
      });
  };

  const onPlayerWins = (winnerId) => {
    fetch(apiPaths.playerWinner(matchId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        winner_id: winnerId,
      }),
    });
  };

  const isCurrentPlayer = (playerId) => playerId === currentTurn.id;

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h1>Match {matchId}</h1>
          <h5>
            Player 1 (X) {matchData?.player_1?.name}{' '}
            {isCurrentPlayer(matchData?.player_1?.id) && '<'}
          </h5>
          <h5>
            Player 2 (O) {matchData?.player_2?.name}{' '}
            {isCurrentPlayer(matchData?.player_2?.id) && '<'}
          </h5>
          <div className="game-board">
            {matchData?.cells?.map((cell) => (
              <div
                className="card tile"
                onClick={() => onPlayerMove(cell?.id, cell?.symbol)}
              >
                {cell?.symbol}
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          {winner.id !== -1 && (
            <h1 className="text-success">{winner.name} is the Winner!</h1>
          )}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(pagePaths.home)}
          >
            Go To Leaderboard
          </button>
        </div>
      </div>
    </>
  );
};
