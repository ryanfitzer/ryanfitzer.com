import matter from 'gray-matter';
import yaml from 'js-yaml';

const config = {
    engines: {
        yaml: ( s ) => yaml.safeLoad( s, { schema: yaml.JSON_SCHEMA } ),
    },
};

/**
 * Customized Frontmatter parser.
 * [Source]{@link https://github.com/jonschlinkert/gray-matter/issues/62#issuecomment-577628177}
 *
 * @param {string} string - The string to parse.
 * @returns {object}
 */
const parser = ( string ) => {

    return matter( string, config );

};

export default parser;
