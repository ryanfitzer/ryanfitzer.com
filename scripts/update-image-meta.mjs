import { join } from 'path';
import { readdir, writeFile } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

const RETRY_LIMIT = 4;
const CONTENT_PATH = 'content';
const META_FILE_PATH = join(CONTENT_PATH, 'image-meta.json');

/**
 * Get all directories
 * returns @type {Array<string>}
 */
const dirs = await readdir(CONTENT_PATH, {
  encoding: 'utf8',
  recursive: true,
});

/**
 * Filter paths that have images
 * returns @type {Array<string>}
 */
const images = dirs.filter((dir) => {
  const ignore = ['.DS_Store', 'originals'];
  const pathArr = dir.split('/');
  const imagesIndex = pathArr.indexOf('images');
  const hasIgnored = ignore.some((item) => pathArr.includes(item));

  return (
    !hasIgnored && imagesIndex !== -1 && imagesIndex !== pathArr.length - 1
  );
});

/**
 * Create a placeholder image meta object for each image
 * returns @type {Object<string, {error: Object<string, any>}>}
 */
const imageMetaObj = images.reduce((accum, path) => {
  const idPath = path.split('.').slice(0, -1).join('.');

  accum[join(CONTENT_PATH, idPath)] = {
    error: {},
  };

  return accum;
}, {});

// https://cloudinary.com/documentation/image_upload_api_reference#explicit
const apiRequest = async (publicID, attempts = 0) => {
  attempts = attempts + 1;

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

console.log(`Images: ${images.length}`);

/**
 * Request meta for each image and update its meta object
 * returns @type {Array<Promise<any>>}
 */
const cloudinaryRequests = Object.keys(imageMetaObj).map(async (publicID) => {
  const request = await apiRequest(publicID);

  const {
    error,
    width,
    height,
    secure_url,
    image_metadata: metadata,
  } = request;

  if (error) {
    imageMetaObj[publicID] = { error };
  } else {
    imageMetaObj[publicID] = {
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

// Catch errors
await Promise.all(cloudinaryRequests).catch((error) => {
  console.log('[Error: Promise]', error);
});

// Log out all images that have errors
// Object.entries(imageMetaObj).forEach(([publicID, { error }]) => {
//   if (error) console.log('[Error: Meta]', { publicID, ...error });
// });

// Write all image meta to JSON
await writeFile(META_FILE_PATH, JSON.stringify(imageMetaObj, null, 2)).catch(
  (error) => console.log('\n[Error: Write]', error)
);

console.log(`\n[Write] File created: ${META_FILE_PATH}`);
