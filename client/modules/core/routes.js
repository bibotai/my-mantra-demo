import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import PostList from './containers/postlist'
//TODO:其他页面
//这是包含模块的路由定义的文件。 它有一个默认引出，它是一个函数。
// 在加载模块时，将使用一个名为injectDeps的函数来调用此默认引出，
// injectDeps函数可以将依赖项注入到React组件(或容器)中。
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
