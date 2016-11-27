import {Posts} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function(){
  //发布posts.lists
  Meteor.publish('posts.list',function(){
    const seletor={};
    const options={
      fields:{_id:1,title:1},
      sort:{createAt:-1},
      limit:10
    };
    return Posts.find(seletor,options);
  })
}
