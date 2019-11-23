// 将mutations中的函数抽取成为常量
export const ADD_COUNTER = 'add_counter';
export const ADD_TO_CART = 'add_to_cart';


// vue官方推荐，这样在模板之间定义的函数或者方法名改变之后，也不会改变在vuex中储存的方法的名称
// 使vuex内部不会被影响到