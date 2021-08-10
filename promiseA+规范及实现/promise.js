(
    function(window) {

        function Promise(executer) {
            var self = this;
            self.state = "pending";
            self.data = undefined;
            self.callbacks = [];
            
            function resolve() {

            }
            function reject() {

            }
            executer(resolve, reject)
        }
        window.Promise = Promise;
    }
)(window)


Promise.prototype.then = function(onResolved, onRejected) {
    var self = this;
    if(self.status === "pending") {
        // promise当前状态还是pending状态，将回调函数保存起来
        self.callbacks.push({
            onResolved(){ onResolved(self.data)},
            onRejected(){ onRejected(self.data)}
        })
    } else if(self.status === "resolved") {
        setTimeout(()=> {
            try{
                const result = onResolved(self.data);
                if(result instanceof Promise) {
                    // 2.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
                    result.then(
                        value => {resolve(value)},
                        reason => {reject(reason)}
                    )
                } else {
                    // 1. 如果回调函数返回的不是promise，return的promise的状态是resolved，value就是返回的值。
                    resolve(result)
                }
            } catch(e) {
                // 3.如果执行onResolved的时候抛出错误，则返回的promise的状态为rejected 
                reject(e)
            }
            
        })
    } else {
        setTimeout(()=> {
            try{
                const result = onRejected(self.data)
                
            }
            
        })
    }
}

Promise.prototype.catch = function(onRejected) {

}
Promise.resolve = function() {}
Promise.reject = function() {}
Promise.all = function() {}
Promise.race = function() {}