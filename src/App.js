import React from "react";

import Die from "./dice"

import { nanoid } from 'nanoid'

import Img from "./congrat.gif"

export default function App() {
const [dice, setDice] = React.useState(allNewDice())
const [tenz, setTenz] = React.useState(false)
const [count, setCount] = React.useState(0)

const [seconds, setSeconds] = React.useState(0);
const [isActive, setIsActive] = React.useState(false);

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenz(true);
      setIsActive(!isActive)
    }
}, [dice])

function genNewDie() {
  return {
    value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
  }
}

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(genNewDie())
    }
    return newDice
  }

  function rollDice() {
    setIsActive(true);
    setCount(yesCount => yesCount + 1)
    if(!tenz) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : genNewDie()
      }))
    } else {
      setTenz(false)
      setDice(allNewDice())
      setCount(0)
      setIsActive(false);
      setSeconds(0);
    }
  }

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
  }));  
}

const diceEle = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      
      <h2 className="title">Tenzies</h2>
      {tenz ? <img src={Img} alt="congrat" width="300px" className="img"/> : <p className="inst">Your goal is to roll untill <strong>all Dice </strong>are the same NUMBER. Click the particlar NUMBER to freeze it at its current value between rolls.</p>}

      <div className="container">
        {diceEle}
      </div>

      <button
        onClick={rollDice}
        className="btn">
          {tenz ? "New Game" : "Roll Dice"}🎲⌚: {seconds}s<br/>
          Number of Roll: {count}
      </button>

      <p className="made">Made by <a href="http://greenojegwo.netlify.app/" className="made">Green↗</a></p>
    </main>
  )
}