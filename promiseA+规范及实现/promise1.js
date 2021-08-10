'use strict'

var asyncCall = function(fn) { setTimeout(fn, 0)};


function resolve(promise, x) {
    if(promise == x) {
        return promise.reject(new TypeError("The promise and its value refer to the same object"))
    }

    if (x && (typeof x === "function" || typeof x === "object")) {
        var called = false;
        var then;

        try {
            then = x.then;

            if(typeof then === "function") {
                then.call(x, function(y) {
                    if(!called) {
                        called = true;
                        resolve(promise, y);
                    }
                }, function(r) {
                    if(!called) {
                        called = true;
                        promise.reject(r);
                    }
                })
            } else {
                promise.fulfill(x);
            }
        } catch (error) {
            if(!called) {
                called = true;
                promise.reject(e);
            }
        }
    } else {
        promise.fulfill(x)
    }
}

function myPromise() {
    var _state = 0;
    var _value;
    var _onFullfills = [];
    var _onRejects = [];

    this.done = function(onFullfilled, onRejected) {
        if(_state === 0) {
            _onFullfills.push(onFullfilled);
            _onRejects.push(onRejected);
        } else {
            asyncCall(function() {
                if(_state === 1) {
                    if(typeof onFullfilled === "function") {
                        onFullfilled(_value);
                    }
                } else if(typeof onRejected === "function"){
                    onRejected(_value);
                }
            });
        }
    };
    this.fulfill = function(value) {
        _complete(1, value);
    }
    this.reject = function(value) {
        _complete(2, value);
    }

    function _complete(state, value) {
        if(!_state) {
            _state = state;
            _value = value;

            asyncCall(function() {
                var handlers = state == 1 ? _onFullfills : _onRejects;
                handlers.forEach(function(fn) {
                    if(typeof fn === "function") {
                        fn(value);
                    }
                });

                _onFullfills = null;
                _onRejects = null;
            })
        }
    }
}

myPromise.prototype = {
    constructor: myPromise,
    catch: function(onRejected) {
        this.then(null, onRejected);
    },
    then: function(onFullfilled, onRejected) {

        var mypromise = new myPromise();

        this.done(function(x) {
            if(typeof onFullfilled === "function") {
                try {
                    resolve(mypromise, onFullfilled(x));
                } catch (error) {
                    mypromise.reject(error);
                }
            } else {
                mypromise.fulfill(x);
            }
        }, function(x) {
            if(typeof onRejected  === "function") {
                try {
                    resolve(mypromise, onRejected(x));
                } catch (error) {
                    mypromise.reject(error);
                }
            } else {
                mypromise.reject(x);
            }
        });
        return mypromise;
    }
}