noSQL-hamba-hut-server
* documentation: https://documenter.getpost:man.com/view/24247808/2s93si2AGF#711ddde5-3e51-4be4-be66-de83dbf8c08f

* server live link:https://no-sql-hamba-hut.vercel.app

# Application Routes
## User
* POST: /api/v1/users/auth/signup
* GET:  /api/v1/users
* GET:  /api/v1/users/648ec9c4b93735f8d70e8089
* PATCH:  /api/v1/users/648ec9c4b93735f8d70e8089
* DELETE: /api/v1/users/648ec9c4b93735f8d70e8089
## Cows
* POST: /api/v1/cows
* GET:  /api/v1/cows
* GET:  /api/v1/cows/648ee53c798fbee7ce102a95
* PATCH:  /api/v1/cows/648ee53c798fbee7ce102a95
* DELETE: /api/v1/cows/648ee53c798fbee7ce102a95
### Pagination and Filtering routes for Cows
* GET:  /api/v1/cows?page=1&limit=10
* GET:  /api/v1/cows?sortBy=price&sortOrder=1
* GET:  /api/v1/cows?minPrice=20000&maxPrice=70000
* GET:  /api/v1/cows?location=Comilla
* GET:  /api/v1/cows?searchTerm=raj
* GET:  /api/v1/cows?limit=5&location=Comilla&sortBy=price&sortOrder=1&minPrice=80000
## Orders
* POST: /api/v1/orders
* GET:  /api/v1/orders