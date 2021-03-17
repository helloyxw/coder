if ('serviceWorker' in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/static/sw-demo.js", {scope: '/static/'})
            .then(function (registration) {
                // console.log(registration.scope)
            })
            .catch(function (error) {

            });
    })
}

/**
 * 不能“越域”：
 *    正确：
 *     url              scope
 *   /static/sw.js      /static/
 *   /static/sw.js      /static/child/
 * 
 *    错误：   
 *     url               scope
 *   /static/sw.js       https://other.com/
 *   /static/sw.js        /
 *   /static/sw.js        /assets
 * 
 * 例外：
 *    /static/sw.js                                /sw-register.js
 *    
 *   HTTP/1.1                                      /static/sw.js    {scope: "/"}   这是真确的。
 *   200 OK
 *   content-type: text/javascript
 *   service-worker-allowed: /
 * 
 * 
 * 同域下允许注册多个不同scope的service worker
 */