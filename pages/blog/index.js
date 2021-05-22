import React from 'react';
import Link from 'next/link';
import { array } from 'prop-types';
import { getPosts } from '../../library/js/query';

const Blog = ({ posts }) => {
    if (!posts) {
        return (
            <>
                <h1>Blog</h1>
                <div>No posts!</div>
            </>
        );
    }

    return (
        <>
            <h1>Blog</h1>
            <p>{posts.length} posts</p>
            <ul>
                {posts.map(({ title, slug }) => {
                    return (
                        <li key={slug}>
                            <Link href={{ pathname: `/blog/${slug}` }}>
                                <a>{title}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

Blog.propTypes = {
    posts: array,
    categories: array,
};

export default Blog;

export async function getStaticProps() {
    return {
        props: {
            posts: getPosts({ category: 'Miscellany', year: 2010 }),
        },
    };
}
