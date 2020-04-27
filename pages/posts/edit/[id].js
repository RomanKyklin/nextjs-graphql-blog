import axios from "axios";
import PostForm from "../../../client/components/post-form";
import React from "react";

export default function Edit({post}) {
    return <PostForm post={post}/>
}

export async function getServerSideProps({params}) {
    const query = `
        query {
          post(id: ${params.id}) {
                id
                title
                text
          }
        }
    `;
    const res = await axios.post(process.env.API_URL, {query});
    const {post} = res.data.data;
    return {
        props: {
            post
        }
    };
}
