import axios from "axios";
import PostDetails from "../../client/components/post-details";
import React from "react";

function Post({post}) {
    return <PostDetails post={post}/>
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

export default Post;
