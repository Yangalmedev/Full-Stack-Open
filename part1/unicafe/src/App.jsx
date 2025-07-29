import Button from "./Button";
import StatisticLine from "./StatisticLine";

import { useState } from "react";

const Statistics = ({good, neutral, bad}) => {

  if(good === 0 && neutral === 0 && bad === 0) return <h3>No feedback given</h3>;

  const total = good + neutral + bad;
  const getAverage = () => {
    if(total === 0) return 0;
    console.log("total", total);
    const score = good * 1 + neutral * 0 + bad * -1;
    return (score / total);
  };

  const getPositive = () => {
    if (total === 0) return 0;
    return (good / total) * 100;
  };

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good}/>
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral}/>
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad}/>
        </tr>
        <tr>
          <StatisticLine text="all" value={total}/>
        </tr>
        <tr>
          <StatisticLine text="average" value={getAverage()}/>
        </tr>
        <tr>
          <StatisticLine text="positive" value={getPositive() + ' %'}/>
        </tr>
      </tbody>
    </table>
  );
};


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const handleGood = () => setGood(good + 1);
  console.log('value of good', good);
  const handleNeutral = () => setNeutral(neutral + 1);
  console.log('value of neutral', neutral);
  const handleBad = () => setBad(bad + 1);
  console.log("value of bad", bad);

  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
};

export default App;
