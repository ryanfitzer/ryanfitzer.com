module.exports = {
    poweredByHeader: false,
    // target: 'serverless',
    webpack( config ) {

        config.module.rules.push( {
            test: /\.md$/,
            use: 'raw-loader',
        } );

        return config;

    },
};
