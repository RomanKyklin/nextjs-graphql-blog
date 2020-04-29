import {ApolloServer} from "apollo-server-micro";
import {context} from '../../apollo/contex';
import {typeDefs} from "../../gql/types";
import {resolvers} from "../../gql/resolvers";
import {isAuthenticated} from "../../apollo/auth-directive";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    introspection: true,
    playground: true,
    schemaDirectives: {isAuthenticated: isAuthenticated}
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({path: '/api/graphql'});

