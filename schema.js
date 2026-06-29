export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!,
        reviews: [Review!],
    }
    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        author: Author!,
        game: Game!,
    }
    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review],
    }
    
    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        games: [Game],
        game(id: ID!): Game,
        authors: [Author],
        author(id: ID!): Author,
    }

    type Mutation {
        addGame(game: GameInput!): Game
        updateGame(id: ID!, game: GameUpdateInput!): Game
        deleteGame(id: ID!): [Game]
    }
    type Mutation {
        addReview(review: ReviewInput!): Review
        updateReview(id: ID!, review: ReviewUpdateInput!): Review
        deleteReview(id: ID!): [Review]
    }
    type Mutation {
        addAuthor(author: AuthorInput!): Author
        updateAuthor(id: ID!, author: AuthorUpdateInput!): Author
        deleteAuthor(id: ID!): [Author]
    }

    input GameInput {
        title: String!,
        platform: [String!]!,
    }
    input GameUpdateInput {
        title: String,
        platform: [String!],
    }
    
    input ReviewInput {
        rating: Int!,
        content: String!,
        authorId: ID!,
        gameId: ID!,
    }
    input ReviewUpdateInput {
        rating: Int,
        content: String,
        authorId: ID,
        gameId: ID,
    }

    input AuthorInput {
        name: String!,
        verified: Boolean!,
    }
    input AuthorUpdateInput {
        name: String,
        verified: Boolean,
    }
`