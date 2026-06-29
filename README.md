# GraphQL Game Reviews API

A simple GraphQL API for games, reviews, and authors, built with Apollo Server and in-memory data.

## Features

- Query games, reviews, and authors
- Resolve nested relationships between games, reviews, and authors
- Create, update, and delete games, reviews, and authors
- Fast local testing with Node test runner

## Tech Stack

- Node.js (ES Modules)
- Apollo Server
- GraphQL

## Project Files

- index.js: Apollo Server bootstrap and startup
- schema.js: GraphQL schema (types, queries, mutations, inputs)
- resolvers.js: Query, field, and mutation resolver logic
- _db.js: In-memory sample data
- resolvers.test.js: Resolver unit tests
- graphql.operations.test.js: GraphQL operation tests

## Getting Started

### 1. Install dependencies

~~~bash
npm install
~~~

### 2. Start the server

~~~bash
npm start
~~~

Server runs on port 4000. On startup, the terminal prints the local GraphQL endpoint URL.

## Test Commands

### Run all tests

~~~bash
npm test
~~~

### Run tests in watch mode

~~~bash
npm run test:watch
~~~

## Testing Strategy

This project uses two test layers:

1. Resolver unit tests
- Validate resolver logic directly
- Fast and focused behavior checks
- Located in resolvers.test.js

2. GraphQL operation tests
- Execute real GraphQL queries and mutations through Apollo Server
- Validate schema + resolver integration and GraphQL error behavior
- Located in graphql.operations.test.js

## Example Queries and Mutations

### Query all games

~~~graphql
query {
  games {
    id
    title
    platform
  }
}
~~~

### Query one game with nested reviews and authors

~~~graphql
query GetGame($id: ID!) {
  game(id: $id) {
    id
    title
    reviews {
      id
      rating
      content
      author {
        id
        name
      }
    }
  }
}
~~~

Variables:

~~~json
{
  "id": "1"
}
~~~

### Add an author

~~~graphql
mutation AddAuthor($author: AuthorInput!) {
  addAuthor(author: $author) {
    id
    name
    verified
  }
}
~~~

Variables:

~~~json
{
  "author": {
    "name": "New Author",
    "verified": true
  }
}
~~~

### Update a game

~~~graphql
mutation UpdateGame($id: ID!, $game: GameUpdateInput!) {
  updateGame(id: $id, game: $game) {
    id
    title
    platform
  }
}
~~~

Variables:

~~~json
{
  "id": "1",
  "game": {
    "title": "Updated Title",
    "platform": ["PC"]
  }
}
~~~

## Data and Persistence Notes

- Data is stored in memory via _db.js
- Restarting the server resets data to seed values
- This is ideal for learning and local development, not production persistence

## Future Improvements

1. Add persistent storage (SQLite or Postgres)
2. Add input validation and custom error formatting
3. Add third-layer end-to-end HTTP tests against the running endpoint
4. Add CI to run tests on pull requests
