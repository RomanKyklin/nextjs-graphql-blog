import PostDetails from "../../client/components/post-details";
import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_POST} from "./edit/[id]";
import Alert from "../../client/components/alert";
import Layout from "../../client/layouts/layout";

function Post({id}) {
    const {loading, error, data} = useQuery(GET_POST, {variables: {id}});
    console.log(error);
    if (!loading && !error) {
        const {post} = data;
        return <PostDetails post={post}/>
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

export default Post;
