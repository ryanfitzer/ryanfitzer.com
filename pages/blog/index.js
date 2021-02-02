import React from 'react';
import Link from 'next/link';
import { getPosts, getPostsByCategory, getCategories } from '~/library/js/posts';

const Blog = ( { posts, categories } ) => {

    console.log( categories );

    return (
      <div>
        {!posts && <div>No posts!</div>}
        <ul>
          {posts && posts.map( ( { title, slug } ) => {

              return (
                <li key={ slug }>
                  <Link href={ { pathname: `/blog/${ slug }` } }>
                    <a>{ title}</a>
                  </Link>
                </li>
              );

          } )}
        </ul>
      </div>
    );

};

export default Blog;

export async function getStaticProps() {

    return {
        props: {
            // posts: getPosts(),
            categories: getCategories(),
            posts: getPostsByCategory( 'Miscellany' ),
        },
    };

}
