

// console.time可以测试出一段程序执行的时间
// console.profile() 在火狐浏览器中安装FireBug，可以更精准的获取到当前程序每一个步骤所消耗的时间
console.time("A");
for (let i=0; i<1000000; i++) {

}
console.timeEnd("A")


// 实现 (5).add(3).minus(2) === 6

void function() {
    function check(n) {
        n = Number(n);
        return isNaN(n) ? 0 : n;
    }
    function add(n) {
        n = check(n);
        return this + n;
    }
    function minus(n) {
        n = check(n);
        return this - n;
    }

    ["add", "minus"].forEach(item => {
        Number.prototype[item] = eval(item)
    })
}()

console.log((5).add(3).minus(2));

/**
 * 箭头函数与普通函数的区别？ 构造函数（function）可以通过使用new生成实例，那么箭头函数可以吗？ 为什么？
    
    区别：
    1. 箭头函数语法上比普通函数简洁
    2. 箭头函数没有自己的this，它的this是继承函数上下文中的this（使用call/apply等任何方式都无法改变this的指向）
    3. 箭头函数中没有arguments（类数组), 只能基于...arg获取传递的参数集合（数组）
    4. 箭头函数不能被new执行（因为： 箭头函数没有this也没有prototype）

 */


let arr = [10, 20, 30, "AA", 40];
let obj = {};

(function () {
    Array.prototype.each = function(fn, obj) {
        var arr = [];
        for (let i=0; i<this.length; i++) {
            var index = i;
            var item = this[i]
            var result = fn(this[i], i);

            if (result === false) {
                arr = arr.concat(this.slice(i, this.length));
                break;
            } else {
                arr[index] = result;
            }
        } 
        return arr;
    }
})()

var newarr = arr.each(function(item, index){
    if (isNaN(item)) {
        return false;
    }
    return item * 10;
});
console.log(newarr);