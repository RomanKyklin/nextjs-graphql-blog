import PostForm from "../../../client/components/post-form";
import React from "react";
import {gql} from "apollo-server-core";
import {useQuery} from "@apollo/react-hooks";
import Alert from "../../../client/components/alert";
import Layout from "../../../client/layouts/layout";

export const GET_POST = gql`
    query post($id: Int) {
        post(id: $id) {
            id
            title
            text
            user {
                login
            }
        }
    }`;

export default function Edit({id}) {
    const {loading, error, data} = useQuery(GET_POST, {variables: {id}});
    if (!loading && !error) {
        const {post} = data;
        return <PostForm post={post}/>
    }
    return (
        <Layout>
            {error ? <Alert message='Please refresh the page'/> : <b>Loading ...</b>}
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    return {
        props: {
            id: parseInt(id)
        }
    };
}
