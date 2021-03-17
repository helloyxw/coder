/**
 * 1. 字符串a中插入一个字符后得到字符串b， a和b有对应关系
 * 2. a和b有对应关系，b和c有对应关系。a->b->c 构成一个链条 长度为3
 * 3. 计算数组中最长的链条长度。
 */

/**
 *  计算数组中形成环的长度
 *  
 */

 function linkedLong(array) {
    // 按照字符长度升序排序
    let temp = sortArr(array);
    // 环的长度
    let sum = 0;
    // 环的最大长度
    let max = 0;
    for(let i=0, len=temp.length; i<len-1; i++) {
        if(isLinked(temp[i], temp[i+1])) {
            max = ++sum;
            console.log(max);
        } else {
            max = Math.max(sum, max);
            sum = 0;
        }
    }
    return max;
}

/**
 * 
 * @param {*} array 
 * 按字符长度升序排序
 */
function sortArr(array) {
    let newArr = array.sort((a, b) => {
        return a.length - b.length;
    })
    return newArr;
}

/**
 * 判断两个字符串是否有对应关系
 */
function isLinked(one,two) {
    let oneArr = one.split("");
    let twoArr = two.split("");
    if((oneArr.length+1) !== twoArr.length) {
        return false;
    }

    for(let i=0, len=twoArr.length; i<len; i++) {
        
        let temp = twoArr.slice();
        temp.splice(i,1); 
        if(oneArr.join("") == temp.join("")) {
            return true;
        }
    }

    return false;

}

console.log(linkedLong(["acb", "ab", "acbuud"]))