import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StaticsLine = ({ text, value }) => {
  if (value === 0 && text === "Total") {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}:</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const JobsAnecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const nextSelected = (selected + 1) % anecdotes.length;
    setSelected(nextSelected);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
      <button onClick={handleNext}>Next Anecdote</button>
      <button onClick={handleVote}>Vote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const positive = (good * 100) / (good + neutral + bad);
  const average = (good + neutral) * (good + neutral + bad) / 100

  const setOpinion = (newOp, setOp) => {
    setOp(newOp + 1)
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={() => setOpinion(good, setGood)} text="good" />
        <Button handleClick={() => setOpinion(neutral, setNeutral)} text="neutral" />
        <Button handleClick={() => setOpinion(bad, setBad)} text="bad" />
        <h1>Statics</h1>
        <table>
          <tbody>
            <tr>
              <td>Answer</td>
              <td>Votes</td>
            </tr>
          </tbody>
        </table>
        <StaticsLine text="Good" value={good} />
        <StaticsLine text="Neutral" value={neutral} />
        <StaticsLine text="Bad" value={bad} />
        <StaticsLine text="Average" value={average} />
        <StaticsLine text="Positive" value={positive || "0"} />
        <StaticsLine text="Total" value={total} />
      </div>
      <div>
        <JobsAnecdotes />
      </div>
    </div>
  )
}

export default App
