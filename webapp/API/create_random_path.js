import fs from 'fs';

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomString(length) {
    let dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let dict_length = dictionary.length;

    let result = "";
    for (let i = 0; i < length; i++) {
        result += dictionary.charAt(Math.floor(Math.random() * dict_length));
    }
    return result;
}

/**
 * 
 * @returns Random path in course-data (for video files)
 */
function getRandomPath() {
    const baseDataPath = '/course-data/';
    return baseDataPath + randomString(20);
}

function getExtensionFromPath(path) {
    return path.split('.').pop();
}

/**
 * 
 * @param {String} origPath - original file's path (usually in temp)
 * @returns New path with randomized name in course-data (for other files)
 */
function getRandomPathFromFile(origPath) {
    let ext = getExtensionFromPath(origPath);
    let newPath = getRandomPath() + '.' + ext;
    fs.copyFileSync(origPath, newPath, fs.constants.COPYFILE_EXCL);
    return newPath;
}

module.exports = {getRandomPathFromFile, getRandomPath};