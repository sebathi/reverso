import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Reverso title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Reverso/i);
  expect(linkElement).toBeInTheDocument();
});
