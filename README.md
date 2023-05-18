
<p align="center">
  <img src="https://i.pinimg.com/564x/b9/04/e6/b904e60f9c02d8afeb4b768164826c59.jpg" width="500" alt="Company Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  _<p align="center">
This is the backend of an __SomeCompany platform__, a scalable, flexible, and easy-to-maintain platform __for buying and selling cars, built with Nest.js.__ The backend includes authentication, authorization, and role-based access control, as well as support for basic and premium user accounts. Additionally, the platform allows registered sellers to create car listings, with a dropdown menu for selecting the car brand and model. Users can create listings with prices in USD, EUR, or UAH, with prices updated daily based on the exchange rate from PrivatBank. Listings are automatically checked for profanity, and premium users can access additional information about their listings, such as view counts and regional average prices.</p>
    <p align="center">_

----
## Technologies Used
To get started with the backend, you will need to have Node.js and npm installed on your machine.

- Nest.js. It uses JavaScript, is built with TypeScript
- MySQL. An open-source ORM is Prisma.

----
## Installation
1. Clone the repository.
2. Install the necessary dependencies using the command `npm install`.
3. We are utilizing the Prisma CLI. As a best practice, it's recommended to invoke the CLI locally by prefixing it with npx:
     `npx prisma`. Now create your initial Prisma setup using the init command of the Prisma CLI:
     `npx prisma init`.
   Create a MySQL database and update the `.env` file with the correct database credentials.
4. Run the command `npm run start` to start the server.
5. Navigate to `http://localhost:3000` in your browser to view the application.

----
## Migration database
The project has a migration.sql file, which means that the database has already been generated, and you need to run SQL queries from this file to create a database schema.
To run the migration, you can use any convenient way to execute SQL queries, such as the command line or a database program such as MySQL Workbench or pgAdmin.

If you are working with PostgreSQL, you can use the command line and the psql command to execute SQL queries from the migration file. For example:

Copy code
`psql -U username -d database_name -f migration.sql`
where username is the database user, database_name is the database name, and migration.sql is the path to the migration file.

If you are working with MySQL, you can use the mysql command to execute SQL queries from the migration file. For example:

Copy code
`mysql -u username -p database_name < migration.sql`
where username is the database user, database_name is the database name, and migration.sql is the path to the migration file.

After executing SQL queries from the migration file, the database will be updated to the appropriate version, and you can start interacting with it through your application.

_You can use migration in other way:_
1. Click the Database tab in the right pane of IntelliJ IDEA.

2. Click the "+" icon and select Data Source > MySQL.

3. Log in to your database using your login credentials and click "Test Connection" to make sure it works.

4. Once you have successfully connected to your database, choose File > Import from the main menu.

5. Select the migration.sql file that contains the SQL queries to create the tables and data in the database and click OK.

6. Wait until the migration is complete and make sure that all queries are executed successfully.

This is the easiest way to start a database migration from the migration.sql file to IntelliJ IDEA for MySQL.


----

## Authentication
The backend supports authentication using JWT (JSON Web Tokens). When a user logs in or signs up, a JWT is generated and sent to the client. The client can then include the JWT in the __Authorization__ header of subsequent requests to authenticate the user.

----
## Authorization and Role-based Access Control
The backend includes role-based access control, with four main roles: __buyer__, __seller__, __manager__, and __admin__. The roles are defined in the __role__ table in the database. A user can have multiple roles.

The backend also includes middleware for checking the user's role and permissions on each request. For example, only __seller__ and __admin__ users can create new listings.
<p>There are also roles for car dealerships.</p>

----
## Premium Accounts
The backend supports two types of user accounts: basic and premium. Premium accounts can be purchased by users for a fee, and provide access to additional features, such as statistics on their listings.

----
## Features in roles
* __Admin:__ a superuser who can do everything. Only the customer and its partners will have this role.
* __Buyer:__ "walks" on the platform, can contact an individual seller or car dealership.
* __Cardealership:__ is responsible for creating, editing, and deleting car dealerships on the platform. In addition, you can also display a list of all available car dealerships and details of each of them.
* __Cardealership-admin:__ managing the administrative tasks within the dealership, such as customer service, finance, and inventory management.
* __Cardealership-manager:__ managing the sales team and ensuring sales targets are met. They are also responsible for building relationships with customers and ensuring customer satisfaction. 
  <p>Contains methods for creating, editing, and deleting a manager profile, viewing a list of managers and their profiles, and granting and revoking access to features that are available only to managers.</p>
* __Cardealership-mechanic:__ diagnosing and repairing customer vehicles.
  <p>Contains methods for creating, editing, and deleting a mechanic profile, viewing a list of mechanics and their profiles, and granting and denying access to functions that are available only to mechanics.</p>
* __Cardealership-sales:__ selling vehicles to customers, providing information about the vehicles and ensuring the customer is satisfied with their purchase.
  <p>Contains methods for creating, editing, and deleting a salesperson profile, viewing the list of salespeople and their profiles, and granting and removing access to features that are available only to salespeople.</p>
* __Cardealership-service-manager:__ managing the service department and ensuring that all customer repairs are completed in a timely and satisfactory manner and inventory management.
  <p>Contains methods for creating, editing, and deleting a service-manager profile, viewing a list of service-managers and their profiles, and granting and denying access to functions that are available only to service-managers.</p>
* __Manager:__ manages the platform, bans people, removes invalid ads, checks suspicious ads, etc. Only the Administrator can create such a user. 
* __Seller:__ a registered seller can put up his own car for sale, but only one car can be put up for sale.
  <p>When choosing a car brand, you should see a drop-down list with all brands. If a particular brand is not in the list, the seller can notify the administration that this brand is missing. The client can create a price tag in the following currencies: USD, EUR, UAH. The price is indicated in only one of the currencies. The rest of the currencies are calculated at the rate of a private bank. Prices are updated once a day. It is mandatory to indicate at what rate we made the calculation and what price the user indicated when posting the ad.</p>
  <p>Each ad is automatically checked for foul language.
  If the platform does not find any suspicious vocabulary, the ad is switched to active status and is added to the platform. If the platform finds inappropriate words, the system offers to edit the ad.</p>
  <p>The seller can edit the ad only 3 times. If the ad does not go through 3 times, it goes into the inactive status. In this case, an email will be sent to the manager for verification.</p>
* __Seller-premium:__ The same as the seller, but the number of cars for sale is not limited. The platform also provides him with the following data:
  - number of views of the ad
  - number of views per day, week, month
  - The average price of a car in the region where it is sold.
  For example, if a car is sold in Kyiv, the average price of a car in Kyiv will be displayed.
  If in Lviv region, the average price will be in Lviv region
  - Average price of a car in the whole of Ukraine

----
## AWS Integration
The backend is integrated with AWS for cloud storage and other services. You can configure the AWS connection by setting the appropriate environment variables. The backend currently uses S3 for storing images of the listings.

----
## Contributing
If you would like to contribute to the project, feel free to submit a pull request. Please follow the existing code style and enjoy :) 

----
## Postman help
To make a request in Postman, you can follow these steps:

1. Open Postman and select the appropriate query method.
2. Enter the URL, replacing :the appropriate parameter with the actual value.
3. Customize any necessary headers or parameters for the request.
4. Click the Send button (or press the Enter hotkey) to send the request.<p> Remember that you must have the server running on localhost:3000 to successfully connect and receive a response.</p>

Here are the methods and URLs for the project respectively ({{api}} - http://localhost:3000):

- Admin:

| method |                              URL                               |                                      description |
|--------|:--------------------------------------------------------------:|-------------------------------------------------:|
| POST   |                         {{api}}/admin                          |                               Create a new admin |
| PATCH  |                     {{api}}/admin/:idAdmin                     |                               Update a new admin |
| GET    |                     {{api}}/admin/:idAdmin                     |                               Get an admin by ID |
| GET    |                    {{api}}/admin/:firstName                    |                       Get an admin by first name |
| GET    |                         {{api}}/admin                          |                             Get a list of admins |
| DELETE |                     {{api}}/admin/:idAdmin                     |                                  Delete an admin |
| POST   |                      {{api}}/admin/buyer                       |                      Create a new buyer by Admin |
| PATCH  |                  {{api}}/admin/buyer/:idBuyer                  |                          Update a buyer by Admin |
| GET    |                    {{api}}/admin/buyer/list                    |                    Get a list of buyers by Admin |
| GET    |                  {{api}}/admin/buyer/:idBuyer                  |                       Get a buyer by ID by Admin |
| GET    |              {{api}}/admin/buyer/name/:firstName               |               Get a buyer by first name by Admin |
| DELETE |                 {{api}}/admin /buyer/:idBuyer                  |                          Delete a buyer by Admin |
| POST   |                     {{api}}/admin/manager                      |                    Create a new manager by Admin |
| PATCH  |                {{api}}/admin/manager/:idManager                |                        Update a manager by Admin |
| GET    |                  {{api}}/admin/managers/list                   |                  Get a list of managers by Admin |
| GET    |                {{api}}/admin/manager/:idManager                |                     Get a manager by ID by Admin |
| GET    |             {{api}}/admin/manager/name/:firstName              |             Get a manager by first name by Admin |
| DELETE |                {{api}}/admin/manager/:idManager                |                        Delete a manager by Admin |
| POST   |                      {{api}}/admin/seller                      |                     Create a new seller by Admin |
| PATCH  |                 {{api}}/admin/seller/:idSeller                 |                         Update a seller by Admin |
| GET    |                   {{api}}/admin/sellers/list                   |                  Get a list of sellers  by Admin |
| GET    |                 {{api}}/admin/seller/:idSeller                 |                      Get a seller by ID by Admin |
| GET    |              {{api}}/admin/seller/name/:firstName              |              Get a seller by first name by Admin |
| DELETE |                 {{api}}/admin/seller/:idSeller                 |                         Delete a seller by Admin |
| POST   |             {{api}}/admin/sellerPremium/:sellerId              |               Upgrade seller to premium by Admin |
| POST   |          {{api}}/admin/sellerPremium/:sellerId/cancel          |      Cancel seller premium subscription by Admin |
| GET    |          {{api}}/admin/sellerPremium/:sellerId/views           | Get views count per period for a seller by Admin |
| GET    |      {{api}}/admin/sellerPremium/:sellerId/views/:period       |                      Get a seller by ID by Admin |
| GET    |   {{api}}/admin/sellerPremium/:sellerId/averagePrice/region    |      Get average price in seller region by Admin |
| GET    |   {{api}}/admin/sellerPremium/:sellerId/averagePrice/ukraine   |            Get average price in Ukraine by Admin |
| POST   |                {{api}}/admin/new/:idSeller/car                 |                        Create a new car by Admin |
| PATCH  |        {{api}}/admin/update/seller/:idSeller/car/:idCar        |                            Update a car by Admin |
| GET    |                     {{api}}/admin/cars/all                     |                            Get all cars by Admin |
| GET    |               {{api}}/admin/seller/:idSeller/car               |                     Get all seller cars by Admin |
| GET    |           {{api}}/admin/seller/:idSeller/car/:idCar            |                               Get a car by Admin |
| DELETE |            {{api}}/admin/seller/:idSeller/car/:idCa            |                            Delete a car by Admin |

- Auth:

| method |          URL          |   description |
|--------|:---------------------:|--------------:|
| POST   |  {{api}}/auth/login   |    Login user |
| POST   | {{api}}/auth/register | Register user |

- Buyer:

| method |           URL            |               description |
|--------|:------------------------:|--------------------------:|
| POST   |      {{api}}/buyer       |        Create a new buyer |
| PATCH  |  {{api}}/buyer/:idBuyer  |            Update a buyer |
| GET    |  {{api}}/buyer/:idBuyer  |         Get a buyer by ID |
| GET    | {{api}}/buyer/:firstName | Get a buyer by first name |
| GET    |      {{api}}/buyer       |      Get a list of buyers |
| DELETE | {{api}}/buyer/:idBuyer   |            Delete a buyer |

- Manager:

| method |            URL             |                 description |
|--------|:--------------------------:|----------------------------:|
| POST   |      {{api}}/manager       |        Create a new manager |
| PATCH  | {{api}}/manager/:idManager |            Update a manager |
| GET    | {{api}}/manager/:idManager |         Get a manager by ID |
| GET    | {{api}}/manager/:firstName | Get a manager by first name |
| GET    |      {{api}}/manager       |      Get a list of managers |
| DELETE | {{api}}/manager/:idManager |            Delete a manager |

- Seller:

| method |                 URL                 |                description |
|--------|:-----------------------------------:|---------------------------:|
| POST   |           {{api}}/seller            |        Create a new seller |
| PATCH  |      {{api}}/seller/:idSeller       |            Update a seller |
| GET    |      {{api}}/seller/:idSeller       |         Get a seller by ID |
| GET    |      {{api}}/seller/:firstName      | Get a seller by first name |
| GET    |        {{api}}/sellerPremium        |      Get a list of sallers |
| DELETE |      {{api}}/seller/:idSeller       |            Delete a seller |
| POST   |    {{api}}/seller/:idSeller/car     | Create a new car by seller |
| PATCH  | {{api}}/seller/:idSeller/car/:idCar |     Update a car by seller |
| GET    |    {{api}}/seller/:idSeller/car     |      Get all car by seller |
| GET    | {{api}}/seller/:idSeller/car/:idCar |        Get a car by seller |
| DELETE |      {{api}}/seller/:idSeller/car   |     Delete a car by seller |

- Seller Premium:

| method |                          URL                          |                             description |
|--------|:-----------------------------------------------------:|----------------------------------------:|
| POST   |            {{api}}/sellerPremium/:sellerId            |               Upgrade seller to premium |
| POST   |        {{api}}/sellerPremium/:sellerId/cancel         |      Cancel seller premium subscription |
| POST   |      {{api}}/sellerPremium/another/:idSeller/car      |      Create a new car by seller premium |
| GET    |         {{api}}/sellerPremium/:sellerId/views         |            Get views count for a seller |
| GET    |     {{api}}/sellerPremium/:sellerId/views/:period     | Get views count per period for a seller |
| GET    | {{api}}/sellerPremium/:sellerId/averagePrice/region   |      Get average price in seller region |
| GET    | {{api}}/sellerPremium/:sellerId/averagePrice/ukraine  |            Get average price in Ukraine |

When the car dealership code will be implemented, you can add information here.

----
## Future Improvements
* Develop access to the platform not only for individual sellers, but also for __car dealerships__ with their __managers__, __administrators__, __salespeople__, __service-managers__, __mechanics__ (through a system of permissions)
* Implement a payment system to allow users to purchase cars online.
* Implement a messaging system to allow buyers and sellers to communicate directly through the platform.
* Improve the search functionality to make it more robust and user-friendly.

----
## Stay in touch
- Author - [Anna Kochkina](https://github.com/KochkinAnna)
- Mail me - kochkinaanichka@gmail.com
- Call me - +380500554417

----