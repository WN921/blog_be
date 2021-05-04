/**
 * @description user controller，包含业务逻辑和返回格式
 */

const { createLabelFailInfo, getLabelListFailInfo, deleteLabelFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const fs = require('fs/promises');
const path = require('path');
const { DIST_FOLDER_PATH } = require('../conf/constant');
const { createLabel, getBatchLabelInfo, destroyLabel } = require('../services/label');
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

/**
 * 删除指定标签
 * @param {number} labelId 
 */
async function deleteLabel(labelId) {
    try {
        let cols = await destroyLabel(labelId);
        if(cols < 1){
            throw TypeError('删除行数少于1');
        }
        return new SuccessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(deleteLabelFailInfo);
    }
}

/**
 * 批量获取标签列表
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
        //删除指定博客现有labels
        const curlabels = await blog.getLabels();
        for (let label of curlabels) {
            console.log(label);
            await blog.removeLabel(label);
        }

        //将labelList中新的标签加入
        labelList.sort();

        for (let label of labelList) {
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
    updateLabelsFotBlog,
    deleteLabel
}