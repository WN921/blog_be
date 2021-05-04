/**
 * @description blog service
 */

const { Label } = require('../db/model/index');

/**
 * 创建博客
 * @param {String} labelName label名
 * @param {string} color label颜色
 */
async function createLabel({ labelName, color}) {
    const result = await Label.create({
        labelName,
        color
    })
    return result.dataValues;
}



/**
 * 在数据库中删除指定博客的记录
 * @param {number} id 博客id
 */
async function destroyLabel(id){
    const whereOpt = { id };
    const result = await Label.destroy({
        where: whereOpt
    })
    return result;
}

/**
 * 批量获取标签
 */
async function getBatchLabelInfo(){
    const result = await Label.findAll()
    if (result == null) {
        //未找到
        return result;
    }
    //统一返回数据
    return result;
    
}

module.exports = {
    createLabel,
    getBatchLabelInfo,
    destroyLabel
}