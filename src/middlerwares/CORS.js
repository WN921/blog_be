const CORS = async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  }

  module.exports = CORS;