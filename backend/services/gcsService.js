const { bucket } = require('../config/gcs');
const { v4: uuidv4 } = require('uuid');

exports.uploadTemplateToGCS = async (filename, buffer) => {
  const gcsFileName = `templates/${uuidv4()}_${filename}`;
  const file = bucket.file(gcsFileName);

  await file.save(buffer, {
    resumable: false,
    contentType: 'auto',
    metadata: { cacheControl: 'public, max-age=31536000' },
  });

  const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  });

  return { path: gcsFileName, url: signedUrl };
};

exports.deleteFromGCS = async (gcsPath) => {
  const file = bucket.file(gcsPath);
  await file.delete();
};
