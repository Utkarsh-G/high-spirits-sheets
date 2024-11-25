import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders melee attack category header', () => {
  render(<App />);
  const linkElement = screen.getByText(/melee attack/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders a roll when roll button is clicked, and resets other rolls', async () => {
  render(<App />);
  const rangeButton = screen.getByTestId('button Ranged Attack');
  userEvent.click(rangeButton);

  await waitFor(() => {
    const rollTextMelee = screen.getByTestId('roll Melee Attack');
    expect(rollTextMelee.textContent).toMatch("");

    const rollText = screen.getByTestId('roll Ranged Attack');
    expect(rollText.textContent).toMatch(/\d/);
  })

  const meleeButton = screen.getByTestId('button Melee Attack');
  userEvent.click(meleeButton);

  await waitFor(() => {
    const rollTextMelee = screen.getByTestId('roll Melee Attack');
    expect(rollTextMelee.textContent).toMatch(/\d/);

    const rollText = screen.getByTestId('roll Ranged Attack');
    expect(rollText.textContent).toMatch("");
  })
  
});
