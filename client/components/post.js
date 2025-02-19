import Link from "next/link";
import React, {useState} from "react";
import Alert from "./alert";
import PropTypes from 'prop-types';
import {gql} from "apollo-server-core";
import {useMutation} from "@apollo/react-hooks";
import {GET_POSTS} from "../../pages/posts";

export const DELETE_POST = gql`
    mutation deletePost($id:Int) {
        deletePost(id: $id) {
            status
        }
    }
`;

const Post = ({post}) => {
    const [error, setError] = useState(null);
    const [deletePost, {data}] = useMutation(
        DELETE_POST,
        {
            update(cache, {data: {deletePost}}) {
                const {posts} = cache.readQuery({query: GET_POSTS});
                cache.writeQuery({
                    query: GET_POSTS,
                    data: {posts: posts.filter(val => val.id === deletePost.id)},
                });
            }
        }
    );

    const onDeletePost = () => deletePost({variables: {id: post.id}})
        .catch(setError);

    return (
        <div className="card">
            <div className="card-body">
                {error ? <Alert size='col-md-6' message='please refresh page' type='alert-danger'/> : null}
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.text}</p>
                <Link href='/posts/[id]' as={`/posts/${post.id}`}>
                    <a className="card-link">To post details</a>
                </Link>
                <a href="#" className="card-link" onClick={onDeletePost}>Delete post</a>
                <Link href='/posts/edit/[id]' as={`/posts/edit/${post.id}`}>
                    <a className="card-link">Edit post</a>
                </Link>
            </div>
        </div>
    )
};

Post.propTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
