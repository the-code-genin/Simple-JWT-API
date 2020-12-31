# Simple JWT API

This is a simple API boilerplate that uses [JWT](https://jwt.io/) for bearer token authentication. It is written in [NodeJS](https://nodejs.org/) and uses [MySQL](https://www.mysql.com/) for data storage.

The choice of the data storage system can easily be swapped with another SQL database as per project requirements.

The repository can be forked/cloned and used as a bootstrap for API development as all required authentication endpoints and logic have already been implemented.

If you appreciate the project, remember to leave a star! Thank you.

Contributions are always welcomed!

Developed and maintained by [Mohammed Adekunle](https://github.com/Iyiola-am).

## Requirements

- The NodeJS runtime.
- NPM, Yarn or any similar NodeJS package manager.
- MySQL or any other SQL database system(Remember to update the client and install the applicable db driver for knex).

## Features

- Express as the base requests router.
- Bookshelf/knex for ORM/query builder.
- A database migration system.
- A well defined directory structure.
- JWT authentication endpoints out of the box for SPAs and mobile apps.

# How To Install

- Download and place the repository's files in your web server's root directory.
- Run `npm install` or `yarn install` to install the app dependencies.
- Copy the `.env.example` file to `.env`.
- Update your `.env` file according to your web server's environment.
- Run `node node_modules/knex/bin/cli.js migrate:up` to run all db migrations.
- Run `node index.js` to fire up the web server.
- Build something awesome!

# Endpoints

A documentation of the endpoints provided by the API can be found [here](https://documenter.getpostman.com/view/9577513/T1LTejEP?version=latest).
