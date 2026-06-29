import test from "node:test";
import assert from "node:assert/strict";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../schema.js";
import { resolvers } from "../resolvers.js";
import db from "../_db.js";

const original = structuredClone(db);

function resetDb() {
  db.games = structuredClone(original.games);
  db.reviews = structuredClone(original.reviews);
  db.authors = structuredClone(original.authors);
}

function getSingleResult(response) {
  assert.equal(response.body.kind, "single");
  return response.body.singleResult;
}

test("GraphQL query returns nested relations", async () => {
  resetDb();
  const server = new ApolloServer({ typeDefs, resolvers });

  const response = await server.executeOperation({
    query: `
      query GameWithReviews($id: ID!) {
        game(id: $id) {
          id
          title
          reviews {
            id
            rating
            author { id name }
          }
        }
      }
    `,
    variables: { id: "1" }
  });

  const result = getSingleResult(response);
  assert.equal(result.errors, undefined);
  assert.equal(result.data.game.id, "1");
  assert.ok(result.data.game.reviews.length > 0);
  assert.equal(result.data.game.reviews[0].author.name, "John Doe");

  await server.stop();
});

test("GraphQL mutation enforces schema required fields", async () => {
  resetDb();
  const server = new ApolloServer({ typeDefs, resolvers });

  const response = await server.executeOperation({
    query: `
      mutation {
        addAuthor(author: { name: "Missing Verified" }) {
          id
          name
          verified
        }
      }
    `
  });

  const result = getSingleResult(response);
  assert.ok(result.errors);
  assert.match(result.errors[0].message, /verified/i);

  await server.stop();
});

test("GraphQL mutation succeeds with valid input", async () => {
  resetDb();
  const server = new ApolloServer({ typeDefs, resolvers });

  const response = await server.executeOperation({
    query: `
      mutation AddAuthor($author: AuthorInput!) {
        addAuthor(author: $author) {
          id
          name
          verified
        }
      }
    `,
    variables: {
      author: { name: "Layer Two Author", verified: true }
    }
  });

  const result = getSingleResult(response);
  assert.equal(result.errors, undefined);
  assert.equal(result.data.addAuthor.name, "Layer Two Author");
  assert.equal(result.data.addAuthor.verified, true);

  await server.stop();
});

test("GraphQL mutation returns resolver error for missing game id", async () => {
  resetDb();
  const server = new ApolloServer({ typeDefs, resolvers });

  const response = await server.executeOperation({
    query: `
      mutation UpdateGame($id: ID!, $game: GameUpdateInput!) {
        updateGame(id: $id, game: $game) {
          id
          title
        }
      }
    `,
    variables: {
      id: "999",
      game: { title: "Nope" }
    }
  });

  const result = getSingleResult(response);
  assert.ok(result.errors);
  assert.match(result.errors[0].message, /not found/i);

  await server.stop();
});