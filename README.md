# PRUEBA TECNICA FOOTLOOSE

Una aplicación simple de lista de tareas  para organizar y gestionar tus tareas diarias. Esta aplicación proporciona una interfaz intuitiva para agregar, marcar como completadas y eliminar tareas.

## Funcionalidades Principales

- **Agregar Tareas:** Añade nuevas tareas a tu lista.
- **Marcar como Completadas:** Indica cuando una tarea ha sido completada.
- **Eliminar Tareas:** Elimina las tareas que ya no son necesarias.
- **Actualizar tareas:** Actualiza una tarea de tu lista.

## Configuración del Entorno

### Requisitos Previos
- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado y configurado

### Base de datos
Debe importar la base de datos proporcionada en la raiz de ambos proyectos y configurar las variables de entorno

### Configuración de Variables de Entorno BACK-END

Crea un archivo `.env` en la raíz del proyecto (API) y configura las siguientes variables:

```
PORT=7000
DB_HOST=tu_host_de_base_de_datos
DB_USER=tu_usuario_de_base_de_datos
DB_NAME=tu_nombre_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_PORT=tu_puerto_de_base_de_datos (dejar vacio sino tiene puerto configurado)
```
### Levanta el proyecto FRONT-END
```
npm install
```
```
npm start
```

### Configuración de Variables de Entorno FRONT-END

Crea un archivo `.env` en la raíz del proyectoy configura las siguientes variables:

```
VITE_API_URL =  http://localhost:7000/api (ruta del puerto donde esta corrriendo la API)
```
### Levanta el proyecto BACK-END
```
npm install
```
```
npm start
```

### Tecnologías Utilizadas

React.js: Biblioteca para construir interfaces de usuario.
Boostrap: Biblioteca para construir interfaces de usuario.
Toastify: libreria para mostrar alertas.
Axios: libreria para manejar peticiones al servidor.
Node.js: Plataforma para ejecutar el servidor.
Express: Framework de Node.js para construir aplicaciones web y API.
Mysql: Base de datos ligera para almacenar las tareas.
