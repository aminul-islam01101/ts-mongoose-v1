noSQL-hamba-hut-server
* documentation: https://documenter.getpost:man.com/view/24247808/2s93si2AGF#711ddde5-3e51-4be4-be66-de83dbf8c08f

* server live link:https://no-sql-hamba-hut.vercel.app/

## Application Routes
# User
* POST: /api/v1/auth/signup
* GET:  /api/v1/users
* GET:  /api/v1/users/:id (Single GET: ) Include an ID that is saved in your database
* PATCH:  /api/v1/users/:id
* DELETE: /api/v1/users/:id Include an ID that is saved in your database
* Cows
* POST: /api/v1/cows
* GET:  /api/v1/cows
* GET:  /api/v1/cows/:id (Single GET: ) Include an ID that is saved in your database
* PATCH:  /api/v1/cows/:id
* DELETE: /api/v1/cows/:id Include an ID that is saved in your database
* Pagination and Filtering routes for Cows
* GET:  /api/v1/cows?pag=1&limit=10
* GET:  /api/v1/cows?sortBy=price&sortOrder=asc
* GET:  /api/v1/cows?minPrice=20000&maxPrice=70000
* GET:  /api/v1/cows?location=Chattogram
* GET:  /api/v1/cows?searchTerm=Cha
* Orders
* POST: /api/v1/orders
* GET:  /api/v1/orders