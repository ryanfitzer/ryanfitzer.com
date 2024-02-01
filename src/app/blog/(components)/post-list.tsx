import Link from 'next/link';

export const PostList = ({ posts }: { posts: Entry[] }) => {
  return (
    <ul className="w-full">
      {posts.map(({ id, title, route, dateLong }) => (
        <li key={id} className="mt-4 text-2xl">
          <Link href={route}>{title}</Link>
          <br />
          <p className="text-sm mt-1">{dateLong}</p>
        </li>
      ))}
    </ul>
  );
};
