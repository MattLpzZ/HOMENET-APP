HOMENET APP-web/
├── backend/
│   ├── controllers/
│   │   └── inventarioController.js      # Funciones para manejar productos, etc.
│   ├── routes/
│   │   └── inventarioRoutes.js          # Rutas de la API (GET, POST, PUT, DELETE)
│   ├── db.js                            # Conexión PostgreSQL
│   ├── index.js                         # Servidor Express
│   ├── package.json                     # Dependencias del backend
│   └── .env                             # Variables de entorno (datos PostgreSQL)
│
├── frontend/
│   ├── index.html                       # Interfaz principal
│   ├── style.css                        # Estilos
│   ├── app.js                           # JS para hacer fetch a la API
│   └── assets/                          # Imágenes, íconos, etc.
│
├── nginx/
│   └── inventario.conf                  # Configuración para Nginx
│
└── README.md

# Inventario Web

Sistema de inventario con frontend en HTML/CSS/JS y backend en Node.js + PostgreSQL.

## Scripts

### Backend
```bash
cd backend
npm install
npm start
