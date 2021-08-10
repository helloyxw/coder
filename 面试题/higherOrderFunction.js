/**
 * 实现f(1)(2)(3)()的无限累加函数
 */
function f() {
    var args = [...arguments];
    var result;
    return function() {
        if (arguments.length > 0) {
            args = args.concat([...arguments]);
            return arguments.callee;
        } else {
            result = args.reduce((total, cur) => {
                return total + cur;
            })
            return result;
        }
    }
}

// console.log(f(1)(2)(3)());

/**
 * 实现f2(1)(2)(3)的无限累加函数
 */

function f2(a) {
    function sum(b) {
        a = a + b;
        return sum;
    }
    sum.toString = function() {
        return a
    }

    return sum;
}

// f2(1);
// f2(1)(2);
// f2(1)(2)(3);


/**
 * 数组扁平化并去重, 且按升序排序
 */
function delayArr(arr) {
    // 扁平化:  es6: arr.flat(Infinity)
    function delay(arr) {
        let tempArr = [];
        arr.forEach(function(item, i) {
            if(Array.isArray(item)) {
                tempArr = tempArr.concat(delay(item))
            } else {
                tempArr.push(item)
            }
        })
        return tempArr;
    }

    // 去重
    function single(arr) {
        return [...new Set(arr)]
    }

    // 升序
    function sort(arr) {
        return arr.sort((a,b) => { return a-b })
    }

    let delayArr = delay(arr);
    let singleArr = single(delayArr);
    let sortArr = sort(singleArr);

    return sortArr;
}
//  测试
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// console.log(delayArr(arr));

var consecutiveNumbersSum = function(N) {
    var total = 1;
    for(var long=2;long<N;long++) {
        console.log(long, sum(long-1), (N-sum(long-1)) % long);
        if (N-sum(long-1) > 0 && (N-sum(long-1)) % long === 0) {
            total++
        }
    }
    return total;
}
function sum(num) {
    return (num+1) * num/2;
}
// console.log(consecutiveNumbersSum(9));

// 数组扁平化的另外递归方法
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        console.log(...arr);
        arr =[].concat(...arr)
        console.log(arr,'arr');
    }
    return arr
}
// console.log(flatten([1,2,[3,4]]));


