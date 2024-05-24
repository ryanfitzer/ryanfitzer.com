import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import { readdir, writeFile } from 'node:fs/promises';
import { v2 as cloudinary } from 'cloudinary';

const RETRY_LIMIT = 4;
const CONTENT_DIR = 'content';
const META_FILE_PATH = resolve(join(CONTENT_DIR, 'image-meta.json'));

const args = parseArgs({
  options: {
    baseDir: {
      type: 'string',
      short: 'd',
      default: CONTENT_DIR,
    },
  },
});

console.log('[CONFIG] baseDir: ', args.values.baseDir);

const apiRequest = async (publicID, attempts = 0) => {
  attempts = attempts + 1;

  // https://cloudinary.com/documentation/image_upload_api_reference#explicit
  const { error, ...data } = await cloudinary.uploader
    .explicit(publicID, {
      type: 'upload',
      media_metadata: true,
    })
    .catch((reason) => {
      return {
        error: reason,
      };
    });

  if (error) {
    let errorObject = error;
    if (error.error) errorObject = errorObject;

    console.log(
      '[Error: API]',
      { publicID, ...errorObject },
      `attempts: ${attempts}`
    );

    if (errorObject.http_code === 404 || attempts === RETRY_LIMIT) {
      return { error: { ...errorObject } };
    }

    return await apiRequest(publicID, attempts);
  }

  return data;
};

const createImageIndex = async () => {
  const { baseDir } = args.values;
  const shouldUpdate = baseDir !== CONTENT_DIR;

  const dirs = await readdir(baseDir, {
    encoding: 'utf8',
    recursive: true,
  });

  const imagePaths = dirs.filter((dir) => {
    const ignore = ['.DS_Store', 'originals'];
    const pathArr = dir.split('/');
    const imagesIndex = pathArr.indexOf('images');
    const hasIgnored = ignore.some((item) => pathArr.includes(item));

    return (
      !hasIgnored && imagesIndex !== -1 && imagesIndex !== pathArr.length - 1
    );
  });

  const imageDataObject = imagePaths.reduce((accum, path) => {
    const idPath = path.split('.').slice(0, -1).join('.');

    accum[join(baseDir, idPath)] = {
      update: true,
    };

    return accum;
  }, {});

  if (!shouldUpdate) return imageDataObject;

  const imageIndex = await import(META_FILE_PATH, {
    assert: { type: 'json' },
  });

  return Object.entries(imageIndex.default).reduce((accum, [key, data]) => {
    if (key.match(baseDir) === null) accum[key] = data;

    return accum;
  }, imageDataObject);
};

const requestImages = async (imageIndex) => {
  const filteredImageIndex = Object.keys(imageIndex).filter(
    (publicID) => imageIndex[publicID].update
  );

  console.log('[REQUESTS]', filteredImageIndex.length);

  const cloudinaryRequests = filteredImageIndex.map(async (publicID) => {
    const request = await apiRequest(publicID);

    const {
      error,
      width,
      height,
      secure_url,
      image_metadata: metadata,
    } = request;

    if (error) {
      imageIndex[publicID] = { error };
    } else {
      imageIndex[publicID] = {
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
    }
  });

  // TODO: Use `Promise.allSettled`to give the final error status?
  // Catch errors
  await Promise.all(cloudinaryRequests).catch((error) => {
    console.log('[Error: Promise]', error);
  });

  return imageIndex;
};

const writeImageIndexFile = async () => {
  const imageIndex = await createImageIndex();
  const imageDataObject = await requestImages(imageIndex);

  await writeFile(
    META_FILE_PATH,
    JSON.stringify(imageDataObject, null, 2)
  ).catch((error) => console.log('\n[Error: Write]', error));

  console.log(`\n[Write] File created: ${META_FILE_PATH}`);
};

await writeImageIndexFile();
