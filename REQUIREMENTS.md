# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index Route : 'products/' [GET]
- Show Route :  'products/:id' [GET]
- Create Route : 'products/' [POST]  [token required]
- [OPTIONAL] Top 5 most popular products - Five Most Popular Products Route : 'five-most-popular/' [GET]
- [OPTIONAL] Products by category (args: product category) - Products By Category Route : 'products-by-category/:category' [GET]

#### Users
- Index Route : 'users/' [GET] [token required]
- Show Route : 'users/:id' [GET] [token required]
- Create Route : 'users' [POST] 
- Update Route : 'updateusers/:id' [PUT] [token required] 
- Destroy Route : 'delusers/:id' [DELETE] [token required]
- Authenticate Route : 'users/authenticate' [POST] 

#### Orders
- Index Route : 'orders/' [GET] [token required]
- Show Route : 'orders/:id' [GET] [token required]
- Create Route : 'orders' [POST] [token required]
- Update Route : 'updateorders/:id' [PUT] [token required] 
- Destroy Route : 'delorders/:id' [DELETE] [token required]
- Add Product Route : 'orders/:id/products' [POST]
- Current Order by user (args: user id)[token required] - Order By User Route : 'order-by-user/:user_id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] - Completed Ordered By User Route : 'complete-order-by-user/:user_id' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

