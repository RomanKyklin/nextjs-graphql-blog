import {ApolloServer} from "apollo-server-micro";
import {knexClient} from "../../knex/clent";
import {typeDefs} from "../../gql/types";
import {resolvers} from "../../gql/resolvers";

const apolloServer = new ApolloServer({typeDefs, resolvers, context: () => ({knex: knexClient})});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({path: '/api/graphql'})
