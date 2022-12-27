import "./App.css";
import Field from "./Field";
import { useState } from "react";

function App() {
  const [fieldState, setFieldState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameState, setGameState] = useState("gameOn");

  const winCheck = (board) => {
    let result = false;
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [3, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (board[a] && board[b] === board[a] && board[c] === board[a]) result = true;
    }
    if( board.every((value) => {
          return value !== null;
          })
      ) {
        result = true;
      }
    return result;
  };

  const handleClick = (id) => {
    let newBoard = fieldState.slice();

    if ((newBoard[id] !== null) | (gameState !== "gameOn")) return;

    if (currentPlayer === "X") {
      newBoard[id] = "X";
      setCurrentPlayer("O");
    } else {
      newBoard[id] = "O";
      setCurrentPlayer("X");
    }
    setFieldState(newBoard);

    if (winCheck(newBoard)) setGameState("gameEnd");
  };

  return (
    <div className="gameBoard">
      <div className="playerDisplay">Current Player: {currentPlayer}</div>
      <div className="gameGrid">
        <Field clickAction={() => handleClick(0)} value={fieldState[0]} />
        <Field clickAction={() => handleClick(1)} value={fieldState[1]} />
        <Field clickAction={() => handleClick(2)} value={fieldState[2]} />
        <Field clickAction={() => handleClick(3)} value={fieldState[3]} />
        <Field clickAction={() => handleClick(4)} value={fieldState[4]} />
        <Field clickAction={() => handleClick(5)} value={fieldState[5]} />
        <Field clickAction={() => handleClick(6)} value={fieldState[6]} />
        <Field clickAction={() => handleClick(7)} value={fieldState[7]} />
        <Field clickAction={() => handleClick(8)} value={fieldState[8]} />
      </div>
      {gameState === "gameEnd" && (
        <>
          <h1 className="endGameDisplay">Game Ended! GG!</h1>
          <button
            className="goAgainButton"
            onClick={() => {
              setGameState("gameOn");
              setCurrentPlayer("X");
              setFieldState(Array(9).fill(null));
            }}>
            Go Again!
          </button>
        </>
      )}
    </div>
  );
}

export default App;
