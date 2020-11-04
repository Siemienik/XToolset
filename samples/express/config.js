const { resolve, join } = require('path');

const appPath = resolve(__dirname);

const UPLOAD_DIR = join(appPath, 'uploads');

module.exports = {
    UPLOAD_DIR,
};
