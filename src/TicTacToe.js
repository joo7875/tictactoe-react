import React, { useState } from "react";

const Board = ({ settings }) => {
  const { numCols, numRows, players, symbols } = settings;

  function getInitialBoard() {
    let board = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) row.push(".");
      board.push(row);
    }

    return board;
  }

  const [board, setBoard] = useState(getInitialBoard());
  const [order, setOrder] = useState(0);
  const [winner, setWinner] = useState(null);

  function handleClick(row, col) {
    board[row][col] = symbols[order];
    setBoard([...board]);
    setOrder((order + 1) % players.length);

    if (checkWinner(row, col)) setWinner(players[order]);
  }

  function checkWinner(row, col) {
    const horizontal = board[row].every((cell) => cell === symbols[order]);
    const vertical = board.every((row) => row[col] === symbols[order]);
    const positiveDiagonal = diagonal().increment.every(
      (cell) => cell === symbols[order]
    );
    const negativeDiagonal = diagonal().decrement.every(
      (cell) => cell === symbols[order]
    );

    return horizontal || vertical || positiveDiagonal || negativeDiagonal;
  }

  function diagonal() {
    let increment = [],
      decrement = [];
    for (let i = 0; i < numRows; i++) {
      increment.push(board[i][i]);
      decrement.push(board[i][numRows - 1 - i]);
    }
    return { increment, decrement };
  }

  function reset() {
    setBoard(getInitialBoard());
    setWinner(null);
    setOrder(0);
  }

  return (
    <>
      <div>Player: {players[order]}</div>
      {winner && <div>Winner: {winner}</div>}
      {board.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((cell, j) => (
            <div
              key={j}
              style={{
                display: "flex",
                border: "solid 1px #000000",
                width: "50px",
                height: "50px",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      {winner && <button onClick={reset}>Start game</button>}
    </>
  );
};

const TicTacToe = (prop) => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board settings={prop} />
    </div>
  );
};

export default TicTacToe;
