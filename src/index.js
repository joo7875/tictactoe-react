import React from "react";
import ReactDOM from "react-dom/client";
import TicTacToe from "./TicTacToe";

const defaultProps = {
  numCols: 3,
  numRows: 3,
  players: ["Candidate", "Interviewer"],
  symbols: ["X", "O"],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TicTacToe {...defaultProps} />
  </React.StrictMode>
);
