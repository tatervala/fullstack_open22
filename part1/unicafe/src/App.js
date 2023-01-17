import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h2>
          statistics
        </h2>
        <div>
          No feedback given yet
        </div>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.total} />
        <StatisticsLine text="average" value={props.avg} />
        <StatisticsLine text="pos" value={props.pos} />
        </tbody>
      </table>
    </div>
  )
}
const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}
      </button>
    </div>

  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      <div>{props.text} {props.value}</div>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad ] = useState(0)
  const total = (good + neutral + bad)
  const g = good * 1
  const n = 0
  const b = bad * -1
  const avg = ((g+n+b) / total)
  const pos = ((g/total)*100)
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total}
       avg = {avg} pos = {pos}/>

    </div>
    
  )
}

export default App