# Readme.md para el tp2

## User Stories abordadas:
- Como usuario, quiero crear una orden para registrar un nuevo pedido.
- Como usuario, quiero consultar una orden para conocer su estado y datos.
- Como usuario, quiero obtener(id) una orden para conocer su estado y datos.
- Como usuario, quiero cancelar una orden si fue creada por error.

---

## Testing del proyecto
Framework de testing utilizado: Vitest

## Descripcion de los testings realizados
Se implementaron pruebas unitarias y de integración para validar la correcta creación, obtención y cancelación de órdenes. Los tests fueron ejecutados con Vitest, utilizando mocks del objeto Response de Express para simular peticiones HTTP sin servidor real.     
Como resultado, las pruebas verifican tanto la lógica interna del modelo (Order) como las respuestas del controlador ante distintos escenarios. Todas las pruebas ejecutadas devolvieron resultados satisfactorios, confirmando que las operaciones CRUD básicas funcionan correctamente.

## Ejecución de los tests
### Ejecucion del vitest(solo)

Podemos ultilzar el comando:
```Bash
npx vitest run
```

### Ejecucion del test con coverage
```Bash
npm run test:coverage
```

| ID  | Caso / Descripción                 | Precondición                               | Input                                                                                     | Acción                           | Resultado esperado                                                                                | Test                       |
| --- | ---------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------- |
| CA1 | Crear una orden correctamente      | No existen órdenes previas registradas     | Objeto Order con datos válidos (id, size, toppings, address, status, price) | Ejecutar createOrder(req, res) | La orden se agrega a la lista orders, responde con código 201 y JSON con los datos ingresados | order.controller.test.ts |
| CA2 | Obtener una orden existente        | Debe existir una orden creada con id = 1 | req.params.id = "1"                                                                     | Ejecutar getOrder(req, res)    | Devuelve código 200 y JSON con los datos de la orden solicitada                                 | order.controller.test.ts |
| ER1 | Cancelar una orden inexistente     | No hay órdenes con el id especificado    | req.params.id = "999"                                                                   | Ejecutar cancelOrder(req, res) | Devuelve error 404 con mensaje “Order not found”                                                | order.controller.test.ts |
| R1  | Crear instancia del modelo Order | Clase Order definida correctamente       | Datos válidos del pedido (campos requeridos)                                              | Ejecutar new Order(orderData)  | Se crea una instancia con las propiedades correctas y tipo esperado                               | order.model.test.ts      |
