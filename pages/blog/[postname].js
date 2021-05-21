import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import matter from '~/library/js/grey-matter';

export default function BlogPost(post) {
    console.log(post);
    const { meta, body } = post;

    if (!meta) return <> </>;

    return (
        <>
            <Link href="/blog">
                <a>Back to post list</a>
            </Link>
            <article>
                <h1>{meta.title}</h1>
                <div>
                    <ReactMarkdown source={body} />
                </div>
            </article>
        </>
    );
}

export async function getStaticProps({ ...ctx }) {
    const { postname } = ctx.params;

    const content = await import(`~/content/posts/${postname}.md`);
    const data = matter(content.default);

    return {
        props: {
            meta: data.data,
            body: data.content,
        },
    };
}

export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        const keys = context.keys();
        const data = keys.map((key, index) => {
            const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);

            return slug;
        });

        return data;
    })(require.context('~/content/posts', true, /\.md$/));

    const paths = blogSlugs.map((slug) => `/blog/${slug}`);

    return {
        paths,
        fallback: false,
    };
}
