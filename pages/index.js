import React from 'react';
import Link from 'next/link';

const Home = () => {

    return (
      <div>
        <ul>
          <Link href='/blog'>
            <a>Blog</a>
          </Link>
        </ul>
      </div>
    );

};

export default Home;
