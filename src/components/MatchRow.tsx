import * as React from 'react';
import { Link } from 'react-router-dom';

import { pagePaths } from '../pages/pagePaths';
import { MatchTable } from '../interfaces';

export const MatchRow = ({
  id,
  player_1,
  player_2,
  active,
  updated_data,
}: MatchTable) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{player_1.name}</td>
      <td>{player_2.name}</td>
      <td>{updated_data}</td>
      <td>{active ? 'Yes' : 'No'}</td>
      <td>
        {active && (
          <u>
            <Link to={pagePaths.matchWtihArgs(id.toString())}>Play</Link>
          </u>
        )}
      </td>
    </tr>
  );
};
