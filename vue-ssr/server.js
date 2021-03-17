const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static");

const app = new Koa();
const router = new Router();

const Vue = require("vue");
const fs = require("fs");
const VueServerRender = require("vue-server-renderer");
const vm = new Vue({
    data() {
        return {msg: "hello worldd"}
    },
    template: "<div>{{msg}}</div>"
})
// 创建一个渲染器
const template = fs.readFileSync("./template.html", "utf8");
let render = VueServerRender.createRenderer({
    template // 模板里必须要有vue-ssr-outlet
});

router.get("/", async ctx => {
    ctx.body = await render.renderToString(vm);
})

app.use(router.routes());
app.listen(3001);