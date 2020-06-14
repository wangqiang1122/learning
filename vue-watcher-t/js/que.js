// 声明类，数据劫持，以及watcher
// import './compiler.js';
// // import './event.js';

import compiler from './compiler.js';
import callHook from './event.js';

function Que(obj) {

   this.$el = obj.el;
   this.$data = obj.data;
   this.$method = obj.method;
    // 钩子函数的加载 （劫持数据之前）
    callHook(this,'beforeCreate')

    // 对vue模版进行转换
    new compiler(this,this.$el);

   // 数据绑定
   this.observe(this.$data);


}

// 监听数据
Que.prototype.observe = function (data) {
  if (typeof data!=='object') return

  Object.keys(data).forEach(item=>this.defineReactive(data,item,data[item]))

};

//进行数据劫持
Que.prototype.defineReactive = function (obj,key,val) {
    // 递归如果是有子数据
   // this.observe(val)
   // 每个key 都要 加数据劫持
    let dep = new Dep();
    Object.defineProperty(obj,key,{
        enumerable: true, //可配置 可枚举
        configurable: true, // 不可删除的
        set: function () {

        },
        get: function () {

            console.log(val)
            return val
        }
    });
}




// 数据添加watcher添加
function Dep() {
    this.deps = [];  //deps里面存放的全是Watcher的实例
    // 添加Watcher
    this.addep = function (dep) {
        this.deps.push(dep)
    }
    // 通知所有Watcher执行更新
    this.notify = function () {
        this.deps.forEach(item => {
            console.log(item)
            item.update();
        })
    }
}

//

function Watcher(vm,key,cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 将来new 一个监听器时，将当前的Watcher实例附加到 Dep.target上
    // 避免不必要的重复添加
    Dep.target = this;
    console.log(this);
    this.vm[key];
    Dep.target = null;
}
Watcher.prototype.update = function () {
    // console.log('视图更新啦')
    console.log(this.vm[this.key])
    this.cb.call(this.vm,this.vm[this.key]);
}

export default Que

