import React from "react";
import {ApolloProvider} from '@apollo/react-hooks';
import withData from '../apollo/client';

function App({Component, pageProps, apollo}) {
    return (
        <ApolloProvider client={apollo}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default withData(App);
