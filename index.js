import Koa from 'koa';
import Router from 'koa-router';
import storage from 'node-persist';
import path from 'path';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import ip from 'ip'
import dotenv from 'dotenv';

dotenv.config();
const __dirname = path.resolve();
const port = process.env.HOST_PORT || 3000

await storage.init()
const router = new Router();

router.post('/token', async (ctx, next) => {
    await storage.setItem('token', ctx.request.body.token);
    ctx.response.status = 200;
});

router.get('/token', async (ctx, _) => {
    const userToken = await storage.getItem('token');
    const devToken = process.env.DEV_TOKEN;
    const hostUrl = `http://${ip.address()}:${port}/login.html`
    ctx.body = {userToken, devToken, hostUrl};
});

const app = new Koa();
app.use(cors())
    .use(serve(__dirname + '/public'))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port);