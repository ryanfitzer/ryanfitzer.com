import matter from '~/library/js/grey-matter';

const itemsToLowercase = ( arr ) => arr.map( ( item ) => item.toLowerCase() );

export const getPosts = () => {

    const posts = ( ( context ) => {

        const keys = context.keys();
        const values = keys.map( context );

        const data = keys.map( ( key, index ) => {

            const value = values[ index ];
            const document = matter( value.default );

            return {
                ...document.data,
                slug: key.replace( /^.*[\\\/]/, '' ).slice( 0, -3 ),
            };

        } );


        return data;

    } )( require.context( '~/content/posts', true, /\.md$/ ) );

    return posts;

};

export const getPostsByCategory = ( cat, posts ) => {

    const allPosts = posts || getPosts();
    const cats = itemsToLowercase( !Array.isArray( cat ) ? [ cat ] : cat );

    return allPosts.reduce( ( accum, post ) => {

        if ( cats.some( ( cat ) => itemsToLowercase( post.categories ).includes( cat ) ) ) {

            accum.push( post );

        }

        return accum;

    }, [] );

};

export const getCategories = () => {

    const totalCats = getPosts().map( ( { categories } ) => categories );
    const totalCatsFlat = totalCats.flat();
    const uniqueCats = [ ...new Set( totalCatsFlat ) ];

    const counts = totalCatsFlat.reduce( ( accum, cat ) => {

        accum[ cat ] = ( accum[ cat ] || 0 ) + 1;

        return accum;

    }, {} );


    return uniqueCats.reduce( ( accum, cat ) => {

        accum.push( {
            name: cat,
            count: counts[ cat ],
        } );

        return accum;

    }, [] );

};
