import React from 'react';

const PostList = ({posts}) => (
    <div className='postlist'>
        <ul>
            {/*遍历post并展示到页面  */}
            {posts.map(post => (
                <li key={post._id}>
                    <a href={`/post/${post._id}`}>{post.title}</a>
                </li>
            ));}
        </ul>

    </div>
);

export default PostList;
