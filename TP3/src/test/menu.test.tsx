import { render, screen, waitFor } from '@testing-library/react';
import { Menu } from '../components/menu';
import {test, expect} from 'vitest';

test('muestra productos del menú', async () => {
  render(<Menu />);
  await waitFor(() => expect(screen.getByText('Café')).toBeInTheDocument());
});
