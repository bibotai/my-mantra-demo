import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import PostList from './containers/postlist'
//TODO:其他页面

export default function(injectDeps, {FlowRouter}) {
    //注入部分
    const MainLayoutCtx = injectDeps(MainLayout)
    //根路由
    FlowRouter.route('/', {
        name: 'posts.list',
        action() {
            mount(MainLayoutCtx, {
                content: () => (<PostList/>)
            })
        }
    });
}
