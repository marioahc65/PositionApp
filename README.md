Proyecto Full Stack - Position API y Frontend en React
Descripción
Este proyecto es una API de gestión de posiciones en una empresa, junto con un frontend desarrollado en React. La API está construida con .NET 8 y utiliza MediatR, FluentValidation y Entity Framework para gestionar las posiciones. El frontend es una SPA (Single Page Application) desarrollada con React, usando Vite como bundler y gestionando el estado con Context API.

Tecnologías
Backend (.NET 8)
FluentValidation: Para validaciones de los datos de entrada.

MediatR: Para la gestión de comandos y consultas (CQRS).

Entity Framework Core: Para la gestión de la base de datos (en este caso, en memoria).

Swagger/OpenAPI: Para documentar y probar la API de forma interactiva.

ASP.NET Core: Para crear la API RESTful.

Frontend (React)
React 18+: Para el desarrollo de la interfaz de usuario.

Vite: Como bundler y servidor de desarrollo.

Context API: Para gestionar el estado de la aplicación.

Fetch API: Para consumir la API del backend, con autenticación mediante clave API.

React Router: Para la navegación entre las diferentes vistas.

Requisitos
.NET 8 SDK o superior

Node.js (para el frontend)

npm o yarn

Instalación
Backend (.NET)
Clona el repositorio:

bash
Copy
Edit
git clone <repositorio-url>
cd PositionAPI
Restaura los paquetes NuGet:

bash
Copy
Edit
dotnet restore
Ejecuta la API:

bash
Copy
Edit
dotnet run
La API estará disponible en http://localhost:5000.

Frontend (React con Vite)
Navega a la carpeta del frontend:

bash
Copy
Edit
cd position-frontend
Instala las dependencias:

bash
Copy
Edit
npm install
Crea el archivo .env con las siguientes variables:

ini
Copy
Edit
VITE_API_URL=http://localhost:5000/api/positions
VITE_API_KEY=your-api-key-here
Ejecuta el servidor de desarrollo:

bash
Copy
Edit
npm run dev
El frontend estará disponible en http://localhost:5173.

Estructura del Proyecto
bash
Copy
Edit
.
├── PositionAPI/                   # Backend en .NET 8
│   ├── Controllers/               # Controladores de la API
│   ├── Commands/                  # Comandos MediatR
│   ├── Queries/                   # Consultas MediatR
│   ├── Validators/                # Validadores FluentValidation
│   ├── Program.cs                 # Configuración y arranque de la aplicación
│   └── Startup.cs                 # Configuración de servicios y middlewares
│
├── position-frontend/              # Frontend en React
│   ├── src/                       # Código fuente de React
│   ├── components/                # Componentes reutilizables
│   ├── App.jsx                    # Componente principal
│   ├── .env                       # Variables de entorno
│   └── vite.config.js             # Configuración de Vite
│
└── PositionAPI.test/               # Proyecto de pruebas unitarias para el backend
    ├── UnitTests/                 # Pruebas de los servicios
    └── IntegrationTests/          # Pruebas de integración de la API
Rutas de la API
GET /api/positions: Obtiene todas las posiciones.

GET /api/positions/{id}: Obtiene una posición por su ID.

POST /api/positions: Crea una nueva posición.

PUT /api/positions/{id}: Actualiza una posición.

DELETE /api/positions/{id}: Elimina una posición.

Pruebas
Clona el repositorio y navega a la carpeta de las pruebas:

bash
Copy
Edit
cd PositionAPI.test
Restaura los paquetes NuGet para las pruebas:

bash
Copy
Edit
dotnet restore
Ejecuta las pruebas:

bash
Copy
Edit
dotnet test
Contribuciones
Fork el repositorio.

Crea una nueva rama para tu característica (git checkout -b feature/nueva-caracteristica).

Realiza tus cambios.

Asegúrate de que las pruebas pasen.

Haz commit de tus cambios (git commit -am 'Agregué nueva característica').

Push a tu rama (git push origin feature/nueva-caracteristica).

Abre un Pull Request.

Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
