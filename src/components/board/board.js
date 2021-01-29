import Square from "../square/square";
import React from 'react';
import { checkWinner } from "../../utilities/checkWinner";
import './board.css';
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      squares: (props.squares) ? props.squares : Array(9).fill(null),
      xAndOToggle: true,
      canUndo: false,
      history: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    const history = this.state.history.slice();
    history[0] = Array(9).fill(null);
    history[this.state.steps + 1] = squares;
    squares[i] = this.state.xAndOToggle ? 'X' : 'O';
    this.setState({
      squares: squares,
      xAndOToggle: !this.state.xAndOToggle,
      canUndo: true,
      history: history,
      steps: this.state.steps + 1
    });
  }

  renderSquare(i) {
    return (
      <Square
				testid={`square_${i}`}
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderBoard() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderRow(0, 2)}
        </div>
        <div className="board-row">
          {this.renderRow(3, 5)}
        </div>
        <div className="board-row">
          {this.renderRow(6, 8)}
        </div>
      </div>
    )
  }

  renderRow(start, end) {
    let row = []
    for (let i = start; i <= end; i++) {
      row.push(this.renderSquare(i));
    }
    return row;
  }

  render() {
    const winner = checkWinner(this.state.squares);
    let gameSummary;
    let currentPlayer = `Player to make move is ${this.state.xAndOToggle ? 'X' : 'O'}`;
    if (winner) {
      gameSummary = 'Winner: ' + winner;
    }
    else if (this.state.steps === 9 && !winner) {
      gameSummary = 'Game Drawn';
    }
    return (
      <div className="container-vertical">
        <div className="status">{currentPlayer} </div>
        <div className="center">
          {this.renderBoard()}
        </div>
        <div className="game-options" >
          <button className="btn btn-reset" onClick={this.resetGame} disabled={this.state.steps < 1}>Reset</button>
          <button className="btn btn-undo" onClick={this.undoState} disabled={!this.state.canUndo}>Undo</button>
        </div>
        <div className="status center"> {gameSummary} </div>
      </div>
    );
  }

  undoState = () => {
    let previousSquare = this.state.history[this.state.steps - 1];
    let previousHistory = this.state.history;
    previousHistory[this.state.steps] = null;
    let steps = this.state.steps - 1;
    this.setState({
      squares: previousSquare,
      steps: steps,
      xAndOToggle: !this.state.xAndOToggle,
      history: previousHistory,
      canUndo: steps >= 1
    })
  }

  resetGame = () => {
    this.setState({
      steps: 0,
      squares: Array(9).fill(null),
      xAndOToggle: true,
      canUndo: false,
      history: Array(9).fill(null)
    });
  }
}

export default Board;