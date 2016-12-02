// 动作是你在app中写业务逻辑的地方，它们包括:
//
// 验证
// State 管理
// 与远程数据源的交互 一个动作是一个简单的函数，它的第一个参数是整个应用的Context，其他参数通常来自函数调用时。
// >注意: 在动作中，你所做的一切都应是基于应用的Context传递给动作的其他参数。
// 你不能引用任何ES2015的modules 除了库以外。还应避免在动作中使用全局变量。

export default {
    create({
        Meteor,
        LocalState,
        FlowRouter
    }, title, content) {
        if (!title || !content) {
          //设置保存错误的state
            return LocalState.set('SAVING_ERROR', 'Title & Content are required!');
        }
        LocalState.set('SAVING_ERROR', null);
        //这里调用“config/method_stubs”中的一个method
        //这是我们如何做延迟补偿
        const id = Meteor.uuid();

        Meteor.call('posts.create', id, title, content, (err) => {
            if (err) {
                return LocalState.set('SAVING_ERROR', err.message);
            }
        });
        FlowRouter.go(`/post/${id}`);
    },

    clearErrors({LocalState}) {
        return LocalState.set('SAVING_ERROR', null);
    }
};
