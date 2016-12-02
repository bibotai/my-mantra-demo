import PostList from '../components/postlist.js';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
//显示postlist的容器
// 容器是Mantra的集合层，他们执行这些操作:
// - 使用状态来修改变量，并通过props将它们传递到UI组件。
// - 将动作(action)传递到UI组件中。
// - 将应用Context中的项目传递到UI组件中
// 容器是一个React component。
//
// 容器使用[react‐komposer](https://github.com/kadirahq/react-komposer)，它支持不同的数据源，包括 Meteor/Tracker, Promises, Rx.js Observable,和几乎所有其他的数据源。

// 通常情况下，在容器中需要些下面这些函数:
// - composer函数用来从状态管理中获取数据。
export const composer = ({
    context
}, onData) => {
    const {Meteor, Collections} = context();
    //订阅posts.list数据源
    if (Meteor.subscribe('posts.list').ready()) {
        // console.log('Meteor.subscribe(\'posts.list\').ready()');
        //查询数据
        const posts = Collections.Posts.find().fetch();
        onData(null, {posts});
    }
};

// - mapper函数从依赖注入层获取数据。
export default composeAll(composeWithTracker(composer), useDeps())(PostList);

// 创建容器的一些规则:
// - 单个文件中应该只有一个容器，并且这个容器必须是默认引出的(default export)
// - composer函数和mapper函数必须从容器模块引出(exported)
// - composer函数只能使用props传递变量
// - mapper函数必须是纯函数([Pure function](https://en.wikipedia.org/wiki/Pure_function))
// >注意:如果需要传递应用Context给一个组件，请使用mapper函数函数通过props传递。
