export default {
    create({
        Meteor,
        LocalState,
        FlowRouter
    }, title, content) {
        if (!title || !content) {
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
