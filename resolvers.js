import db from './_db.js';

export const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.gameId === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.authorId === parent.id);
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.authorId);
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.gameId);
        }
    }
}