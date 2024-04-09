# NOC - Monitoring Tool

- [NOC - Monitoring Tool](#noc---monitoring-tool)
  - [Installation](#installation)
  - [Architecture](#architecture)
  - [Resources](#resources)
    - [Course](#course)
    - [Gists](#gists)


## Installation
Create a [.env](.env) file using the contents of [.env.template](.env.template) as a template.

Install all the node modules:

```bash
npm install
```

Run in development:
```bash
npm run dev
```

## Architecture

- [config](./src/config/): Globally accessible objects and configurations such as loggers, etc.
- [domain](./src/domain/): The application business rules, at a high level. 
  - [datasources](./src/domain/datasources/): Contains the definition of the interface for accessing a resource.
  - [repository](./src/domain/repository/): Repository creating the interface for applying the Adapter pattern.
  - [entities](./src/domain/entities/): Contains entities to be stored at the database or handled in the application.
  - [use-cases](./src/domain/use-cases/): Contains use-cases with the whole system operations.
- [infrastructure](./src/infrastructure/): Code in which we implement the interfaces. Eg: accessing to a database.
- [presentation](./src/presentation/): Everything that is near the users.

## Resources

### Course

- [NodeJS: De cero a experto](https://www.udemy.com/course/nodejs-de-cero-a-experto)

### Gists

- [Project setup](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b)