import {check} from 'meteor/check';
//这些设置可以在加载这个模块时被引用和调用。
// >注意:通常，这是我们保存用于乐观更新的Meteor方法存根的地方。
export default function({Meteor, Collections}) {
  //调用Meteor服务端的一个method
    Meteor.methods({
        'posts_create' (_id, title, content) {
            check(_id, String);
            check(title, String);
            check(content, String);

            const createdAt = new Date();
            const post = {
                _id,
                title,
                content,
                createdAt,
                saving: true
            };

            Collections.Posts.insert(post);
        }
    });
}
