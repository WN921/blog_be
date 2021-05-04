/**
 * @description label相关api，这里只转发
 * @author WN
 */

const router = require('koa-router')();

const { addLabel, deleteLabel, getLabelList } = require('../../controller/label');
const loginCheck = require('../../middlerwares/loginCheck');
router.prefix('/api/label');

//增加label
router.post('/', async (ctx, next) => {
    const { labelName, color } = ctx.request.body;
    ctx.body = await addLabel({ labelName, color });
})

//删除博客
router.delete('/:labelId', loginCheck, async (ctx, next) => {
    const id = ctx.params.labelId;
    ctx.body = await deleteLabel(id);
})

//获取现存的所有
router.get('/', async (ctx, next) => {
    ctx.body = await getLabelList();
})



module.exports = router;