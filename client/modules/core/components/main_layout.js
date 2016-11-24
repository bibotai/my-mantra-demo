import React from 'react';
import Navigation from './navigation';

const Layout = ({
    //内容组件作为参数传进来
    content = () => null
}) => (
    <div>
        <header>
            <h1>Mantra Voice</h1>
            {/* 导航 */}
            <Navigation/>
        </header>

        <div>
            {/* 内容 */}
            {content()}
        </div>
        <footer>
            <small>Built with
                <a href='https://github.com/kadirahq/mantra'>Mantra</a>
                &amp; Meteor.</small>
        </footer>
    </div>
);

export default Layout;
