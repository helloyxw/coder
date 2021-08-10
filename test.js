
function core(a, b, c) {
    console.log("核心功能,不能修改, 只能再次封装", a,b,c)
}

// 每个类都有一个原型， 所有实例都有一个属性__proto__
Function.prototype.before = function(beforeFn) {

    return (...args) => {  //  箭头函数没有this,arguments 和 prototype
        beforeFn();
        this(...args);     // this 就是调用者core
    }
}

let newFn = core.before(() => {
    console.log("core before");
})

newFn(1,2,3);