# Simple JWT API

This is a simple API boilerplate that uses [JWT](https://jwt.io/) for bearer token authentication. It is written in [NodeJS](https://nodejs.org/)/[Typescript](https://www.typescriptlang.org/) and uses [MySQL](https://www.mysql.com/) for data storage by default.

The choice of the data storage system can easily be swapped with another SQL/NoSQL database as per project requirements.

The repository can be forked/cloned and used as a bootstrap for API development as all required authentication endpoints and logic have already been implemented.

If you appreciate the project, remember to leave a star! Thank you.

Contributions are always welcomed!

Developed and maintained by [Mohammed Adekunle](https://mohammedadekunle.com.ng).

## Requirements

- The NodeJS runtime.
- NPM, Yarn or any similar NodeJS package manager.
- MySQL or any other supported SQL/NoSQL database(Remember to install the required db driver and configure [TypeORM](https://typeorm.io/)).

## Features

- [Express](https://expressjs.com/) as the base requests router.
- [TypeORM](https://typeorm.io/) for ORM/query builder and migrations.
- Written completely in [Typescript](https://www.typescriptlang.org/).
- [JWT](https://jwt.io/) authentication endpoints out of the box for SPAs and mobile apps.
- [Mocha](https://mochajs.org/) for testing.
- [EJS](https://ejs.co/) for view templating.
- A well defined directory structure.

# How To Install

- Download and place the repository's files in your web server's root directory.
- Run `npm install` or `yarn install` to install the app dependencies.
- Copy the `.env.example` file to `.env`.
- Update your `.env` file according to your web server's environment.
- Run `npm run typeorm migration:run` to run all migrations.
- Run `npm run dev` to fire up the web server.
- Build something awesome!

# Licensing

This project is licensed under the [MIT](LICENSE) license.
