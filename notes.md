# Notes

# ToDos

- Convert to ES6 modules?.
- Use TypeScript?
- Centralize `getStaticPaths`
- Posts API: Implement needed methods. Example: <https://developer.wordpress.org/reference/classes/wp_query/parse_query/>
- Post API: Design post object structure. Example: <https://developer.wordpress.org/reference/functions/get_post/#comment-876>

## Future URL Structure

/: - About me blurb - Links to Github, Twitter, etc.

/art: - Related content

/blog: - Latest 10 post titles

/blog/<year>/<month>/<day>/<slug>: - Post detail

/photos: - Photo stream similar to Instagram

/photos/<year>/<month>/<day>/<slug>: - Photo detail

## Current URL Structure

/: - Latest long form post - Previous 5 long form post excerpts - Latest 5 "photoblog" post excerpts - Latest 10 "quick" posts

/<page>: - Related content

/<year>/<month>/<slug>: - Post detail

/category/<category>:
/category/<category>/<category>: - Latest 10 "<category>" post excerpts

/category/<category>/page/<number>:
/category/<category>/<category>/page/<number>: - Earlier 10 "<category>" post excerpts

## Pages

| Name     | Slug     |
| -------- | -------- |
| Archives | archives |
| Contacts | contacts |
| Friends  | friends  |
| Resume   | resume   |

## Categories

| Name        | Slug        | Count |
| ----------- | ----------- | ----- |
| Gallery     | gallery     | 48    |
| Exhibitions | exhibitions | 1     |
| Ideas       | ideas       | 15    |
| Portfolio   | portfolio   | 8     |
| Process     | process     | 59    |
| Miscellany  | miscellany  | 6     |
| Photo Essay | photo-essay | 6     |
| PhotoBlog   | photographs | 1208  |
| Quick       | quick       | 175   |
