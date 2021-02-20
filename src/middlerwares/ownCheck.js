const { ownCheckFailInfo, lackURLParamsInfo } = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');
const { getBlogInfo } = require('../services/blog');

/**
 * 检查当前登录用户是否是指定博客的作者，是的话则提取指定博客的信息
 * @param {object} ctx 
 * @param {function} next 
 */
const ownCheck = async (ctx, next) => {
    if(ctx.params && ctx.params.blogId){
        const blogInfo = await getBlogInfo(Number(ctx.params.blogId));
        const userInfo = ctx.session.userInfo;
        if(blogInfo.userId === userInfo.id){
            ctx.blogInfo = blogInfo;
            await next();
        }
        else{
            return new ErrorModel(ownCheckFailInfo);
        }
    }
    else{
        return new ErrorModel(lackURLParamsInfo);
    }
};

module.exports = ownCheck;