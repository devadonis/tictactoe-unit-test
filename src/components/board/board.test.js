import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Board from './Board';

afterEach(cleanup);

test("should render board with correct number of squares", () => {
	// render the board component
	const { getAllByTestId } = render(<Board />);

	// check that the correct number of squares is rendered
	expect(getAllByTestId(/square/).length).toEqual(9);
});

test("should display result of next player's move", () => {
	render(<Board />);

	// first player click the first square
	fireEvent.click(screen.getByTestId("square_0"));
	
	// validate that it has 'X' rendered
	expect(screen.getByTestId("square_0")).toHaveTextContent("X");

	// second player click
	fireEvent.click(screen.getByTestId("square_1"));

	// validate that it has 'O' rendered
	expect(screen.getByTestId("square_1")).toHaveTextContent("O");
});

test("should not make a sign if the square is not empty", () => {
	const { getByTestId } = render(<Board squares={["X", null, "O", null, null, null, null, null, null]} />);

  // click non-empty square
  fireEvent.click(getByTestId("square_2"));
  
  // should have initial value
  expect(getByTestId("square_2")).toHaveTextContent("O");

});

test("should correctly show Player X as a winner", () => {
  // prettier-ignore
  const grid = [
    "X", "X", null,
    "O", "O", null,
    "X", null, "O"
  ];
  const { getByTestId, getByText } = render(<Board squares={grid} />);

  // Make the winning sign
  fireEvent.click(getByTestId("square_2"));

  // Check that result is declared properly
  expect(getByText("Winner: X")).toBeInTheDocument();
});

test("should correctly show Player O as a winner", () => {
  // prettier-ignore
  const grid = [
    "O", null, "O",
    "X", "O",  "X",
    null, "X", null
  ];
  const { getByTestId, getByText } = render(<Board squares={grid} />);

  // make the move (X)
	fireEvent.click(getByTestId("square_1"));
	// make the move (Y)
	fireEvent.click(getByTestId("square_6"));

  // check that result is declared properly
  expect(getByText("Winner: O")).toBeInTheDocument();
});

test("should start a new game after 'Reset' button is pressed", () => {
  // prettier-ignore
  const grid = [
    "O", null, "O",
    "X", "O", null,
    null, "X", "X"
  ];
  const { getByTestId, getByText } = render(<Board squares={grid} />);

  // make the winning move
  fireEvent.click(getByTestId("square_6"));

	expect(getByText("Winner: X")).toBeInTheDocument();

	fireEvent.click(getByText("Reset"));

	expect(getByText('Reset')).toHaveAttribute('disabled');
});

// test("should correctly display the draw result", () => {
//   // prettier-ignore
//   const grid = [
//     "X", "X", "O",
//     "O", "O", null,
//     "X", "X", "O"
//   ];
//   const { getByTestId, getByText } = render(<Board squares={grid} />);

//   // make the final move (X)
//   fireEvent.click(getByTestId("square_5"));

//   // check that result is declared properly
//   expect(getByText("Game Drawn")).toBeInTheDocument();
// });