import {gql} from "apollo-server-core";

export const typeDefs = gql`
    directive @isAuthenticated on FIELD_DEFINITION
    type Query {
        currentUser: User! @isAuthenticated
        posts: [Post!]! @isAuthenticated
        post(id: Int): Post @isAuthenticated
        users: [User!]!
    }
    type Mutation {
        createUser(login: String, password: String): Token 
        createPost(title: String, text: String, user_id: Int): Post @isAuthenticated
        deletePost(id: Int): Status @isAuthenticated
        updatePost(id: Int, title: String, text: String): Post @isAuthenticated
        login(login: String, password: String): Token
    }
    type Post {
        id: Int!
        title: String!
        text: String!
        user: User!
    }
    type User {
        id: Int!
        login: String
        password: String
    }
    type Status {
        status: Boolean
    }
    type Token {
        token: String
    }
`;
