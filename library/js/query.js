import { readFileSync } from 'fs';
import globby from 'globby';
import matter from './grey-matter';

const itemsToLowercase = (arr) => arr.map((item) => item.toLowerCase());

const postsPaths = globby.sync('./content/posts/*.md', {
    absolute: true,
    cwd: process.cwd(),
});

const allPosts = postsPaths.map((path) => {
    const src = readFileSync(path, { encoding: 'utf8' });
    const document = matter(src);

    return {
        ...document.data,
        slug: path.replace(/^.*[\\/]/, '').slice(0, -3),
    };
});

const allCategories = (() => {
    const totalCats = allPosts.map(({ categories }) => categories);
    const totalCatsFlat = totalCats.flat();
    const uniqueCats = [...new Set(totalCatsFlat)];

    const counts = totalCatsFlat.reduce((accum, cat) => {
        accum[cat] = (accum[cat] || 0) + 1;

        return accum;
    }, {});

    return uniqueCats.reduce((accum, cat) => {
        accum.push({
            name: cat,
            count: counts[cat],
        });

        return accum;
    }, []);
})();

const filterByCategory = (cat = [], collection = allPosts) => {
    const cats = itemsToLowercase(!Array.isArray(cat) ? [cat] : cat);

    return collection.reduce((accum, post) => {
        if (
            cats.some((cat) => itemsToLowercase(post.categories).includes(cat))
        ) {
            accum.push(post);
        }

        return accum;
    }, []);
};

export const getPosts = (args = {}) => {
    const { category, year } = args;
    let result = allPosts;

    if (category) result = filterByCategory(category, result);

    return result;
};
