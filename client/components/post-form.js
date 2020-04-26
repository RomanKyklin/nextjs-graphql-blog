import React, {useEffect, useState} from "react";
import Layout from "../layouts/layout";
import Link from "next/link";
import axios from 'axios';
import {createPost, updatePost} from "../../queries/posts";
import Router from "next/router";
import Alert from "./alert";
import PropTypes from 'prop-types';
import getConfig from 'next/config';

const PostForm = ({post = null}) => {
    const {
        publicRuntimeConfig: {API_URL}
    } = getConfig();
    const [title, setTitle] = useState(post ? post.title : '');
    const [text, setText] = useState(post ? post.text : '');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = event => {
        event.preventDefault();

        if (title && text) {
            axios.post(API_URL, {
                query: post ?
                    updatePost(post.id, title, text) :
                    createPost(title, text)
            })
                .then(() => setIsSubmitted(true))
                .catch(err => setError(err))
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            Router.push('/posts')
        }
    }, [isSubmitted]);

    return (
        <Layout>
            {error ? <Alert
                message='Server sent an error, please refresh the page'
                type='alert-danger'
                size='col-md-6'
            /> : null}
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <h2>Create new post</h2>
                </div>
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div className="form-group text-center">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" value={title}
                                   onChange={event => setTitle(event.target.value.trim())} required={true}/>
                        </div>
                        <div className="form-group text-center">
                            <label htmlFor="text">Text</label>
                            <input type="text" className="form-control" id="text" value={text}
                                   onChange={event => setText(event.target.value.trim())} required={true}/>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        <Link href="/posts">
                            <a type="button" className="btn btn-info">Back</a>
                        </Link>
                    </form>
                </div>
            </div>
        </Layout>

    )
};

PostForm.propTypes = {
    post: PropTypes.object
};

export default PostForm;
