### Service Worker 特性

- 不能直接访问/操作Dom
    只能使用特点的api： Promise，Fetch API， Cache API。这些api在service worker上下文中是全局的。
- 需要时直接唤醒，不需要时自动休眠
- 离线缓存内容开发者可控
- 一旦被安装则永远存活，除非手动卸载
- 必须在HTTPS环境下工作（本地localhost环境除外）
- 广泛使用了Promise

### 如果浏览器不支持service worker，可以用App cache 降级