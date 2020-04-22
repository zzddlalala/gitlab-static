const Koa = require('koa');
const Logger = require('koa-logger');

const body = require('koa-body');
const app = new Koa();
const router = require('./server/router');
app.use(body());
app.use(Logger());
app.use(router);



app.on('error', function (err) {
    console.log('==> error ', err);
});

const port = process.env.PORT || 5000;
console.log('==> server listen at ', port)
app.listen(port)