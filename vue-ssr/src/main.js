import Vue from "vue";
import App from "./App";

// 入口文件 需要提供vue的实例
// 使用函数： 如果是服务端渲染，每个人都需要有一个自己的
export default () => {
    const app = new Vue({
        render: h=> h(App)
    });
    return {app};
}
