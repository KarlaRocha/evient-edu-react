import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiPaths } from '../apiPaths';

export const Match = () => {
  let { matchId } = useParams();
  const [matchData, setMatchData] = useState(undefined);
  const [currentTurn, setCurrentTurn] = useState({
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
  }, [symbol]);

  const getData = () => {
    fetch(apiPaths.matchById(matchId))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMatchData(data.data);
          if (currentTurn.id === -1 || currentTurn.id === data.data.player_2.id)
            setCurrentTurn(data.data.player_1);
          else setCurrentTurn(data.data.player_2);

          setSymbol(data.data.symbol);
        }
      });
  };

  const onPlayerMove = (cellId) => {
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
        if (data.success) {
          if (symbol === 'X') setSymbol('O');
          else setSymbol('X');
        }
      });
  };

  const isCurrentPlayer = (playerId) => playerId === currentTurn.id;

  return (
    <div>
      <p>Match {matchId}</p>
      <p>
        Player 1 (X) {matchData?.player_1?.name}{' '}
        {isCurrentPlayer(matchData?.player_1?.id) && '<'}
      </p>
      <p>
        Player 2 (O) {matchData?.player_2?.name}{' '}
        {isCurrentPlayer(matchData?.player_2?.id) && '<'}
      </p>
      <div className="game-board">
        {matchData?.cells?.map((cell) => (
          <div className="card tile" onClick={() => onPlayerMove(cell?.id)}>
            {cell?.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};
