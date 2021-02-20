/**
 * @description user controller，包含业务逻辑和返回格式
 */

const { createBlogFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
    deleteBlogFailInfo,
    getSpecifiedBlogFailInfo,
    getBlogListFailInfo,
    countBlogFailInfo
} = require('../model/ErrorInfo');
const fs = require('fs/promises');
const path = require('path');
const { DIST_FOLDER_PATH } = require('../conf/constant');
const { createBlog, destroyBlog, getBlogInfo, getBatchBlogInfo, upBlog, countBlog } = require('../services/blog');
const { updateLabelsFotBlog } = require('./label');
/**
 * 新增博客
 * @param {string} userId 写作博客的Id
 * @param {string} userName 写作博客的用户的名字
 * @param {string} title 博客标题
 * @param {string} MDStr MD格式的字符串
 */
async function insertBlog({ userId, userName, title, MDStr, abstract, labelList }) {
    //业务逻辑处理
    const userPath = path.join(DIST_FOLDER_PATH, String(userName));

    //创建MD文件
    const MDFileName = Date.now() + '.' + title + '.md';
    const MDFilePath = path.join(userPath, MDFileName);
    await fs.appendFile(MDFilePath, MDStr);

    //插入数据库表
    try {
        let result = await createBlog({
            userId,
            title,
            MDFilePath,
            abstract
        });
        if (labelList) {
            updateLabelsFotBlog(result, labelList);
        }
        return new SuccessModel(result.dataValues);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createBlogFailInfo);
    }

}
/**
 * 
 * @param {number} blogId 
 * @param {String} MDStr 
 * @param {String} title 
 * @param {String} abstract 
 * @param {Arrat} labelList 
 */
async function updateBlog({ blogId, userId, userName, MDStr, MDFilePath, title, abstract, labelList }) {
    //业务逻辑
    //先删除原有的MD文件, 然后新建
    await fs.rm(MDFilePath);
    const userPath = path.join(DIST_FOLDER_PATH, String(userName));

    //创建MD文件
    const MDFileName = Date.now() + '.' + title + '.md';
    const newMDFilePath = path.join(userPath, MDFileName);
    await fs.appendFile(newMDFilePath, MDStr);
    //更新数据库表
    try {
        let result = await upBlog({
            blogId,
            title,
            "MDFilePath": newMDFilePath,
            abstract
        });
        let blogInstance = await getBlogInfo(blogId);
        if (labelList) {
            updateLabelsFotBlog(blogInstance, labelList);
        }
        return new SuccessModel(blogInstance.dataValues);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createBlogFailInfo);
    }

}
/**
 * 删除指定博客（包括文件和数据库记录）
 * @param {number} id 博客id
 * @param {string} MDFilePath 博客的MD文件存储地址
 */
async function deleteBlog(id, MDFilePath) {
    //删除文件
    try {
        await fs.rm(MDFilePath);
    }
    catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(deleteBlogFailInfo);
    }

    const result = await destroyBlog(id);
    if (result > 0) {
        return new SuccessModel();
    }
    else {
        return new ErrorModel(deleteBlogFailInfo);
    }


}


/**
 * 获取指定id的博客
 * @param {number} id 博客id
 */
async function getSpecifiedBlog(id) {

    try{
        const result = await getBlogInfo(id);
        if(!result){
            return new ErrorModel(getSpecifiedBlogFailInfo);
        }
        result.dataValues.content = await fs.readFile(result.MDFilePath, { encoding: 'utf8' });
        return new SuccessModel(result.dataValues);
    }catch(ex){
        console.error(ex.message, ex.stack);
        return new ErrorModel(getSpecifiedBlogFailInfo);
    }
}

/**
 * 根据参数获批量取指定作者的博客列表
 * @param {number} userId
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getBlogList({ userId, pageNumber, pageSize }) {

    //查询数据库表
    try {
        const res = await getBatchBlogInfo({ userId, pageNumber, pageSize });
        console.log(res);
        const result = res.map((item) => {
            let labels = item.labels.map(labelItem => (
                labelItem.dataValues
            ));
            return {
                id: item.id,
                userId: item.userId,
                title: item.title,
                abstract: item.abstract,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                labels: labels
            }
        });
        return new SuccessModel(result);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(getBlogListFailInfo);
    }
}

/**
 * 统计指定用户的博客数量
 * @param {number} userId 指定用户的id
 */
async function countBlogById(userId) {
    try {
        const res = await countBlog({
            userId
        });
        return new SuccessModel({count:res});
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(countBlogFailInfo);
    }
}
module.exports = {
    insertBlog,
    deleteBlog,
    getSpecifiedBlog,
    getBlogList,
    updateBlog,
    countBlogById
}