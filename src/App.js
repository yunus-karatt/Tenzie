import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const { width, height } = useWindowSize();
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if(!tenzies){
      setDice((prevState) =>
      prevState.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
      );
    }else{
      setTenzies(false)
      setDice(allNewDice)
    }
  };

  const holdDice = (id) => {
    setDice((prevState) => {
      return prevState.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      );
    });
  };

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="div-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            onClick={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button onClick={rollDice} className="roll-btn">
        {tenzies ? "NEW GAME" : "ROLL"}
      </button>
      {tenzies && <Confetti width={width} height={height} />}
    </main>
  );
}

export default App;
