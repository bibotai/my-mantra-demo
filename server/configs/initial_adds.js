import {Posts} from '/lib/collections';

//初始化posts数据
export default function () {
  if (!Posts.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the post title: ${lc}`;
      const content = `Post ${lc}'s content is great!`;
      Posts.insert({title, content});posts
    }
  }
}