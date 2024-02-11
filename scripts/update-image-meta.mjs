import { join } from 'path';
import { readdir, writeFile } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

const CONTENT_PATH = 'content';
const META_FILE_PATH = join(CONTENT_PATH, 'image-meta.json');

// Get all directories
const dirs = await readdir(CONTENT_PATH, {
  encoding: 'utf8',
  recursive: true,
});

// Filter paths that have images
const images = dirs.filter((dir) => {
  const pathArr = dir.split('/');
  const imagesIndex = pathArr.indexOf('images');

  return imagesIndex !== -1 && imagesIndex !== pathArr.length - 1;
});

// Create a image meta object for image
const imageMetaObj = images.reduce((accum, path) => {
  const idPath = path.split('.').slice(0, -1).join('.');

  accum[join(CONTENT_PATH, idPath)] = {
    error: {},
  };

  return accum;
}, {});

// Request meta for each image and update its meta object
const cloudinaryRequests = Object.keys(imageMetaObj).map(async (publicID) => {
  const {
    error,
    width,
    height,
    secure_url,
    image_metadata: metadata,
  } = await cloudinary.uploader
    .explicit(publicID, {
      type: 'upload',
      media_metadata: true,
    })
    .catch((error) => {
      console.log('[Error: API]', { publicID, ...error });
      return error.error
        ? { error: { ...error.error } }
        : { error: { ...error } };
    });

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

// Catch general API errors (499 Request Timeout, and 401 are the main ones)
await Promise.all(cloudinaryRequests).catch((error) => {
  console.log('Error: Promise]', error);
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
