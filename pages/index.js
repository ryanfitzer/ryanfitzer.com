import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <nav>
                <Link href="/blog">
                    <a>Blog</a>
                </Link>
            </nav>
        </>
    );
};

export default Home;
