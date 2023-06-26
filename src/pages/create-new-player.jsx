import { useState } from 'react';
import { apiPaths } from '../apiPaths';

export const CreateNewPlayer = () => {
  const [successful, setSuccessful] = useState(false);

  const onCreatePlayer = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const age = event.target.age.value;
    if (name && age) {
      fetch(apiPaths.allPlayers, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.id != null) {
            setSuccessful(true);
          }
        });
    }
  };

  return (
    <div className="container m-3">
      <h1>Create a new player</h1>
      <form onSubmit={onCreatePlayer}>
        <div className="row">
          <div className="col-4">
            <label>Name</label>
            <input type="text" name="name" className="form-control" />
          </div>
          <div className="col-4">
            <label>Age</label>
            <input type="number" name="age" className="form-control" />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Create Player
            </button>
          </div>
        </div>
      </form>

      {successful && (
        <div className="row">
          <div className="col-4">
            <p className="text-success">Player created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};
