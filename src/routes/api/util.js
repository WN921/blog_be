/**
 * @description 工具API
 * @author WN
 */

const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const loginCheck = require('../../middlerwares/loginCheck');
const { DIST_IMAGE_PATH } = require('../../conf/constant');
const { SuccessModel, ErrorModel } = require('../../model/ResModel');

router.post('/uploadfile', loginCheck, async (ctx, next) => {
    const { id, userName } = ctx.session.userInfo;
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = `/${userName}/${Date.now()}_${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(DIST_IMAGE_PATH + filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = new SuccessModel({path: filePath});
  });

  module.exports = router;