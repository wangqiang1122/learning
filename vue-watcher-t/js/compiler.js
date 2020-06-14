// 把html解析成虚拟dom
import createVdom from './vdom.js'

function Compiler(vm) {
    console.log(vm);
    this.vnode = {};
    // 转html转虚拟Dom
    this.nodeFragment(vm);

    return this.vnode
}

Compiler.prototype.nodeFragment = function (vm) {
  // 获取真是dom 并把根节点清空
  let dom = document.getElementById(vm.$el);
  let vnode = createVdom(dom);
  console.log(vnode)
};

// 清空跟节点dom
Compiler.empty = function (el) {
    el.innerHTML = '';
};


export default Compiler;
