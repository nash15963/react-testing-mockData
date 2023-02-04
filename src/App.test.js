import { render, screen } from '@testing-library/react';
import App from './App';
import MovieList from './MovieList';

describe('test App should working', () => {
  test('element should exist', () => {
    render(<MovieList/>)

    expect(screen.getAllByRole('img')).toHaveLength(10) 
    expect(screen.getAllByRole('button')).toHaveLength(10) 
  })
});


test('renders fist time and it should run', () => {
  render(<App />);
  expect(screen.getByRole('heading', {name: "movie list"})).toBeInTheDocument();
});
