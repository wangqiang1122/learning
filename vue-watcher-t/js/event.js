// 添加的钩子函数

export default function callHook(vm,name) {
    vm.$method[name].call(vm);
}
