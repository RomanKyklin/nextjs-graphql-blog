import React, {useEffect, useState} from "react";
import Layout from "../layouts/layout";
import Link from "next/link";
import Router from "next/router";
import Alert from "./alert";
import PropTypes from 'prop-types';
import {gql} from "apollo-server-core";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_POSTS} from "../../pages/posts";

export const CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            login
        }
    }`;

export const CREATE_POST = gql`
    mutation createPost($title:String, $text:String, $user_id:Int) {
        createPost(title: $title, text: $text, user_id: $user_id) {
            id
            title
            text
        }
    }`;

export const UPDATE_POST = gql`
    mutation updatePost($id:Int, $title:String, $text:String) {
        updatePost(id: $id, title: $title, text: $text) {
            id
            title
            text
        }
    }`;

const PostForm = ({post = null}) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [text, setText] = useState(post ? post.text : '');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [createPost, {createPostData}] = useMutation(
        CREATE_POST,
        {
            update(cache, {data: {createPost}}) {
                const {posts} = cache.readQuery({query: GET_POSTS});
                cache.writeQuery({
                    query: GET_POSTS,
                    data: {posts: posts.concat([createPost])},
                });
            }
        }
    );
    const [updatePost, {updatePostData}] = useMutation(UPDATE_POST);
    const {loading, userError, data} = useQuery(CURRENT_USER);

    const onSubmit = async event => {
        event.preventDefault();
        const {id} = data.currentUser;
        if (title && text) {
            try {
                post ?
                    await updatePost({variables: {id: post.id, title, text}}) :
                    await createPost({variables: {title, text, user_id: id}});
                setIsSubmitted(true);
            } catch (e) {
                console.error(e);
                setError(e);
            }
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
                message={error.message}
                type='alert-danger'
                size='col-md-6'
            /> : null}
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    {post ? <h2>Update post {post.id}</h2> : <h2>Create new post</h2>}
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
