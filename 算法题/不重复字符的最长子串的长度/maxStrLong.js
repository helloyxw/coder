
/**
 * 
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。


示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。


示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


示例 4:

输入: s = ""
输出: 0
 */
function maxLong(str) {
    if(str.length == 0) {
        return 0;
    }

    let left = 0;
    let right = 0;
    let max = 0;
    for (let i=0, len=str.length; i<len; i++) {
        left = i;
        right = left + 1;
        while(right < str.length) {
            let tempStr = str.slice(left, right);
            if (!isSingle(tempStr)) {
                break;
            }
            right++;
        }
        if (right - left - 1 > max) {
            max = right -left - 1;
        }
    }

    return max;
}

/**
 * 判断字符串中是否有相同字符，没有返回true， 有返回false
 */
function isSingle(str) {
    let set = new Set(str);
    return str.length == set.size;
}

let string = "abcabcbb";
console.log(maxLong(string));