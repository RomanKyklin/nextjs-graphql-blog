import React from "react";
import Link from "next/link";
import PropTypes from 'prop-types';
import Post from "./post";

const Posts = ({posts}) => {
    return (
        <>
            <div className="row p-2">
                <div className="col-md-12">
                    <Link href="/posts/create">
                        <a type="button" className="btn btn-success">Create post</a>
                    </Link>
                </div>
            </div>
            {
                posts.map(post => (
                        <div className="row" key={post.id}>
                            <div className="col-md-12 text-center p-2">
                                <Post post={post}/>
                            </div>
                        </div>
                    )
                )
            }
        </>

    )
};

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};

export default Posts;
