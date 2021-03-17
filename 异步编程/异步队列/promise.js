// 一个任务分为多个步骤完成，每个步骤都是异步的且依赖上一个不骤的结果 （https://juejin.cn/post/6844903740667854861#heading-4）

function myPromise(n) {
    return new Promise(resolve => {
        console.log(n);
        setTimeout(() => resolve(n+1), n);
    })
}

function step1(n) {
    return myPromise(n);
}
function step2(n) {
    return myPromise(n);
}
function step3(n) {
    return myPromise(n);
}

// 如果用Promise实现
step1(1000)
.then(a=> step2(a))
.then(b => step3(b))
.then(result => {
    console.log(result);
})

// 如果用async/await来实现
async function myResult() {
    const a = await step1(1000);
    const b = await step2(a);
    const result = await step3(b);
    return result;
}

myResult().then(result => {
    console.log(result);
}).catch(err => {
    // 如果myResult内部有语法错误会触发catch方法
})