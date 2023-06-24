import { useNavigate } from 'react-router-dom';
import { pagePaths } from './pagePaths';

export const ChoosePlayers = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Choose player 1</p>
      <p>Choose player 2</p>
      <button onClick={() => navigate(pagePaths.matchWtihArgs('123'))}>
        Start new game
      </button>
    </div>
  );
};
