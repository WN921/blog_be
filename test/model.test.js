/**
 * @description uer model test
 * @author wn
 */

 const { TestScheduler } = require('jest');
const { User } = require('../src/db/model/index');

 test('User模型的属性符合预期', () => {
     //User.build方法创建的实例不会提交到数据库中
     const user = User.build({
         userName: 'zhangsan',
         password: 'p123123',
         nickName: '张三',
         //gender: 1,
         picture: '/xxx.jpg',
         city: '北京'
     });

     //验证各个属性
     expect(user.userName).toBe('zhangsan');
     expect(user.password).toBe('p123123');
     expect(user.nickName).toBe('张三');
     expect(user.gender).toBe(3);
     expect(user.picture).toBe('/xxx.jpg');
     expect(user.city).toBe('北京');
 })