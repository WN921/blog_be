/**
 * @description 博客增删改查http接口
 */


const server = require('./server');

//用户信息
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
let userId = null;
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}


//博客信息
const MDStr = '测试标题';
const title = '测试内容';
let BlogList = [];
let COOKIE = null;

//注册
test('注册一个用户，应该成功', async() => {
    const res = await server
                       .post('/api/user')
                       .send(testUser)
   expect(res.body.errno).toBe(0);
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
    userId = res.body.data.userId;
})

test('创建博客', async() => {
    const res = await server
                        .post('/api/blog')
                        .send({
                            MDStr,
                            title
                        })
                        .set('cookie', COOKIE);

    expect(res.body.errno).toBe(0);
})

test('获取博客列表', async() => {
    const res = await server
                        .get(`/api/blog?userId=${userId}&pageNumber=1&pageSize=10`)
                        .set('cookie', COOKIE);

    expect(res.body.errno).toBe(0);
    expect(res.body.data.length === 1);
    BlogList = res.body.data;
})

test('获取指定博客', async() => {
    const res = await server
                        .get(`/api/blog/${BlogList[0].id}`)
                        .set('cookie', COOKIE);

    expect(res.body.errno).toBe(0);
    expect(res.body.data.id).toBe(BlogList[0].id);
    expect(res.body.data.title).toBe(title);
    expect(res.body.data.content).toBe(MDStr);
})

test('删除指定博客', async() => {
    const res = await server
                        .delete(`/api/blog/${BlogList[0].id}`)
                        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

//删除
test('删除用户，应该成功', async () => {
    const res = await server
    .delete('/api/user')
    .set('cookie', COOKIE);

    expect(res.body.errno).toBe(0);
})