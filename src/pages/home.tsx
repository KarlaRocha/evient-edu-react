import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { pagePaths } from './pagePaths';
import { apiPaths } from '../apiPaths';

import { MatchTable } from '../interfaces';
import { MatchRow } from '../components';

export const Home = () => {
  const [data, setData] = useState<MatchTable[]>();

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
      <table className="table table-striped table-hover">
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
            <MatchRow
              id={d.id}
              player_1={d.player_1}
              player_2={d.player_2}
              active={d.active}
              updated_data={d.updated_data}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
