/**
 * @description user controller，包含业务逻辑和返回格式
 */
const { getUserInfo, createUser, deleteUser } = require('../services/user');
const { registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const doCrypto = require('../utils/cryp');
const fs = require('fs').promises;
const path = require('path');
const { DIST_FOLDER_PATH, DIST_IMAGE_PATH } = require('../conf/constant');

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    //业务逻辑处理（无）
    //调用services获取数据
    //统一返回格式
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        //存在
        return new SuccessModel(userInfo);
    }
    else {
        //不存在
        return new ErrorModel(registerUserNameNotExistInfo);
    }
}

/**
* 注册
* @param {string} userName 用户名
* @param {string} password 密码
* @param {number} gender 性别（1 男， 2 女， 3 保密）
*/
async function insertUser({ userName, password, gender = 3}) {
    const userInfo = await getUserInfo(userName);
    //用户名是否存在
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo);
    }
    //注册service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        });

        const userPath = path.join(DIST_FOLDER_PATH, String(userName));
        try {
            await fs.access(userPath);
        }
        catch (e) {
            fs.mkdir(userPath);
        }

        const userImagePath = path.join(DIST_IMAGE_PATH, String(userName));
        try {
            await fs.access(userImagePath);
        }
        catch (e) {
            fs.mkdir(userImagePath);
        }

        return new SuccessModel(userInfo);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo);
    }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    //登录成功 ctx.session.userInfo = xxx来设置session，同时中间件会自动设置cookie
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        //登录失败
        return new ErrorModel(loginFailInfo);
    }

    //登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel({userId: userInfo.id});
}

async function delteCurUser(userName) {
    //service
    const result = await deleteUser(userName);
    if (result) {
        //成功
        const userPath = path.join(DIST_FOLDER_PATH, String(userName));
        try {
            await fs.access(userPath);
            await fs.rmdir(userPath, { recursive: true })
        }
        catch (e) {
            console.log('删除用户文件夹出错')
        }
        return new SuccessModel();

    }
    else {
        //失败
        return new ErrorModel(deleteUserFailInfo);
    }
}


module.exports = {
    insertUser,
    isExist,
    login,
    delteCurUser
}