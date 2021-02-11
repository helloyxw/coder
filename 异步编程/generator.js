
/*
每个迭代器之间是相互独立，作用域独立
*/

// function* fn() {
//     var _n = 1;
//     yield ++_n;
//     yield ++_n;
//     yield ++_n;
// }
// // 声明两个迭代器
// var aa = fn();
// var bb = fn();

// console.log(aa.next());
// console.log(aa.next());
// console.log(bb.next());
// console.log(aa.next());

/**
 * 
 * next()方法可以接受参数
 * 传入的参数其实是把上一个yield语句返回的值给覆盖掉；
 * 第一个next()方法其实是启动器。在它之前没有yield语句，所以给第一个next()
 * 方法传参是没有意义的。
 * 
 * generator函数的用途：可以通过next方法，去分阶段的注入数据，
 * 让函数分阶段的给出不同的返回值。
 */

//  function* fn1() {
//      var _n = 1;
//      var _v = yield _n + 22;
//      console.log("aa: " + _v);
//      yield ++_n;
//      yield ++_n;
//  }

//  var _fn = fn1();

 /*
   第一个next返回的是23， 
   到这个yield的时候，还没有运行到给_v赋值的阶段，
   因为到了第一个yield就停了。
  */
//  _fn.next();

 /*
 第二个next传入的参数，其实是把上一个yield语句的返回值给覆盖了， 
 上一个yield语句的值是， yield = _n + 22;
 然后传入“abc”, 那么上一个yield语句的值就变成了 yield = "abc";
 然后赋值给了_v, 接着执行console.log("aa: " + _v), 是 aa: "abc",
 然后遇到下一个yield就停了（后面的表达式也有执行）
  */
//  _fn.next("abc");

 /*
  传入的参数是把上一个yield语句的返回值覆盖了，但是并没有修改之前声明的变量的_n的值；
 */

//  _fn.next();


// function * gen(x) {
//     const y = yield x + 1;
//     console.log(y, "here");
//     // return y;
// }

// const g = gen(1);
// const value = g.next().value;

// console.log(value);
// console.log(g.next(value + 10));


/**
 * generator函数支持for of循环，用来迭代generator函数的执行时生成的迭代对象。
 */

 function* fn2() {
     yield "a";
     yield "b";
     yield "c";
     return "d end..";
 }

 var _fn2 = fn2();
 for(var i of _fn2) {
     console.log(i);
 }