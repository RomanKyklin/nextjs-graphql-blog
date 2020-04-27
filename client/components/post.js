import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";
import Alert from "./alert";
import Router from "next/router";
import PropTypes from 'prop-types';
import getConfig from "next/config";

const {
    publicRuntimeConfig: {API_URL}
} = getConfig();

const Post = ({post}) => {
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
