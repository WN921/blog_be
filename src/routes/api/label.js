/**
 * @description label相关api，这里只转发
 * @author WN
 */

const router = require('koa-router')();

const { addLabel, getLabelList } = require('../../controller/label');
router.prefix('/api/label');

//增加博客
router.post('/', async (ctx, next) => {
    const { labelName, color } = ctx.request.body;
    ctx.body = await addLabel({ labelName, color });
})

// //删除博客
// router.delete('/:blogId', loginCheck, ownCheck, async (ctx, next) => {
//     const { MDFilePath } = ctx.blogInfo;
//     const id = ctx.params.blogId;
//     ctx.body = await deleteBlog(id, MDFilePath);
// })

// //根据参数获取指定博客的详情
// router.get('/:blogId', async (ctx, next) => {
//     const id = Number(ctx.params.blogId);
//     ctx.body = await getSpecifiedBlog(id);
// })

//根据参数批量获取博客
router.get('/', async (ctx, next) => {
    ctx.body = await getLabelList();
})



module.exports = router;