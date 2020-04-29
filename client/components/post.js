import Link from "next/link";
import React, {useEffect, useState} from "react";
import Alert from "./alert";
import Router from "next/router";
import PropTypes from 'prop-types';
import {gql} from "apollo-server-core";
import {useMutation} from "@apollo/react-hooks";

export const DELETE_POST = gql`
    mutation deletePost($id:Int) {
        deletePost(id: $id) {
            status
        }
    }
`;

const Post = ({post}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [deletePost, {data}] = useMutation(DELETE_POST);

    const onDeletePost = () => deletePost({variables: {id: post.id}})
        .then(() => setIsSubmitted(true))
        .catch(setError);

    useEffect(() => {
        if (isSubmitted) {
            Router.push('/posts')
        }
    }, [isSubmitted]);

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
