import methodStubs from './configs/method_stubs';
import actions from './actions/';
import routes from './routes';
// 这是模块的定义文件(主文件)。如果不需要执行以下任务则不需要此文件:
// - 加载路由
// - 定义action
// - 在加载模块时运行配置
export default{
  //加载路由
  routes,
  //定义action
  actions,
  //在加载模块时需要运行的配置
  load(context){
    methodStubs(context);
  }
  //在模块定义中，当模块加载时，会调用`.load()`方法，所以，这里是调用配置的地方。
};
