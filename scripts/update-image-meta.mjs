import { join } from 'path';
import { readdir, writeFile } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

const CONTENT_PATH = 'content';

const dirs = await readdir('content', {
  encoding: 'utf8',
  recursive: true,
});

const images = dirs.filter((dir) => {
  const pathArr = dir.split('/');
  const imagesIndex = pathArr.indexOf('images');

  return imagesIndex !== -1 && imagesIndex !== pathArr.length - 1;
});

const imageMeta = images.reduce((accum, path) => {
  const idPath = path.split('.').slice(0, -1).join('.');

  accum[join(CONTENT_PATH, idPath)] = {
    error: {},
  };

  return accum;
}, {});

// TODO use `await`
Promise.all(
  Object.keys(imageMeta).map(async (publicID) => {
    const {
      error,
      width,
      height,
      secure_url,
      image_metadata: metadata,
    } = await cloudinary.uploader
      .explicit(publicID, {
        cloud_name: 'dzm9m22ul',
        api_key: '621335587394736',
        api_secret: '510gdeUiwEFD4kQQfTwblBlx_HI',
        type: 'upload',
        media_metadata: true,
      })
      .catch((error) => {
        console.log(
          `[ERROR] for ${publicID}: ${error.http_code} - ${error.message}`,
          error
        );
        return error.error
          ? { error: { ...error.error } }
          : { error: { ...error } };
      });

    if (error) {
      imageMeta[publicID] = { error };
      return;
    }

    imageMeta[publicID] = {
      width,
      height,
      secure_url,
      metadata: {
        model: metadata.Model,
        iso: metadata.ISO,
        exposure: metadata.ExposureTime,
        aperture: metadata.FNumber,
        focalLength: metadata.FocalLength,
        focalLengthIn35mmFormat: metadata.FocalLengthIn35mmFormat,
      },
    };
  })
)
  .then(async () => {
    Object.entries(imageMeta).forEach(([key, value]) => {
      if (!value) console.log(`[Null] ${key}`);
    });

    await writeFile(
      'content/image-meta.json',
      JSON.stringify(imageMeta, null, 2)
    );

    console.log('File created: content/image-meta.json');
  })
  .catch((error) => {
    console.log(error);
  });
