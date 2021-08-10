/**
 * 没有考虑循环引用问题
 * @param {*} obj 
 * @returns 
 */
function deepCopy(obj) {
    let temp = Array.isArray(obj) ? [] : {};
    for(let item in obj) {
        if (typeof obj[item] == "object" ) {
            temp[item] = deepCopy(obj[item])
        } 
        else {
            temp[item] = obj[item];
        }
    }

    return temp;
}

var json = {
    "a": 1,
    "b": 2,
    "c": {
        "d": 3
    },
    "d": [1,2]
}

// console.log(deepCopy(json));

//

/**
 * 
 * @param {*} json 
 * @returns 
 */
function deepCopy2(json) {
    let str = JSON.stringify(json);
    let result = JSON.parse(str);
     
    return result;
}


function isObject(obj) {
    return typeof obj == "object" && obj !== null;

}
function cloneDeep3(source, hash = new WeakMap()) {
    
    if (!isObject(source)) return source; 
    if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表
      
    var target = Array.isArray(source) ? [] : {};
    hash.set(source, target); // 新增代码，哈希表设值
    
    for(var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                console.log(hash, "aa");
                target[key] = cloneDeep3(source[key], hash); // 新增代码，传入哈希表
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// let a = {
//     name: "muyiy",
//     book: {
//         title: "You Don't Know JS",
//         price: "45"
//     },
//     a1: undefined,
//     a2: null,
//     a3: 123
// }
// a.circle = a;

// var b = cloneDeep3(a)
// console.log(b);


function deepClone( originObj, map = new WeakMap() ) {
    if(!originObj || typeof originObj !== 'object') return originObj;  //空或者非对象则返回本身
 
    //如果这个对象已经被记录则直接返回
    if( map.get(originObj) ) {
        return  map.get(originObj);
    }
    //这个对象还没有被记录，将其引用记录在map中，进行拷贝    
    let result = Array.isArray(originObj) ? [] : {};  //拷贝结果
    map.set(originObj, result); //记录引用关系
    console.log(map.get(originObj), "map");
    let keys = Object.keys(originObj); //originObj的全部key集合
    //拷贝
    for(let i =0,len=keys.length; i<len; i++) {
        let key = keys[i];
        let temp = originObj[key];
        result[key] = deepClone(temp, map);
    }
    return result;
}


let a = [1, 2];
let b = [4, 5, 6, a];
a.push(b);
let c = deepClone(a);
 
a.push(200);
b.push(10);
console.log(a); //[ 1, 2, [ 4, 5, 6, [Circular], 10 ], 200 ]
console.log(b); //[ 4, 5, 6, [ 1, 2, [Circular], 200 ], 10 ]

