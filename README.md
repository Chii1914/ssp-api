## THIS PROJECT IS ENTIRELLY BASED ON NESTJS

## Description

Rest API make for handle request's from a webpage
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Environment variables

```bash
MAIL_HOST
->STMP HOST
MAIL_USER
->STMP MAIL
MAIL_PASS
->MAIL PASS FOR STMP
MAIL_PORT
->Default 465 and 578. 465 SSL & 578 TLS 
TYPE_BD
->Unused
DB_HOST
->Database server ip
DB_PORT
->Port of the database
DB_USERNAME
->Username for the database
DB_PASSWORD
->Password for the database
DB_NAME
->Use 'practica'
TYPEORM_SYNC
->Always false, do not change in production stages 
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
