import Layout from "../layouts/layout";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Router from "next/router";
import Alert from "./alert";
import PropTypes from 'prop-types';
import getConfig from 'next/config';

const PostDetails = ({post}) => {
    const {publicRuntimeConfig: {API_URL}} = getConfig();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const query = `
        query {
          deletePost(id: ${post.id}) {
                id
                title
                text
          }
        }
    `;
    const onDeletePost = () => {
        axios.post(API_URL, {query})
            .then(() => setIsSubmitted(true))
            .catch(setError)
    };

    useEffect(() => {
        if (isSubmitted) {
            Router.push('/posts')
        }
    }, [isSubmitted]);

    return (
        <Layout>
            {error ? <Alert size='col-md-6' message='please refresh page' type='alert-danger'/> : null}
            <div className="jumbotron">
                <h1 className="display-4">{post.title}</h1>
                <p className="lead">{post.text}</p>
                <hr className="my-4"/>
                <Link href='/posts/edit/[id]' as={`/posts/edit/${post.id}`}>
                    <a className="btn btn-primary btn-lg mr-2" role="button">Edit post</a>
                </Link>
                <a className="btn btn-danger btn-lg mr-2" href="#" role="button" onClick={onDeletePost}>Delete post</a>
                <Link href="/posts">
                    <a className="btn btn-info btn-lg mr-2" role="button">Back to posts page</a>
                </Link>
            </div>
        </Layout>
    )
};

PostDetails.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostDetails;


