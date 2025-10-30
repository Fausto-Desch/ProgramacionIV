import {test, expect} from 'vitest';
import { ProductSchema } from '../types/Productos';

test('valida un producto correcto', () => {
  const producto = { id: '1', name: 'Café', price: 500 };
  expect(() => ProductSchema.parse(producto)).not.toThrow();
});