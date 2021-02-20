/**
 * @description blog service
 */

const { Blog, Label } = require('../db/model/index');


/**
 * 创建博客
 * @param {number} userId 写作博客的用户的Id
 * @param {String} title 博客标题
 * @param {string} MDFilePath MD文件的本机路径
 */
async function createBlog({ userId, title, MDFilePath, abstract }) {
    const result = await Blog.create({
        userId,
        title,
        MDFilePath,
        abstract
    })
    return result;
}

/**
 * 更新指定id的博客
 * @param {number} blogId 
 * @param {string} title
 * @param {string} MDFilePath
 * @param {string} abstract
 */
async function upBlog({ blogId, title, MDFilePath, abstract }) {
    const result = await Blog.update({
        title,
        MDFilePath,
        abstract
    }, {
        where: {
            id: blogId
        }
    });
    return result;
}
/**
 * 根据博客id，查找并返回博客的相关信息/model 实例
 * @param {number} id 博客id
 */
async function getBlogInfo(id) {
    const whereOpt = { id };
    const result = await Blog.findOne({
        where: whereOpt,
        include: Label
    })
    return result;
}

/**
 * 在数据库中删除指定博客的记录
 * @param {number} id 博客id
 */
async function destroyBlog(id) {
    const whereOpt = { id };
    const result = await Blog.destroy({
        where: whereOpt
    })
    return result;
}

/**
 * 根据参数，批量获取博客
 * @param {number} userId
 * @param {number} pageNumber
 * @param {number} pageSize 
 */
async function getBatchBlogInfo({ userId, pageNumber, pageSize }) {
    const whereOpt = { userId };
    let result;
    if (pageNumber && pageSize) {
        result = await Blog.findAll({
            where: whereOpt,
            order: [['id', 'DESC']],
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            include: Label
        })
    }
    else{
        result = await Blog.findAll({
            where: whereOpt,
            order: [['id', 'DESC']],
            include: Label
        })
    }
    return result;
}

/**
 * 根据条件计算博客数量
 * @param {number} userId 指定的用户id
 */
async function countBlog({ userId }) {
    const whereOpt = {
        userId
    };
    const result = await Blog.count({
        where: whereOpt
    });
    return result;
}

module.exports = {
    createBlog,
    getBlogInfo,
    destroyBlog,
    getBatchBlogInfo,
    upBlog,
    countBlog
}