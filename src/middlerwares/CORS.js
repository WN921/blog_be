const CORS = async (ctx, next) => {
  const URLs = [
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
    'http://1.15.125.162',
    'http://1.15.125.162:80',
    'http://1.15.125.162:3000',
    'http://1.15.125.162:3090',
    'http://localhost:3000',
    'http://www.nangua3.top',
    'http://nangua3.top',
    'http://admin.nangua3.top',

  ]
  for (let i = 0; i < URLs.length; i++) {
    if (ctx.req.headers.origin == URLs[i]) {
      ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin);
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
      ctx.set('Access-Control-Allow-Credentials', 'true');
      break;
    }
  }
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
}

module.exports = CORS;