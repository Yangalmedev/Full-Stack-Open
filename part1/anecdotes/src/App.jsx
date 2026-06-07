import { useState } from "react";

const Button = ({setAnecdotes, anecdoteList}) => {
  const handleAnecdotes = () => {
    const random = Math.floor(Math.random() * anecdoteList.length);

    setAnecdotes(random);
    console.log('This is a random number', random);
  }

  return (
    <button onClick={handleAnecdotes}>next anecdote</button>
  )
}

const MostVote = ({vote, anecdoteList}) => {
  let mostvote = 0;

  for(let i=1; i < vote.length; i++){
    if(vote[i] > vote[mostvote]){
      mostvote = i;
    }
  }

  return (
    <div>
      <h3>Anecdote with most vote</h3>
      <p><strong>{anecdoteList[mostvote]} <br /> has {vote[mostvote]} votes</strong></p>
    </div>
  )

};

const App =() => {
  const [anecdote, setAnecdotes] = useState(0);

  const anecdoteList = [
    'If it hurts, do it more often', 'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [vote, setVote] = useState(Array(anecdoteList.length).fill(0));

  const handleVotes = () => {
    const copy = [... vote];
    copy[anecdote] += 1;
    setVote(copy);
  }

  return(
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdoteList[anecdote]} <br /> has {vote[anecdote]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <Button setAnecdotes={setAnecdotes} anecdoteList={anecdoteList}/>
      <MostVote vote={vote} anecdoteList={anecdoteList}/>
    </div>
  )
}

export default App;