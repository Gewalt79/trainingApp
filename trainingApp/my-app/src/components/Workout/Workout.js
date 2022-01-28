import React from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../Context';
import 'react-datepicker/dist/react-datepicker.css';
import SetManager from './SetManager';
//НАДО ВЫНЕСТИ ПОЛЕ С НАСТРОЙКОЙ ПОДХОДА В ОТДЕЛЬНЫЙ КОМПОНЕНТ И КОГДА
//ДВИГАЕШЬ ПОЛЗУНОК СОЗДАЕТСЯ НОВЫЙ КОМПОНЕНТ И ТУДА ПЕРЕДАЕТСЯ НОМЕР ПОДХОДА
//И ИЗ ЭТОГО КОМПОНЕНТА НУЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЕ ВЫШЕ ПО ДЕРЕВУ, ОБРАТНО СЮДА
//ТАК В КАЖДОМ КОМПОНЕНТЕ БУДУТ СОХРАНЯТЬСЯ ЗНАЧЕНИЯ ПЕРЕДАНЫЕ СЮДА И ХРАНИТЬСЯ
//ОНИ БУДУТ В ОБЪЕКТЕ
//const obj = {
// 1: {reps: 10, weight:50}, ключ в объекте создаем уже внутри нового компонента
// 2: {reps: 8, weight: 60}, и записываем его при этом передаем его в сам компонент
// 3: {reps: 6, weight: 65}, чтобы значения не менялись {obj.1.reps ? obj.1.reps : 0}
// 4: {reps, 4, weight, 72}
//}
function Workout() {
  const optionsGroup = ['Chest', 'Back', 'Legs', 'Arms'];

  const optionsExerciseChest = [
    'Barbell Bench Press',
    'Dumbbell Bench Press',
    'Smith Machine Incline Press',
    'Incline Dumbbell Flye',
    'Cable Crossover',
    'Incline Dumbbell Press',
    'Chest Press Machine',
    'Dumbbell Flye',
    'Low-Cable Crossover',
    'Low-Incline Press',
  ];

  const optionsExerciseBack = [
    'Deadlift',
    'Pull-Up',
    'Bent-Over Row',
    'Chest Supported Row',
    'Single-Arm Dumbbell Row',
    'Inverted Row',
    'TRX Suspension Row',
    'Lat Pulldown',
    'Neutral Grip Pulldown',
    'Seated Cable Row (for Lats)',
  ];

  const optionsExerciseLegs = [
    'Barbell Bulgarian Split Squat',
    'Seated Dumbbell Calf Raise',
    'Romanian Deadlift',
    'Goblet Squat',
    'Barbell Side Lunge',
    'Good Morning',
    'Battle Ropes Reverse Lunge',
    'Kettlebell Pistol Squat',
    'Hip Thruster',
    'Single Leg Curl',
  ];

  const optionsExerciseArms = [
    'Lateral Raise (Side Raise)',
    'Overhead Extension',
    'Push-Ups',
    'Tricep Push-Ups',
    'Two-Arm Kettlebell Swing',
    'Plank To Push-Up',
    'Tricep Dips',
    'Dumbbell Punch',
  ];

  const [startDate, setStartDate] = React.useState(new Date());
  const [muscleGroup, setMuscleGroup] = React.useState('Chest');
  const [exercise, setExercise] = React.useState('');
  const [numberOfSets, setNumberOfSets] = React.useState(1);
  const [manageSet, setManageSet] = React.useState(1);
  const value = React.useContext(AuthContext);

  let workoutExersice = {
    date: startDate,
    muscleGroup: muscleGroup,
    exercise: exercise,
    sets: {}
  };


  function handleWorkout(_sets) {
    workoutExersice.sets = _sets; // sets == {sets: {"1": [10, 50], "2": [8, 60], "3": [6, 70]}}
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Add your workout</h1>
      <div className="workoutmanager">
        <div className="workoutmanager-container">
          <div className="container__first">
            <p className="container__first-text">Select date</p>
            <DatePicker
              dateFormat="dd/MMM/yyyy"
              className="container__first-input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="container__first">
            <p className="container__first-text">Select muscle group</p>
            <select
              className="container__first-input"
              value={muscleGroup}
              onChange={(event) => setMuscleGroup(event.target.value)}>
              {optionsGroup.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="container__first">
            <p className="container__first-text">Add exercise</p>
            <select
              className="container__first-input"
              value={exercise}
              onChange={(event) => setExercise(event.target.value)}>
              {muscleGroup === 'Chest'
                ? optionsExerciseChest.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })
                : ''}
              {muscleGroup === 'Back'
                ? optionsExerciseBack.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })
                : ''}
              {muscleGroup === 'Legs'
                ? optionsExerciseLegs.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })
                : ''}
              {muscleGroup === 'Arms'
                ? optionsExerciseArms.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })
                : ''}
            </select>
          </div>
          <div className="container__first">
            <p className="container__first-text">How much sets?</p>
            <input
              className="container__first-input"
              type="range"
              min="1"
              max="8"
              value={numberOfSets}
              onChange={(e) => setNumberOfSets(e.target.value)}></input>
          </div>
          <div className="container__first">
            <p className="container__first-text">Manage set</p>
            <input
              className="container__first-input"
              type="range"
              min="1"
              max={numberOfSets}
              value={manageSet}
              onChange={(e) => setManageSet(e.target.value)}></input>
          </div>
          <div className="container__first">
            <SetManager number={manageSet} workout={workoutExersice} />
          </div>
          <button className="button">End</button>
        </div>
      </div>
    </div>
  );
}

export default Workout;
