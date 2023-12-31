import { Outlet, Link } from 'react-router-dom';

import { pagePaths } from '../pages';

export function Root() {
  return (
    <div className="row h-100">
      <div id="sidebar" className="col-3 border h-100">
        <nav>
          <ul>
            <li>
              <Link to={pagePaths.home}>Home</Link>
            </li>
            <li>
              <Link to={pagePaths.createNewPlayer}>Create new player</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" className="col-9 h-100 border border-primary">
        <Outlet />
      </div>
    </div>
  );
}
