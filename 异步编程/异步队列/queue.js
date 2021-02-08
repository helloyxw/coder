const queue = () => {
    const list = [];
    let index = 0;
    let isStop= false;  // 停止

    const next = () => {
        if (index >= list.length -1 || isStop) return;

        const cur = list[++index];
        cur(next);
    }

    const add = (...fn) => {
        list.push(...fn);
    }

    const run = (...args) => {
        const cur = list[index];
        typeof cur === 'function' && cur(next);
    }

    const stop = () => {
        isStop = true;
    }

    const retry = () => {
        isStop = false;
        run();
    }

    const goOn = () => {
        isStop = false;
        next();
    }
    return {
        add,
        run,
        stop,
        retry,
        goOn,
    }
}

const async = (x) => {
    return (next) => {
        setTimeout(() => {
            console.log(x);
            next();
        }, 1000);
    }
}

// 暂停: 不继续调用next，队列就不会继续往下走

// const async = (x) => {
//     return (next) => {
//         setTimeout(() => {
//             if(x>3) {
//                 console.log(x);
//                 q.run();
//                 return;
//             }
//             console.log(x);
//             next();
//         }, 1000);
//     }
// }

const q = queue();
const funs = "123456".split("").map(x => async(x));
q.add(...funs);
q.run();

setTimeout(() => {
    q.stop();
}, 3000)

setTimeout(() => {
    q.goOn();
}, 5000)