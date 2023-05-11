
<p align="center">
  <img src="https://i.pinimg.com/564x/b9/04/e6/b904e60f9c02d8afeb4b768164826c59.jpg" width="500" alt="Company Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  _<p align="center">
This is the backend of an __SomeCompany platform__, a scalable, flexible, and easy-to-maintain platform __for buying and selling cars, built with Nest.js.__ The backend includes authentication, authorization, and role-based access control, as well as support for basic and premium user accounts. Additionally, the platform allows registered sellers to create car listings, with a dropdown menu for selecting the car brand and model. Users can create listings with prices in USD, EUR, or UAH, with prices updated daily based on the exchange rate from PrivatBank. Listings are automatically checked for profanity, and premium users can access additional information about their listings, such as view counts and regional average prices.</p>
    <p align="center">_

## Technologies Used
- Nest.js. It uses JavaScript, is built with TypeScript
- MySQL

To get started with the backend, you will need to have Node.js and npm installed on your machine.

## Installation

1. Clone the repository.
2. Install the necessary dependencies using the command `npm install`.
3. Create a MySQL database and update the `.env` file with the correct database credentials.
4. Run the command `npm run start` to start the server.
5. Navigate to `http://localhost:3000` in your browser to view the application.

## Authentication
The backend supports authentication using JWT (JSON Web Tokens). When a user logs in or signs up, a JWT is generated and sent to the client. The client can then include the JWT in the __Authorization__ header of subsequent requests to authenticate the user.

## Authorization and Role-based Access Control
The backend includes role-based access control, with four roles: __buyer__, __seller__, __manager__, and __admin__. The roles are defined in the __role__ table in the database. A user can have multiple roles.

The backend also includes middleware for checking the user's role and permissions on each request. For example, only __seller__ and __admin__ users can create new listings.

## Premium Accounts
The backend supports two types of user accounts: basic and premium. Premium accounts can be purchased by users for a fee, and provide access to additional features, such as statistics on their listings.

## Features

* Users can create and manage their accounts.
* Users can browse and search for cars for sale.
* Users can contact sellers to inquire about cars.
* Sellers can create listings for cars they want to sell.
* Sellers can manage their listings and respond to inquiries from buyers.

## AWS Integration
The backend is integrated with AWS for cloud storage and other services. You can configure the AWS connection by setting the appropriate environment variables. The backend currently uses S3 for storing images of the listings.

## Contributing
If you would like to contribute to the project, feel free to submit a pull request. Please follow the existing code style and do not break it :) 

## Future Improvements

* Implement a payment system to allow users to purchase cars online.
* Implement a messaging system to allow buyers and sellers to communicate directly through the platform.
* Improve the search functionality to make it more robust and user-friendly.

## Stay in touch

- Author - [Anna Kochkina](https://github.com/KochkinAnna)
- Mail me - kochkinaanichka@gmail.com
- Call me - +380500554417