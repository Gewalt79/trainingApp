import React from 'react';

function SetManager({ number, workout }) {
  const [howMuchReps, setHowMuchReps] = React.useState(1);
  const [repWeight, setRepWeight] = React.useState(0);
  const numberOfReps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  console.log(workout);

  const handler = (sets) => {
    workout.sets = sets
  };

  let setsObj = {
    
  }

  return (
    <div className="container__first-setmanager">
      <div className="setmanager-reps">
        <p>Set number {number}</p>
        <p>How much reps?</p>
        <select
          className="reps-select"
          value={howMuchReps}
          onChange={(event) => setHowMuchReps(event.target.value)}>
          {numberOfReps.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="setmanager-reps">
        <p>Weight?</p>
        <input
          className="reps-select"
          type="number"
          value={repWeight}
          onChange={(event) => setRepWeight(event.target.value)}></input>
      </div>
    </div>
  );
}

export default SetManager;
