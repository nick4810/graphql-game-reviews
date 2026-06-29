import test from "node:test";
import assert from "node:assert/strict";
import { resolvers } from "../resolvers.js";
import db from "../_db.js";

const original = structuredClone(db);

function resetDb() {
  db.games = structuredClone(original.games);
  db.reviews = structuredClone(original.reviews);
  db.authors = structuredClone(original.authors);
}

test("Query.games returns all games", () => {
  resetDb();
  const result = resolvers.Query.games();
  assert.equal(result.length, 3);
  assert.equal(result[0].title, "The Legend of Zelda: Breath of the Wild");
});

test("Query.game returns game by id", () => {
  resetDb();
  const result = resolvers.Query.game(null, { id: "2" });
  assert.equal(result.title, "God of War");
});

test("Mutation.addGame appends a new game", () => {
  resetDb();
  const before = db.games.length;

  const created = resolvers.Mutation.addGame(null, {
    game: { title: "Halo 3", platform: ["Xbox 360"] }
  });

  assert.equal(db.games.length, before + 1);
  assert.equal(created.id, String(before + 1));
  assert.equal(created.title, "Halo 3");
});

test("Mutation.updateGame throws when game does not exist", () => {
  resetDb();
  assert.throws(
    () => resolvers.Mutation.updateGame(null, { id: "999", game: { title: "X" } }),
    /not found/
  );
});

test("Game.reviews returns reviews for the parent game", () => {
  resetDb();
  const parent = { id: "1" };
  const result = resolvers.Game.reviews(parent);
  assert.ok(result.length > 0);
  assert.ok(result.every((r) => r.gameId === "1"));
});

test("Mutation updateGame updates the game with new data", () => {
  resetDb();
  const updatedGame = resolvers.Mutation.updateGame(null, {
    id: "1",
    game: { title: "Updated Title", platform: ["PC"] }
  });

  assert.equal(updatedGame.title, "Updated Title");
  assert.deepEqual(updatedGame.platform, ["PC"]);
  const gameInDb = db.games.find((g) => g.id === "1");
  assert.equal(gameInDb.title, "Updated Title");
  assert.deepEqual(gameInDb.platform, ["PC"]);
});

test("Mutation.deleteGame removes the game and returns remaining games", () => {
  resetDb();
  const before = db.games.length;

  const remainingGames = resolvers.Mutation.deleteGame(null, { id: "1" });

  assert.equal(db.games.length, before - 1);
  assert.ok(!db.games.find((g) => g.id === "1"));
  assert.equal(remainingGames.length, before - 1);
});

test("Query.reviews returns all reviews", () => {
  resetDb();
  const result = resolvers.Query.reviews();
  assert.equal(result.length, 3);
  assert.equal(result[0].content, "An amazing open-world experience with stunning visuals and gameplay.");
});

test("Query.review returns review by id", () => {
  resetDb();
  const result = resolvers.Query.review(null, { id: "2" });
  assert.equal(result.content, "A thrilling adventure with a compelling story and characters.");
});

test("Review.author returns the author of the review", () => {
  resetDb();
  const parent = { authorId: "2" };
  const result = resolvers.Review.author(parent);
  assert.equal(result.id, "2");
  assert.equal(result.name, "Jane Smith");
});

test("Review.game returns the game of the review", () => {
  resetDb();
  const parent = { gameId: "3" };
  const result = resolvers.Review.game(parent);
  assert.equal(result.id, "3");
  assert.equal(result.title, "Red Dead Redemption 2");
});

test("Mutation.addReview appends a new review", () => {
  resetDb();
  const before = db.reviews.length;

  const created = resolvers.Mutation.addReview(null, {
    review: { rating: 4, content: "Great game!", authorId: "1", gameId: "2" }
  });

  assert.equal(db.reviews.length, before + 1);
  assert.equal(created.id, String(before + 1));
  assert.equal(created.content, "Great game!");
});

test("Mutation.updateReview throws when review does not exist", () => {
  resetDb();
  assert.throws(
    () => resolvers.Mutation.updateReview(null, { id: "999", review: { content: "X" } }),
    /not found/
  );
});

test("Mutation.updateReview updates the review with new data", () => {
  resetDb();
  const updatedReview = resolvers.Mutation.updateReview(null, {
    id: "1",
    review: { rating: 3, content: "Updated content" }
  });

  assert.equal(updatedReview.rating, 3);
  assert.equal(updatedReview.content, "Updated content");
  const reviewInDb = db.reviews.find((r) => r.id === "1");
  assert.equal(reviewInDb.rating, 3);
  assert.equal(reviewInDb.content, "Updated content");
});

test("Mutation.deleteReview removes the review and returns remaining reviews", () => {
  resetDb();
  const before = db.reviews.length;

  const remainingReviews = resolvers.Mutation.deleteReview(null, { id: "1" });

  assert.equal(db.reviews.length, before - 1);
  assert.ok(!db.reviews.find((r) => r.id === "1"));
  assert.equal(remainingReviews.length, before - 1);
});

test("Query.authors returns all authors", () => {
  resetDb();
  const result = resolvers.Query.authors();
  assert.equal(result.length, 3);
  assert.equal(result[0].name, "John Doe");
});

test("Query.author returns author by id", () => {
  resetDb();
  const result = resolvers.Query.author(null, { id: "3" });
  assert.equal(result.name, "Bob Johnson");
});

test("Author.reviews returns reviews for the parent author", () => {
  resetDb();
  const parent = { id: "1" };
  const result = resolvers.Author.reviews(parent);
  assert.ok(result.length > 0);
  assert.ok(result.every((r) => r.authorId === "1"));
});

test("Mutation.addAuthor appends a new author", () => {
  resetDb();
  const before = db.authors.length;

  const created = resolvers.Mutation.addAuthor(null, {
    author: { name: "New Author" }
  });

  assert.equal(db.authors.length, before + 1);
  assert.equal(created.id, String(before + 1));
  assert.equal(created.name, "New Author");
});

test("Mutation.updateAuthor throws when author does not exist", () => {
  resetDb();
  assert.throws(
    () => resolvers.Mutation.updateAuthor(null, { id: "999", author: { name: "X" } }),
    /not found/
  );
});

test("Mutation.updateAuthor updates the author with new data", () => {
  resetDb();
  const updatedAuthor = resolvers.Mutation.updateAuthor(null, {
    id: "2",
    author: { name: "Updated Author" }
  });

  assert.equal(updatedAuthor.name, "Updated Author");
  const authorInDb = db.authors.find((a) => a.id === "2");
  assert.equal(authorInDb.name, "Updated Author");
});

test("Mutation.deleteAuthor removes the author and returns remaining authors", () => {
  resetDb();
  const before = db.authors.length;

  const remainingAuthors = resolvers.Mutation.deleteAuthor(null, { id: "1" });

  assert.equal(db.authors.length, before - 1);
  assert.ok(!db.authors.find((a) => a.id === "1"));
  assert.equal(remainingAuthors.length, before - 1);
});