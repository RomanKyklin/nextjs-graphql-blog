import {createHttpLink} from 'apollo-link-http';
import ApolloClient from "apollo-client";
import {InMemoryCache} from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import getConfig from "next/config";
import {setContext} from "apollo-link-context";

const {
    publicRuntimeConfig: {API_URL}
} = getConfig();

const link = createHttpLink({
    fetch,
    uri: API_URL
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export default withApollo(
    ({initialState}) =>
        new ApolloClient({
            link: authLink.concat(link),
            cache: new InMemoryCache()
                .restore(initialState || {}),
        })
);
