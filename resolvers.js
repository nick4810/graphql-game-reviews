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
    },
    Mutation: {
        addGame(_, args) {
            const newGame = {
                ...args.game,
                id: String(db.games.length + 1),
            };
            db.games.push(newGame);
            return newGame;
        },
        updateGame(_, args) {
            const gameIndex = db.games.findIndex((game) => game.id === args.id);
            if (gameIndex === -1) {
                throw new Error(`Game with id ${args.id} not found`);
            }
            const updatedGame = {
                ...db.games[gameIndex],
                ...args.game,
            };
            db.games[gameIndex] = updatedGame;
            return updatedGame;
        },
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id);
            return db.games;
        },

        addReview(_, args) {
            const newReview = {
                ...args.review,
                id: String(db.reviews.length + 1),
            };
            db.reviews.push(newReview);
            return newReview;
        },
        updateReview(_, args) {
            const reviewIndex = db.reviews.findIndex((review) => review.id === args.id);
            if (reviewIndex === -1) {
                throw new Error(`Review with id ${args.id} not found`);
            }
            const updatedReview = {
                ...db.reviews[reviewIndex],
                ...args.review,
            };
            db.reviews[reviewIndex] = updatedReview;
            return updatedReview;
        },
        deleteReview(_, args) {
            db.reviews = db.reviews.filter((review) => review.id !== args.id);
            return db.reviews;
        },
        
        addAuthor(_, args) {
            const newAuthor = {
                ...args.author,
                id: String(db.authors.length + 1),
            };
            db.authors.push(newAuthor);
            return newAuthor;
        },
        updateAuthor(_, args) {
            const authorIndex = db.authors.findIndex((author) => author.id === args.id);
            if (authorIndex === -1) {
                throw new Error(`Author with id ${args.id} not found`);
            }
            const updatedAuthor = {
                ...db.authors[authorIndex],
                ...args.author,
            };
            db.authors[authorIndex] = updatedAuthor;
            return updatedAuthor;
        },
        deleteAuthor(_, args) {
            db.authors = db.authors.filter((author) => author.id !== args.id);
            return db.authors;
        }
    }
}