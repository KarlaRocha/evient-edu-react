import { Link } from 'react-router-dom';
import { pagePaths } from './pagePaths';

export const Home = () => {
  return (
    <div>
      <p>Matches</p>
      <Link to={pagePaths.choosePlayers}>
        <button>New Game</button>
      </Link>
    </div>
  );
};
