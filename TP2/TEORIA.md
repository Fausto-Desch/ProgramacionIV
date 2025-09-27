Explique el ciclo Rojo → Verde → Refactor y por que es importante el tamaño de los pasos.
Rojo: Es el que escribe un test que falla (define comportamiento).
Verde: Implementa lo minimo para pasar el test.
Refactor: Limpiar el codigo mantenimiento los tests en verde.
Importancia del tamaño de los pasos: si son chicos, el feedback es rapido, se localizan errores facilmente y se evita sobre–ingenieria. Si los pasos son grandes, se pierde seguridad y claridad.

Diferencie tests unitarios, de integracion y E2E en APIs.
La difetencia entre el test unitarios, integracion y E2E es que los unitarios prueba funciones/clases asiladas, los integracion prueban interacciones entre modulos y los E2E prueban el sistema completo como lo usaria un usuario.

Que es un doble de prueba? Defina mock, stub y spy y cuando conviene cada uno.
Un doble de prueba (o test double) es un objeto o componente "falso" que se usa en un test para reemplazar a uno real.
Stub: objeto que devuelve respuestas prefijadas.
Mock: objeto con expectativas preconfiguradas que deben cumplirse.
Spy: objeto que espia llamadas reales.
Usar stub cuando solo importa el que devuelve, mock cuando importa el como se llamo, y spy para inspeccionar efectos secundarios.

Por que es util separar app de server? Muestre (en 8–10 lineas) un ejemplo minimo con makeApp() y un test de integracion con Supertest.
Es util ya que permite testear la app sin levantar ningun puerto.
ejemplo:

// app.js
import express from "express";
export function makeApp() {
  const app = express();
  app.get("/ping", (req, res) => res.json({ ok: true }));
  return app;
}

// server.js
import { makeApp } from "./app.js";
makeApp().listen(3000);

// app.test.js
import request from "supertest";
import { makeApp } from "./app.js";
test("GET /ping", async () => {
  const res = await request(makeApp()).get("/ping");
  expect(res.body).toEqual({ ok: true });
});


Zod: diferencia entre parse y safeParse. Donde usaria cada uno en una ruta Express y por que?
parse: valida o lanza excepcion (throw) si falla.
safeParse: devuelve { success, data/error } sin lanzar excepcion.
En middleware Express conviene safeParse (puedes devolver 400 sin romper el flujo).
En logica interna/funciones se usa parse porque si falla es un bug critico.

De dos ejemplos de reglas de dominio que deben probarse con tests unitarios (no solo validacion de entrada).
En un carrito, no permitir comprar mas unidades que stock disponible.
En una cuenta bancaria, no permitir transferir si saldo < monto.

Que malos olores suele haber en suites de tests? De 3 ejemplos (naming, duplicacion, asserts debiles, mocks fragiles, etc.).
Malos olores en suites de tests

En los tests tambien aparecen "malos olores" que dificultan su mantenimiento:

Naming pobre: tests con nombres genericos como test("funciona") no dicen que se esta probando. Es mejor describir escenario y resultado esperado.

Duplicacion: repetir setups o datos en muchos tests vuelve la suite larga y dificil de mantener. Se soluciona con helpers o builders.

Asserts debiles: solo verificar status 200 o que "no tiro error" da falsa seguridad. Hay que chequear tambien los datos y efectos relevantes.

Mocks fragiles: abusar de mocks de dependencias hace que cambios internos rompan tests innecesariamente.

Como trazara criterios de aceptacion ↔ tests? Incluya un mini ejemplo de tabla con 2 filas.

Criterio aceptacion	Test asociado
"El usuario puede loguearse con email y password validos"	Test E2E POST /login con credenciales correctas → 200 y token
"No se permite registrar dos usuarios con el mismo email"	Test unitario de UserService.create() que lanza error en email duplicado

Por que no perseguir 100% de cobertura a toda costa? Mencione riesgos/limitaciones.
Incentiva tests triviales que no aportan valor.
Puede dar falsa sensacion de seguridad (no cubre todos los casos de negocio).
Hace que los tests sean fragiles y costosos de mantener.

Defina y de un ejemplo de helper/builder para tests.

// userBuilder.js
export function buildUser(overrides = {}) {
  return {
    id: "u1",
    email: "test@example.com",
    password: "secret",
    ...overrides,
  };
}

// test
const user = buildUser({ email: "otro@mail.com" });
expect(user.email).toBe("otro@mail.com");