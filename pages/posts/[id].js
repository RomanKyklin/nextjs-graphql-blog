import axios from "axios";
import {getPost, getPosts} from "../../queries/posts";
import PostDetails from "../../client/components/post-details";
import React from "react";

function Post({post}) {
    return <PostDetails post={post}/>
}

export async function getStaticPaths() {
    const res = await axios.post(process.env.API_URL, {query: getPosts});
    const {posts} = res.data.data;
    const paths = posts.map(post => ({
        params: {id: post.id.toString()},
    }));
    return {
        paths,
        fallback: false // See the "fallback" section below
    };
}

export async function getStaticProps({params}) {
    const getUserQuery = getPost(params.id);
    const res = await axios.post(process.env.API_URL, {query: getUserQuery});
    const {post} = res.data.data;
    return {
        props: {
            post
        }
    };
}

export default Post;
