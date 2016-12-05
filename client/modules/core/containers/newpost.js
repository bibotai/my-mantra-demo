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

    //
    return clearErrors;
};
