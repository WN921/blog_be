/**
 * @description 失败状态集合，包括errno和message
 */

module.exports = {
    //10001-10010为用户账号相关错误信息
    //注册失败，较模糊
    registerFailInfo: {
        errno: 10001,
        message: '注册失败，请重试'
    },
    //用户名已存在
    registerUserNameExistInfo: {
        errno: 10002,
        message: '用户名已存在'
    },
    //用户名不存在
    loginNameNotExistInfo: {
        errno: 10003,
        message: '用户名不存在'
    },
    //登录失败，较模糊
    loginFailInfo:{
        errno: 10004,
        message: '登录失败，用户名或密码错误'
    },
    //未登录
    loginCheckFailInfo:{
        errno: 10005,
        message:'您尚未登录'
    },
    //修改密码失败
    chanegPasswordFailInfo: {
        errno: 10006,
        message: '修改密码失败，请重试'
    },
    //不是指定博客的作者
    ownCheckFailInfo:{
        errno: 10007,
        message: '当前登录用户不是指定博客的作者'
    },
    //调用接口时没有传入所需的URL参数
    lackURLParamsInfo: {
        errno: 10008,
        message: "缺少需要的URL参数"
    },
    //删除用户失败
    deleteUserFailInfo: {
        errno: 10010,
        message: '删除用户失败'
    },

    //创建博客失败
    createBlogFailInfo: {
        errno: 10011,
        message: '创建博客失败'
    },
    //删除博客失败
    deleteBlogFailInfo:{
        errno: 10012,
        message: '删除博客失败'
    },
    //获取指定博客失败
    getSpecifiedBlogFailInfo: {
        errno: 10013,
        message: '获取指定博客失败'
    },
    //获取博客列表失败
    getBlogListFailInfo: {
        errno: 10014,
        message: '批量获取博客列表失败'
    },

    //创建标签失败
    createLabelFailInfo: {
        errno: 10015,
        message: '创建标签失败'
    },

    //获取标签列表失败
    getLabelListFailInfo: {
        errno: 10016,
        message: '获取标签列表失败'
    },
    countBlogFailInfo:{
        errno: 10017,
        message: '统计指定用户的博客数量出错'
    }
}