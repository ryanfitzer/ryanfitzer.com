import React from 'react';
import Link from 'next/link';
import { array } from 'prop-types';
import {
    getPosts,
    getCategories,
    getPostsByCategory,
} from '~/library/js/query';

const Blog = ({ posts, categories }) => {
    console.log('categories', categories);
    console.log('posts', posts);

    if (!posts) return <div>No posts!</div>;

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
            categories: getCategories(),
            posts: getPosts(),
            // posts: getPostsByCategory('Miscellany'),
        },
    };
}
