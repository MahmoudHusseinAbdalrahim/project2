# Storefront Backend Project

## Getting Started

The goal of project is to build Online store and My job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.Application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

The starter code contains a basic Node and Express app to get started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Instructions 

- Should connect to postgres using psql postgres
- Create database full_stack_dev using CREATE DATABASE full_stack_dev;
- Connect to full_stack_dev database using \c full_stack_dev
- GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
- Create database full_stack_test using CREATE DATABASE full_stack_user;
- Connect to full_stack_test database using \c full_stack_test
- GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;
- After install db-migrate and db-migrate-pg using db-migrate up to create tables in migrations files
- Tables: 
    -  TABLE: users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, password VARCHAR(100))
    -  TABLE: products (id SERIAL PRIMARY KEY, name VARCHAR, price float, category VARCHAR(100))
    -  TABLE: orders (id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), status VARCHAR(10))
    -  TABLE order_products (
        id SERIAL PRIMARY KEY,
        quantity integer,
        order_id bigint REFERENCES orders(id),
        product_id bigint REFERENCES products(id)
    )

- Using db-migrate down to remove change
- Should specify what database to run migrations on dev for development phase and test for testing phase So,
we create database.json file
- postgres database running on default port of postgres (port : 5432)
- we can make database connection by creating new Pool t connect to database
- Server starting app on port: 3000
- models translate their database tables into useful entities in the Node application
- models (order, product, user) where each instance of this class will become a new row in table
- handlers functions to make routes that use in our API
- Write a test suite for tests model files (order_spec, product_spec, user_spec) that contain testing suites by jasmine testing we can run jasmine init to get test structure 
- Write a test suite for endpoints that required in requirement file
- Create JWT tokens in API using authentication methods. and use it as a middleware
- Secure database access info with environment variables
- .env file have the following:
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=full_stack_dev
    POSTGRES_TEST_DB=full_stack_test
    POSTGRES_USER=full_stack_user
    POSTGRES_PASSWORD=password123
    ENV=dev
    BCRYPT_PASSWORD=secret-pass
    SALT_ROUNDS=10
    TOKEN_SECRET=mahmoud123


### Required Technologies
Your application must make use of the following libraries:
- Postgres for the database by using npm i pg and npm i --save-dev @types/pg
- Node/Express for the application logic using npm i express and npm i --save-dev @types/express
- dotenv from npm for managing environment variables using npm i dotenv and npm i @types/dotenv
- db-migrate from npm for migrations using npm install -g db-migrate and npm i db-migrate db-migrate-pg
- Using bcrypt from npm to hash password and don't make it as plain text so we use npm i bycrpt and npm i --save-dev @types/bycrpt
- jsonwebtoken from npm for working with JWTs using npm i jsonwebtoken
- jasmine from npm for testing using npm i --save-dev jasmine jasmine-ts jasmine-spec-reporter @types/jasmine
- tsc-watch commonly used for start server and restart serve when file changing using npm i --save-dev tsc-watch