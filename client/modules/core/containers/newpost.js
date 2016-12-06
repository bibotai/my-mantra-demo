import NewPost from '../components/newpost';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

// composer函数用来从状态管理中获取数据
// 获取错误数据 传给UI
export const composer = ({
    context,
    clearErrors
}, onData) => {
    const {LocalState} = context();
    const error = LocalState.get('SAVING_ERROR');
    onData(null, {error});

    //当组件卸载时清楚错误
    return clearErrors;
};

//mapper函数从依赖注入层获取数据
export const depsMapper=(context,actions)=>({
  create:actions.posts.create,
  clearErrors:actions.posts.clearErrors,
  context:()=>context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewPost);
