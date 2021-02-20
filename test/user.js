/**
 * @description 登录http接口
 */
const server = require('./server');

 //用户信息
 const userName = `u_${Date.now()}`;
 const password = `p_${Date.now()}`;

 const testUser = {
     userName,
     password,
     nickName: userName,
     gender: 1
 }

 let COOKIE = '';

 //注册
 test('注册一个用户，应该成功', async() => {
     const res = await server
                        .post('/api/user')
                        .send(testUser)
    expect(res.body.errno).toBe(0);
 })

 //重复注册
 test('重复注册用户，应该失败', async() => {
    const res = await server
                       .post('/api/user')
                       .send(testUser)
   expect(res.body.errno).not.toBe(0);
})

// json schema检测
test('json schema检测，非法格式，注册应该失败', async() => {
    const res = await server
                       .post('/api/user')
                       .send({
                           userName: '123', //用户名不死字母开头
                           password: 'a',  //最小长度不是3
                           //nickName: '',
                           gender: 'mail' //不是数字
                       })
   expect(res.body.errno).not.toBe(0);
})

//登录
test('登录，应该成功', async() => {
    const res = await server
                    .post('/api/user/login')
                    .send({
                        userName,
                        password
                    });
    expect(res.body.errno).toBe(0);

    //获取cookie
    COOKIE = res.headers['set-cookie'].join(';');
})

//删除
test('删除用户，应该成功', async () => {
    const res = await server
    .delete('/api/user')
    .set('cookie', COOKIE);

    expect(res.body.errno).toBe(0);
})


