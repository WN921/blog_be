/**
 * @description user controller，包含业务逻辑和返回格式
 */

const { createLabelFailInfo, getLabelListFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const fs = require('fs/promises');
const path = require('path');
const { DIST_FOLDER_PATH } = require('../conf/constant');
const { createLabel, getBatchLabelInfo } = require('../services/label');
/**
 * 新增标签
 * @param {string} labelName 标签名
 * @param {string} color 标签颜色
 */
async function addLabel({ labelName, color }) {

    //这个函数没有业务逻辑
    //插入数据库表
    try {
        await createLabel({
            labelName,
            color,
        });
        return new SuccessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createLabelFailInfo);
    }

}

// /**
//  * 删除指定博客（包括文件和数据库记录）
//  * @param {number} id 博客id
//  * @param {string} MDFilePath 博客的MD文件存储地址
//  */
// async function deleteBlog(id, MDFilePath) {
//     //删除文件
//     try {
//         await fs.rm(MDFilePath);
//     }
//     catch (ex) {
//         console.error(ex.message, ex.stack);
//         return new ErrorModel(deleteBlogFailInfo);
//     }

//     const result = await destroyBlog(id);
//     if (result > 0) {
//         return new SuccessModel();
//     }
//     else {
//         return new ErrorModel(deleteBlogFailInfo);
//     }


// }


// /**
//  * 获取指定id的博客
//  * @param {number} id 博客id
//  */
// async function getSpecifiedBlog(id) {
//     const result = await getBlogInfo(id);
//     if (result) {
//         const content  = await fs.readFile(result.MDFilePath, { encoding: 'utf8' });
//         result.content = content;
//         return new SuccessModel(result);
//     }
//     else {
//         return new ErrorModel(getSpecifiedBlogFailInfo);
//     }
// }

/**
 * 根据参数获批量取指定作者的博客列表
 */
async function getLabelList() {

    //查询数据库表
    try {
        const res = await getBatchLabelInfo();
        console.log(res);
        const result = res.map((item) => (item.dataValues));
        return new SuccessModel(result);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(getLabelListFailInfo);
    }
}

/**
 * //为指定blog实例更新label
 * @param {Object} blog Blog模型的实例
 * @param {Array} labelList 由label的id组成的数组 
 */
async function updateLabelsFotBlog(blog, labelList) {
    //查询数据库表
    try {
        //删除现有labels
        const curlabels = await blog.getLabels();
        for(let label of curlabels){
            console.log(label);
            await blog.removeLabel(label);
        }

        //将labelList中新的标签加入
        labelList.sort();

        for(let label of labelList){
            await blog.addLabel(label);
        }
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(getLabelListFailInfo);
    }
}


module.exports = {
    addLabel,
    getLabelList,
    updateLabelsFotBlog
}