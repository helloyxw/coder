// 利用async await实现
async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = [];
    const executing = [];

    for(let item of array) {
        var p = Promise.resolve().then(() => iteratorFn(item, array))
        ret.push(p);

        var e = p.then(() => {
            executing.splice(executing.indexOf(e), 1)
        })
        executing.push(e);
        if(executing.length >= poolLimit) {
            await Promise.race(executing)
        }
    }

    return Promise.all(ret);
}

const timeout = (i) => new Promise((resolve) => setTimeout(()=>{
    console.log(i);
    resolve(i);
}, i));
const results = asyncPool(2, [1000, 5000, 3000, 2000], timeout)
console.log(results);