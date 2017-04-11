# promise #
ES6 原生提供了 Promise 对象。

所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。

在控制台输入：
> console.dir(Promise)

[dem01](https://stephenhyy.github.io/demo/promise/demo1.html)
可以看出本身有all，race，reject，resolve方法，原型上又有catch和then方法，故new出的实例肯定有这些方法。

Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

----------

	var promise = new Promise(function (resolve, reject) {
	    if (/* 异步操作成功 */) {
	        resolve(data);
	    } else {
	        /* 异步操作失败 */
	        reject(error);
	    }
	});

----------

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。即如果你错过了它，再去监听，是得不到结果的。[dem02](https://stephenhyy.github.io/demo/promise/demo2.html)

# 基本API #

## .then() ##
> 语法：Promise.prototype.then(onFulfilled, onRejected)

当promise的实例执行resolve时，会执行then中的第一个方法，相反执行reject时会执行then中的第二个方法 [dem03](https://stephenhyy.github.io/demo/promise/demo3.html)

## .catch() ##
> 语法：Promise.prototype.catch(onRejected)

该方法是 .then(undefined, onRejected)的别名，用于指定发生错误时的回调函数。

## .resolve()与.reject() ##
> 语法：Promise.resolve(data)/Promise.reject(reason)

它们都是new Promise()的快捷方式。
让Promise对象立即进入resolved或rejected状态。

## .all() ##

> 语法：Promise.all(iterable)

Promise的all方法提供了并行执行异步操作的能力，all会把所有异步操作的结果放进一个数组中传给then。有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。
[demo4](https://stephenhyy.github.io/demo/promise/demo4.html)

----------
	Promise
	.all([runAsync1(), runAsync2(), runAsync3()])
	.then(function(results){
	    console.log(results);
	});

----------
## .race() ##
> 语法：Promise.race(iterable)

all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法

----------
	Promise
		.race([request(), timeout()])
		.then(function (results)
		{
			doSomething;
		})
		.catch(function (reason)
		{
			doSomething;
		});

----------
场景就是请求数据时长时间没有的话，要在ui上显示no data
[demo5](https://stephenhyy.github.io/demo/promise/demo5.html)


# 使用Promise的原因 #

Promise的优势在于，可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作。

传统的多异步任务处理

----------

	asyncTask1(data, function (data1){
	
	    asyncTask2(data1, function (data2){
	
	        asyncTask3(data2, function (data3){
	                // .... 继续
	        });
	
	    });
	
	});

promise

----------
	asyncTask1(data)
	    .then(function(data1){
	        return asyncTask2(data1);
	    })
	    .then(function(data2){
	       return asyncTask3(data2);
	    })
	    // 仍然可以继续then方法

[demo6](https://stephenhyy.github.io/demo/promise/demo6.html)