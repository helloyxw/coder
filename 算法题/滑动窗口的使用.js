var str;
let sum = 0;
main("abcd12345ed125ss123058789");
function main(str){
    let winWidth = str.length;
    let arr = str.split("");
    while(winWidth>0) {
        
        let returnStr = runWin(arr, winWidth)
        console.log(returnStr, "a");
        if (sum > 0) {
            console.log(returnStr);
        } else {
            winWidth--
        }
    }

};
function runWin(arr, width) {
    let result = [];
    for(let i=1; i<=arr.length-width; i++) {
        console.log(isNum(arr, i, width));
            if(isNum(arr, i, width)) {
                sum++;
                for(let j=i; j<=width; j++) {
                    result.push(arr[j]);
                }
            }
            
            
        }
    return result.join("") + "," + sum;
}
function isNum(arr, i, width) {
    let flag = true;
    for(let n=0,m=width; n<m; n++) {
        if(!(/^\d$/.test(Number(arr[i])))) {
            flag = false
        }
    }
    return flag;
}