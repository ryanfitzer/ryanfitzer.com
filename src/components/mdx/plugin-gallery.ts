import { clsx } from 'clsx';
import rehypeRewrite from 'rehype-rewrite';

type ParentAttrs = {
  type: string;
  name: string;
  value: string;
};

type ParentNode = {
  type: string;
  name: string;
  attributes: ParentAttrs[];
};

type ChildProps = {
  src: string;
  alt: string;
  className: string;
};

type ChildNode = {
  type: string;
  tagName: string;
  properties: ChildProps;
};

type GalleryConfig = {
  [key: string]: {
    parent: (parent: ParentNode) => void;
    children: (children: ChildNode[]) => void;
  };
};

const galleryConfig: GalleryConfig = {
  'gallery:masonry': {
    parent: ({ attributes }: ParentNode) => {
      const classes = 'flex flex-col flex-wrap gap-3 max-h-[5500px]';

      const classAttr = attributes.find(({ name }) => name === 'className');

      if (classAttr) {
        classAttr.value = clsx(classAttr.value, classes);
      }
    },
    children: (children) => {
      children.forEach((child) => {
        child.properties.className = 'w-1/2';
      });
    },
  },
};

const getGalleryType = (attrs: ParentAttrs[]) => {
  let galleryType: string | null = null;
  const galleryTypes = Object.keys(galleryConfig);

  const attr = attrs.find(
    ({ name, value }) => name === 'className' && value.includes('gallery:')
  );

  galleryTypes.some((type) => {
    if (!attr || !attr.value.includes(type)) return;

    galleryType = type;
    return true;
  });

  return galleryType;
};

const rewrite = (node: any) => {
  console.log(JSON.stringify(node, null, 2));
  if (!node.attributes?.length) return;

  const galleryType = getGalleryType(node.attributes);

  if (!galleryType) return;

  galleryConfig[galleryType].parent(node);
  galleryConfig[galleryType].children(node.children);
};

const plugin = [rehypeRewrite, { rewrite }];

export default plugin;
