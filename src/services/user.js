/**
 * @description user service
 */

const { User } = require('../db/model/index');

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password){
    //查询条件
    const whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt, { password });
    }

    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if(result == null){
        //未找到
        return result;
    }
    //统一返回数据
    return result.dataValues;
}

/**
 * 创建用户
 * @param {stirng} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男， 2 女， 3 保密）
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}){
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues;
}

/**
 * 
 * @param {string} userName 删除指定用户
 */
async function deleteUser(userName){
    const result = await User.destroy({
        where: {
            userName
        }
    });

    //result是删除行数
    return result > 0;
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}