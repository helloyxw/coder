/**
 * 括号序列
限定语言：Kotlin、Typescript、Python、C++、Groovy、Rust、Java、Go、Scala、Javascript、Ruby、Swift、Php、Python 3
给出一个仅包含字符'(',')','{','}','['和']',的字符串，判断给出的字符串是否是合法的括号序列
括号必须以正确的顺序关闭，"()"和"()[]{}"都是合法的括号序列，但"(]"和"([)]"不合法。
示例1
输入
"["
输出
false
示例2
输入
"[]"
输出
true
 */

function isValid(s) {
    if ((typeof s) != "string") {
        return;
    }

    let arr = s.split("");

    let result = del(arr);
    if (result.length == 0) {
        return true;
    } else {
        return false
    }
}

// 删除arr中合法的括号对,返回删除后的数组
function del(arr) {
    let tempArr = [];
    
    for(let i=0, len= arr.length; i<len; i++) {
        if (isRight(arr[i], i, arr)) {
            arr.splice(i,2);
            del(arr);
            break;
        }
    }
    return arr;
}
// 判断下一个字符是否是闭合括号, 如果是返回true，如果不是返回false
function isRight(left, i , arr) {
    if(i == arr.length -1) {
        return false;
    }
    switch(left) {
        case "(": 
            if(arr[i+1] == ")") {
                return true;
            } else {
                return false;
            }
            break;
        case "[": 
            if(arr[i+1] == "]") {
                return true;
            } else {
                return false;
            }
            break;
        case "{": 
            if(arr[i+1] == "}") {
                return true;
            } else {
                return false;
            }
            break;
        default: 
            console.log("不是合法括号");
    }
    
}

