# NodeJs-CompleteRestaurantAPI

### Tecnologías
NodeJs v15.0.1

### Catarteristicas 
- MongoDB (express, mongoose )
- JWT authentication
- Oauth2 (facebook con passport strategy)
- Https 
- Roles
- Subida de imagenes

### Clonar el Proyecto 
- https://github.com/RicardoBastardoGH/NodeJs-CompleteRestaurantAPI.git

## Ejecucion de MongoDb

`mongod` para iniciar el servidor de mongodb

## Ejecucion de servidor de Node

`npm start` en la carpeta

### Rutas de la API

User
- GET http://localhost:3000/users/login
- POST http://localhost:3000/users/signup
- GET http://localhost:3000/users
- GET https://localhost:3443/users/facebook/token

Dishes
- GET http://localhost:3000/dishes
- POST http://localhost:3000/dishes
- DELETE http://localhost:3000/dishes

- GET http://localhost:3000/dishes/:dishId
- PUT http://localhost:3000/dishes/:dishId
- DELETE http://localhost:3000/dishes/:dishId

Dish/Comments
- GET http://localhost:3000/promotions
- POST http://localhost:3000/promotions
- DELETE http://localhost:3000/promotions

- GET http://localhost:3000/promotions/:promotionsId
- PUT http://localhost:3000/promotions/:promotionsId
- DELETE http://localhost:3000/promotions/:promotionsId

Leaders
- GET http://localhost:3000/leaders
- POST http://localhost:3000/leaders
- DELETE http://localhost:3000/leaders

- GET http://localhost:3000/leaders/:leaderId
- PUT http://localhost:3000/leaders/:leaderId
- DELETE http://localhost:3000/leaders/:leaderId

Promotions
- GET http://localhost:3000/promotions
- POST http://localhost:3000/promotions
- DELETE http://localhost:3000/promotions

- GET http://localhost:3000/promotions/:promotionsId
- PUT http://localhost:3000/promotions/:promotionsId
- DELETE http://localhost:3000/promotions/:promotionsId

Favorites
- GET http://localhost:3000/favorites
- POST http://localhost:3000/favorites
- DELETE http://localhost:3000/favorites

- GET http://localhost:3000/favorites/:dishId
- PUT http://localhost:3000/favorites/:dishId
- DELETE http://localhost:3000/favorites/:dishId

Image Updload
- https://localhost:3443/imageUpload


## Postman Collection

- file NodeJs-Restaurant.postman_collection.json


