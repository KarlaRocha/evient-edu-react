import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { pagePaths } from './pagePaths';
import { apiPaths } from '../apiPaths';

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isComplete = true;
    if (isComplete) getData();
    return () => {
      isComplete = false;
    };
  }, []);

  const getData = () => {
    fetch(apiPaths.allMatches)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response.data);
        }
      });
  };

  return (
    <div className="container">
      <header className="d-flex flex-row justify-content-between mt-2">
        <h1>Matches</h1>
        <Link to={pagePaths.choosePlayers}>
          <button className="btn btn-primary">New Game</button>
        </Link>
      </header>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player 1</th>
            <th scope="col">Player 2</th>
            <th scope="col">Last Played</th>
            <th scope="col">Active</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr>
              <th scope="row">{d.id}</th>
              <td>{d.player_1.name}</td>
              <td>{d.player_2.name}</td>
              <td>{d.updated_data}</td>
              <td>{d.active ? 'Yes' : 'No'}</td>
              <td>
                {d.active && (
                  <Link to={pagePaths.matchWtihArgs(d.id)}>Play</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
