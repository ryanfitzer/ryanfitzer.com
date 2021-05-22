import React from 'react';
import '../library/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
