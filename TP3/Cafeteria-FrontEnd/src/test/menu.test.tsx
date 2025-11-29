import { render, screen, waitFor } from '@testing-library/react';
import { OrderProvider } from '../context/OrdenContext';
import { Menu } from '../components/menu';
import { expect, test } from 'vitest';

test('muestra productos del menú mockeado', async () => {
  render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  );
  await waitFor(() => expect(screen.getByText('Café', { exact: false })).toBeInTheDocument());
});
