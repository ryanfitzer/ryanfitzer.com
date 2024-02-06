import { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = (scope: Entry) => {
  return {
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-xl mb-12">{children}</p>
    ),
    // img: ({ src, alt }: any) => {
    //   return <img alt={alt} src={resolve(scope.contentDir, src)} />;
    // },
  };
};

export default function MDX({ source, options, scope }: any) {
  return (
    <MDXRemote
      source={source}
      options={options}
      components={components(scope)}
    />
  );
}
