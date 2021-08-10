//声明构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 声明属性，保存resolve和reject回调函数，用于异步调用
    // 因为允许多个then，所以用数组
    this.callbacks = [];

    const self = this; // self _this that
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态(promiseState)
        self.PromiseState = 'fulfilled';
        //2. 设置对象结果值(promiseResult)
        self.PromiseResult = data;

        // 调用成功的回调函数
        self.callbacks.forEach(function(item) {
            item.onResolved(data);
        })
    }
    function reject(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态(promiseState)
        self.PromiseState = 'rejected';
        //2. 设置对象结果值(promiseResult)
        self.PromiseResult = data;

        // 调用失败的回调函数
        self.callbacks.forEach(function(item) {
            item.onRejected(data);
        })
    }

    try {
        // 同步调用「执行器函数」
        executor(resolve, reject);
    } catch(e) {
        // 修改promise对象状态为[失败], 使用时throw "error" 需要捕获异常并改变promise的状态
        reject(e);
    }
    
}

//添加then方法
Promise.prototype.then = function(onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        // 调用回调函数
        if (this.PromiseState === 'fulfilled') {
            // try catch 捕获throw异常时改变状态
            try {
                // 获取回调函数的执行结果
                let result = onResolved(this.PromiseResult);

                if(result instanceof Promise) {
                    // 如果是Promise类型的对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    // 返回结果的状态为【成功】
                    resolve(result);
                }
            } catch(e) {
                reject(e);
            }
            
        }
        if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult);
        }

        // 判断 pending状态， 保存resolve和reject回调函数，以供异步调用
        if(this.PromiseState === 'pending') {
            // 保存回调函数
            this.callbacks.push({
                onResolved,
                onRejected
            });
        }
    })
}

Promise.all = function(promises) {
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
        // 存放promise成功数
        let count = 0;
        // 存放promise运行结果
        let arr = [];

        for(let i=0; i<promises.length; i++) {
            promises[i].then(v => {
                count++;
                // 将当前promise对象成功的结果存入数组，
                // 不能使用push，这会造成先执行完的promise先入数组
                arr[i] = v;
                // 判断
                if(count === promises.length) {
                    // 修改状态
                    resolve(arr);
                }
            }, r => {
                reject(r);
            })
        }
    })
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for(let i=0; i<promises.length; i++) {
            promises[i].then(v => {
                // 修改返回对象的状态为【成功】
                resolve(v);
            }, r => {
                // 修改返回对象的状态为【失败】
                reject(r);
            })
        }
    })
}