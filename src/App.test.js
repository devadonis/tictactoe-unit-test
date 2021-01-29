import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tic Tac Toe/i);
  expect(linkElement).toBeInTheDocument();
	// screen.debug();
});
