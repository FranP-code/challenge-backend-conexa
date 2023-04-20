# Challenge Back-End Conexa 🚀

Documentación sobre el Challenge, tanto en lo técnico como al rededor de su desarrollo:

# Acceso

Se puede acceder a la API desde:

- API Link: https://franp-conexa.up.railway.app
- Documentación (Swagger) - https://franp-conexa.up.railway.app/docs
- Archivo con requests (Insomnia) - `/insomnia_request.json`

## Acceso desde local

Para levantar el servidor de la API junto con sus microservicios, esta preparada una imagen de docker junto con su respectivo Docker Compose que lo conecta con la base de datos de mongo.

Para levantarlo, esta preparado el comando `docker-compose up`.

En caso de no querer levantar la base de datos y querer acceder a una instancia de Mongo en remoto:
1. Definir el link de la base de datos en el archivo `.env`
2. Definir el puerto de la API en el archivo `.env`
3. Levantar unicamente la imagen de la app con el comando `docker build -t franp-conexa . && docker run -p PORT:PORT franp-conexa` siendo `PORT` el puerto definido en el archivo `.env`

# Microservicios

Los microservicios definidos son:

- **API**; que funciona como la capa desde donde el usuario interactúa con la aplicación
- **App**; que se la interpreta como el microservicio con la lógica de negocio del cliente
- **Auth**; que se encarga principalmente del manejo de los JWT
- **Storage**; que se encarga de gestionar las consultas a la base de datos
  - Dada la interfaz propuesta (principalmente definida en los archivos `remote.ts y router.ts`) se permite cambiar la base de datos muy fácilmente y hasta incluso delegar algunas queries a una base de datos y otras queries a otra base de datos.

# Arquitecturas

## Arquitectura Micro Servicios secundarios

La arquitectura general de todos los microservicios secundarios es la siguiente:

- `index -> router -> remote`
  En donde: - `index`; el archivo de definición inicial del microservicio - `router`; la definición de las rutas del microservicio junto con la lógica de cada ruta - `remote`; la conexión del microservicio con los demás microservicios. Esto sirve de interfaz para no hacer una query plana desde el microservicio desde donde se consulta

## Arquitectura API

La arquitectura de la API se basa en:

- `index -> routes -> *route*/controller`
  En donde: - `index`; el archivo de definición inicial de la API - `routes`; en donde se almacenan las rutas de la API - `remote`; en donde se define la lógica de la ruta en particular

Esta arquitectura permite extender con nuevas lógicas dentro de cada ruta de la API almacenándolas y accediéndolas desde la misma carpeta.

## Adicionales

- `common`; almacena distintos recursos compartidos por todos los microservicios, como los valores constates, los tipos o las funciones comunes
- `network`; almacena las funciones comunes entre todos los microservicios orientado hacia la respuesta frente al usuario

# Principales dificultades durante el desarrollo del Challenge

1. Problemas en la compilación de TypeScript a JavaScript y su posterior despliegue en distintos microservicios.
   - Solución: Uso de `pm2`, una solución para la gestión de microservicios
2. Problemas con la conexión entre la imagen de la API con la imagen de Mongo. Particularmente en la autenticación
   - Parche: No usar autenticación
   - Solución ideal: Usar una base de datos de mongo desplegada en otro lugar, como en un servidor propio o en MongoDB Atlas
