import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json([
      { id: '1', name: 'Cafe', price: 500 },
      { id: '2', name: 'Te', price: 400 },
      { id: '3', name: 'Medialuna', price: 300 },
    ]);
  }),

  http.post('/api/orders', async ({ request }) => {
    const data = await request.json();
    console.log('Pedido recibido:', data);
    return HttpResponse.json({ message: 'Pedido confirmado' });
  }),
];