import Head from "next/dist/next-server/lib/head";
import Layout from "../../client/layouts/layout";
import Posts from "../../client/components/posts";
import {gql} from "apollo-server-core";
import {useQuery} from "@apollo/react-hooks";
import React from "react";
import Alert from "../../client/components/alert";

export const GET_POSTS = gql`
    query posts {
        posts {
            id
            title
            text
        }
    }
`;

function Index() {
    const {loading, error, data} = useQuery(GET_POSTS);

    if (!loading && !error) {
        const {posts} = data;
        return (
            <Layout>
                <Head>
                    <title>Posts page</title>
                </Head>
                <Posts posts={posts}/>
            </Layout>
        );
    }

    return (
        <Layout>
            {error ? <Alert message={error.message}/> : <b>Loading ...</b>}
        </Layout>
    )
}

export default Index;
