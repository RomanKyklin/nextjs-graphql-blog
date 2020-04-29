import {createHttpLink} from 'apollo-link-http';
import ApolloClient from "apollo-client";
import {InMemoryCache} from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import getConfig from "next/config";

const {
    publicRuntimeConfig: {API_URL}
} = getConfig();

const link = createHttpLink({
    fetch,
    uri: API_URL
});

export default withApollo(
    ({initialState}) =>
        new ApolloClient({
            link: link,
            cache: new InMemoryCache()
                .restore(initialState || {})
        })
);
