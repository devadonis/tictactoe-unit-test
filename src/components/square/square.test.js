import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Square from './square';

test('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
	const onClick = jest.fn();
	render(<Square onClick={onClick} />);

  fireEvent.click(screen.getByRole('button'));
	expect(onClick).toHaveBeenCalledTimes(1);
});