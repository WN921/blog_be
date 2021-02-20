/**
* @description 检查是否已经登录中间件
* @author wn
*/

const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');

/**
 * API 登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next){
    if(ctx.session && ctx.session.userInfo){
        //已登录
        await next();
        return;
    }
    //未登录
    ctx.body = new ErrorModel(loginCheckFailInfo);
}

module.exports = loginCheck;