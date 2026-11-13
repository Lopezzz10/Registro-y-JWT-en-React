# Registro y JWT en React

Aplicación web en React que consume un backend en Spring Boot con autenticación JWT. Permite registrar usuarios, iniciar sesión y consultar el perfil del usuario autenticado.

## Funcionalidades

- Registro de usuarios con nombre de usuario, contraseña y rol (USER o ADMIN).
- Inicio de sesión con almacenamiento del token JWT.
- Ruta protegida de perfil, accesible solo con token válido.
- Cierre de sesión con invalidación del token en el servidor.
- Diseño responsive con tema oscuro y estilo futurista.

## Tecnologías

- React 19
- React Router DOM 7
- Vite
- Backend: Spring Boot, Spring Security y JWT

## Estructura del proyecto

```
mi-proyecto-jwt/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── config/
│   │   └── apiConfig.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Registrar.jsx
│   │   └── Perfil.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Rutas de la aplicación

| Ruta         | Acceso    | Descripción                  |
|--------------|-----------|------------------------------|
| `/login`     | Pública   | Inicio de sesión             |
| `/registrar` | Pública   | Registro de nuevos usuarios  |
| `/perfil`    | Protegida | Datos del usuario autenticado |

## Endpoints del backend

| Método | Endpoint          | Descripción                      |
|--------|-------------------|----------------------------------|
| POST   | `/auth/registrar` | Crea un nuevo usuario (201)      |
| POST   | `/auth/login`     | Devuelve el token JWT            |
| GET    | `/auth/perfil`    | Devuelve los datos del usuario   |
| POST   | `/auth/logout`    | Invalida el token                |

## Requisitos

- Node.js 18 o superior
- Backend Spring Boot en ejecución en `http://localhost:8080`

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se abre en `http://localhost:5173`.

## Configuración

La URL del backend se define en `src/config/apiConfig.js`:

```js
export const API_BASE_URL = 'http://localhost:8080'
```

El backend debe permitir CORS para el origen `http://localhost:5173`.