import type { Element } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { getImageMeta } from '@/components/image';

type ImageElement = Element & {
  tagName: 'img';
  properties: { src: string };
};

type Options = {
  contentDir: string;
};

const rehypeImage: Plugin<[Options]> = function ({ contentDir }) {
  return (tree, vfile) => {
    visit(tree, 'element', (node: ImageElement) => {
      const { properties, tagName } = node;

      if (tagName === 'img') {
        console.log('node', node);

        const { secure_url } = getImageMeta(properties.src, contentDir);
        node.properties.src = secure_url;
      }
    });
  };
};

export default rehypeImage;
