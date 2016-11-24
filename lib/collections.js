import {Mongo} from 'meteor/mongo';

//建立两个数据库集合：posts和comments
export const Posts=new Mongo.Collection('posts');
export const Comments =new Mongo.Collection('comments');
