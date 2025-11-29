import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:4000/api/menu', () => {
    return HttpResponse.json([
      { id: '1', name: 'Café', price: 500 },
      { id: '2', name: 'Té', price: 400 },
      { id: '3', name: 'Medialuna', price: 300 },
    ]);
  }),

  http.post('/api/orders', async ({ request }) => {
    const data = await request.json();
    console.log('Pedido recibido:', data);
    return HttpResponse.json({ message: 'Pedido confirmado' });
  }),
];