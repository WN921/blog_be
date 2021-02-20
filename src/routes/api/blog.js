/**
 * @description blog相关api，这里只进行格式校验（scheme，待添加）和转发
 * @author WN
 */

const router = require('koa-router')();

const { isTest } = require('../../utils/env');
const loginCheck = require('../../middlerwares/loginCheck');
const ownCheck = require('../../middlerwares/ownCheck');
const { insertBlog, deleteBlog, getSpecifiedBlog, getBlogList, updateBlog, countBlogById} = require('../../controller/blog');
router.prefix('/api/blog');

//增加博客
router.post('/', loginCheck, async (ctx, next) => {
    const { MDStr, title, abstract, labelList } = ctx.request.body;
    const { id, userName } = ctx.session.userInfo;
    ctx.body = await insertBlog({ userId: id, userName, title, MDStr, abstract, labelList });
})

//修改指定博客
router.patch('/', loginCheck, async (ctx, next) => {
    const { blogId, MDStr, MDFilePath, title, abstract, labelList } = ctx.request.body;
    const { id, userName } = ctx.session.userInfo;
    ctx.body = await updateBlog({
        blogId, userId:id, userName, MDStr, MDFilePath, title, abstract, labelList
    });
})

//删除博客
router.delete('/:blogId', loginCheck, ownCheck, async (ctx, next) => {
    const { MDFilePath } = ctx.blogInfo;
    const id = ctx.params.blogId;
    ctx.body = await deleteBlog(id, MDFilePath);
})

//根据参数获取指定博客的详情
router.get('/:blogId', async (ctx, next) => {
    const id = Number(ctx.params.blogId);
    ctx.body = await getSpecifiedBlog(id);
})

//根据参数,批量获取指定用户的博客
router.get('/', async (ctx, next) => {
    const { userId, pageNumber, pageSize } = ctx.query;
    ctx.body = await getBlogList({
        userId: Number(userId),
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize)
    });
})

//获取指定用户的博客数量
router.get('/count/id', async (ctx, next) => {
    const { userId } = ctx.query;
    ctx.body = await countBlogById(Number(userId));
})




module.exports = router;