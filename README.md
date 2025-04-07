# Starter template for Telegram bots

## How to use

Simply download this template, install the dependencies and start modification.

## Prerequisites

- Node.js version 21 or above
- PostgreSQL version 7 and above

## Code structure

### Database layer

TypeORM is used as an ORM and is responsible for managing data stored in the DB.

Common activities are:

- Creating an entity: Entities are stored in the `src/entities` directory
- Creating a migration: After changing the entities, you should create a new migration to perform
  actions needed for creating the database structure. Run `npm run typeorm migration:generate -- -d src/config/data-source.ts src/migrations/<migration name>` to create one. Make sure you have run the previous migrations using `npm run typeorm migration:run -- -d src/config/data-source.ts`.

### Services

Services are responsible for performing logical operations and can be found at `src/services`.

### Handlers

The bot is seen as a state machine and each user has a state. Whenever an update arrives 
(message or callback query) the current state of the user is determined and the handler of that state is called. The handler will return the next state for the user and performs operations like modifying the database, sending a message to the user, etc.
