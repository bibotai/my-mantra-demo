import {Posts} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function(){
  Meteor.methods({
    'posts.create'(_id,title,content){
      check(_id,String);
      check(title,String);
      check(content,String);

      // 演示延迟补偿（在生产中删除）
      Meteor._sleepForMs(500);

      //TODO 做一些用户认证
      const createdAt=new Date();
      const post ={_id,title,content,createdAt};
      Posts.insert(post);
    }
  });
}
