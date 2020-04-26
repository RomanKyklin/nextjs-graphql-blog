import {gql} from "apollo-server-core";
import {ApolloServer} from "apollo-server-micro";
import * as knex from "knex";
import bcrypt from "bcrypt";
import jws from 'jsonwebtoken';

const typeDefs = gql`
    type Query {
        posts: [Post!]!
        post(id: Int): Post
        createPost(title: String, text: String): Post
        deletePost(id: Int): Post
        updatePost(id: Int, title: String, text: String): Post
        users: [User!]!
        createUser(login: String, password: String): User
        login(login: String, password: String): User
    }
    type Post {
        id: Int!
        title: String
        text: String
    }
    type User {
        id: Int!
        login: String
        password: String
    }
`;

const resolvers = {
    Query: {
        posts: (parent, args, context) => {
            return db.select('*').from('posts').orderBy('id');
        },
        post: (parent, args, contex) => {
            const {id} = args;
            return db.select('*').from('posts').where({id}).first();
        },
        createPost: async (parent, args, contex) => {
            const {title, text} = args;
            const result = await db.insert({title, text}).from('posts');
            return result;
        },
        deletePost: (parent, args, contex) => {
            const {id} = args;
            return db('posts').where('id', id).del();
        },
        updatePost: (parent, args, contex) => {
            const {id, text, title} = args;
            return db('posts')
                .where('id', '=', id)
                .update({text, title})
        },
        users: () => {
            return db('users').select('*');
        },
        createUser: async (parent, args, contex) => {
            const {login, password} = args;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const result = db('users').insert({login, password: hashedPassword});
            return result;
        },
        login: async (parent, args, contex) => {
            const {login, password} = args;
            const user = await db('users').where({login}).first();
            const isPassportTheSame = bcrypt.compareSync(password, user && user.password);

            if (isPassportTheSame) {
                const claims = {sub: user.id, login: user.login};
                const jwt = jws.sign(claims, process.env.SECRET, {expiresIn: '1h'});
                console.log(jwt);
            }
        }
    },
};

const db = knex({
    client: "postgres",
    connection: process.env.PG_CONNECTION_STRING
});

const apolloServer = new ApolloServer({typeDefs, resolvers, context: () => db});


export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({path: '/api/graphql'})
