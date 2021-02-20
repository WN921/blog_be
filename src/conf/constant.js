/**
 * @description 常量集合
 */
const fs = require('fs/promises');
const path = require('path');
const DIST_FOLDER_PATH = path.join(__dirname, '..','..', 'MDFiles');
const DIST_IMAGE_PATH = path.join(__dirname, '..', '..', 'Images');
//检测上传文件路径是否存在， 不存在则创建上传文件夹
fs.access(DIST_FOLDER_PATH).catch(() => {
    fs.mkdir(DIST_FOLDER_PATH);
    fs.mkdir(DIST_IMAGE_PATH);
})
module.exports = {
    DEFAULT_PICTURE: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg',
    DIST_FOLDER_PATH,
    DIST_IMAGE_PATH
}