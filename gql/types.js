import {gql} from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        posts: [Post!]!
        post(id: Int): Post
        users: [User!]!
        login(login: String, password: String): User
    }
    type Mutation {
        createUser(login: String, password: String): User
        createPost(title: String, text: String): Post
        deletePost(id: Int): Status
        updatePost(id: Int, title: String, text: String): Post
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
`;
