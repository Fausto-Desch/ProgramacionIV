# ✅ **TP3 – Cafetería (React + TDD + MSW + Zod)**

## 📌 **Descripción General**
Este trabajo práctico implementa una aplicación de toma de pedidos para una cafetería.  
El frontend está desarrollado con **React + TypeScript**, siguiendo **Desarrollo Guiado por Pruebas (TDD)** utilizando **Vitest + React Testing Library + MSW**.

El backend consiste en un servidor Express simple que expone endpoints del menú y los pedidos.  
La API final utilizada por el frontend está completamente mockeada mediante **Mock Service Worker (MSW)**.

---

# 🚀 **Cómo ejecutar el proyecto**

El repositorio contiene dos carpetas principales:

```
TP3/
│── Cafeteria-BackEnd/
│── Cafeteria-FrontEnd/
```

---

# 🔧 **1. Backend — Cafeteria-BackEnd**

### 📁 Ubicación
```
TP3/Cafeteria-BackEnd
```

### 📦 **Instalar dependencias**
```bash
npm install
```

### ▶️ **Ejecutar el servidor en modo desarrollo (TypeScript)**
```bash
npm run dev:ts
```

### ▶️ **Ejecutar el servidor compilado (JavaScript en /dist)**
```bash
npm run dev:js
```

### 🏗️ **Compilar TypeScript a JavaScript (modo watch)**
```bash
npm run build
```

### ✅ **Stack del Backend**
- Express
- TypeScript
- ts-node-dev
- Cors

### 📌 **Estructura principal**
```
src/
│── routes/
│   ├── menu.ts
│   └── ordenes.ts
│── types/
│   └── Producto.ts
└── server.ts
```

---

# 🎨 **2. Frontend — Cafeteria-FrontEnd**

### 📁 Ubicación
```
TP3/Cafeteria-FrontEnd
```

### 📦 **Instalar dependencias**
```bash
npm install
```

### ▶️ **Ejecutar la aplicación**
```bash
npm run dev
```

El proyecto se abrirá en:
```
http://localhost:5173/
```

### 📌 **Stack del Frontend**
- React + TypeScript + Vite
- Vitest + React Testing Library + UserEvent
- Mock Service Worker (MSW)
- Zod (validaciones)
- Context API (estado global)
- Axios para requests
- ESLint configurado

### 📂 **Estructura del Frontend**
```
src/
│── components/
│   ├── Orden.tsx
│   ├── Total.tsx
│   └── Menu.tsx
│── context/
│   └── OrdenContext.tsx
│── mocks/
│   ├── handlers.ts
│   └── server.ts
│── test/
│   ├── menu.test.tsx
│   └── producto.test.tsx
│── types/
│   └── Productos.ts
```

---

# 🧪 **3. Ejecución de Tests (TDD)**

### ▶️ **Correr los tests del frontend**
```bash
npm run test
```

> *Vitest corre todos los tests utilizando JSDOM y MSW para simular la API.*

### 🧰 Funcionalidades cubiertas en los tests:
✅ Carga inicial del menú (HU1)  
✅ Agregar ítems al pedido (HU2)  
✅ Calcular total (HU3)  
✅ Eliminar ítems (HU4)  
✅ Enviar pedido (mock POST) (HU5)  
✅ Manejo de errores y menú vacío (HU6)  

---

# 🌐 **Endpoints del Backend**

### ✅ Menú
```
GET /api/menu
```

### ✅ Pedidos
```
POST /api/orders
```

> Nota: En el frontend, estos endpoints se mockean mediante MSW. No es necesario tener el backend levantado para que el frontend funcione.

---

# ✅ **4. Requerimientos implementados (según consigna del TP)**

### ✔️ React + TypeScript + Vite  
### ✔️ Tests unitarios y de integración con TDD  
### ✔️ React Testing Library + consultas accesibles  
### ✔️ Mock Service Worker (MSW)  
### ✔️ Manejo de estado con Context API  
### ✔️ Validaciones con Zod  
### ✔️ Ciclo Rojo → Verde → Refactor aplicado en cada HU  
