#Mantra
*工作草案-版本0.2.0*
##简介
这是一个Mantra草案规范，一个由[Kadira](https://kadira.io/)创建的Meteor的应用程序架构。 它帮助开发人员构建可维护的，面向未来的Meteor应用程序。
##版权
The MIT License (MIT)

Copyright (c) 2016 Kadira Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**转载我的翻译也要署名哦~**
##内容
*(这儿有个目录，可我不想写啦，在我的博客中目录会自动生成哦~)*
### 1 概述
Mantra是Meteor的应用程序架构。 有了Mantra，我们试图实现以下两个主要目标。
**1.可维护性**
可维护性是与大型团队合作的关键因素。 我们通过对我们应用程序的每个部分进行单元测试来实现这一点，同时遵循一个标准。 这样很容易让新手加入团队。
**2.未来证明(Future Proof)**
JavaScript就像是一个充满选择的土地。 我们对每个问题有不止一个最佳解决方案。 现在很难说什么是最好的解决方案，未来会有什么变化。
Mantra依赖一套将持续很长时间的核心原则，我们允许其他人根据需要进行更改。
#### 1.1 Mantra里有什么？
- 它有一个现代的，基于React的**UI组件**层。
- 它有一个在你的应用程序中定义业务逻辑的地方， 我们称之为 **动作(action)**。
- Mantra本身不提供状态管理，但它允许你使用各种各样的状态管理器，包括Meteor / Tracker，Redux，Rx.js Observable，Promise和几乎任何其他的状态管理器。
- 它有一种通过组合容器(containers)将状态(states)和动作(action)集成到UI组件中的方法。
- 它允许你依赖注入。
- 它帮助你单元测试UI，动作和集成（容器）。
- 它对目录布局，文件命名和其他内容都有一些标准。
#### 1.2 Mantra不是什么？
- 它不是一个应用程序平台，应用程序平台专注于应用打包，传输，部署等任务。Mantra使用Meteor作为应用程序平台。
- 它不是一个样板，即使我们有着同样的目录结构。
- 它不是一个代码生成器，我们可能会有一个代码生成工具(*译者注:已经有了，详见[mantra-cli](https://github.com/mantrajs/mantra-cli)*)，但这并不是Mantra的核心部分

#### 1.3 Mantra是什么？
- 它是一套如何构建Meteor应用程序的标准。
- 它还带有一套已经被整理过的且被维护着的库，帮助你在Meteor上实现Mantra。

#### 1.4 为什么要规范？
Mantra是一个应用程序架构。 会有很多人使用Mantra，包括应用程序开发人员，工具创建者，教程作者和项目经理，所以拥有一个每个人都遵循的标准是非常重要的。 这就是为什么要规范。

#### 1.5 在你阅读之前
虽然本规范是以一种简单易懂的语句编写的。 但是，如果你对以下领域有充分的了解，你读起来可能会感到流畅。
- ES2015
- React
- React Containers
- Meteor基础（Pub / Sub，Tracker，ReactiveDict等）
请参阅附录A以了解有关上述领域的更多信息
### 2 核心组件
以下是Mantra的核心组件及其组织方式：
#### 2.1 聚焦客户端
Mantra特别注重你的应用程序的客户端。 Mantra不会将客户端和服务端代码混合在一起;相反，它建议代码共享。原因是：

- 客户端是你应该付出很多努力的地方。它是你的代码库中最大的一部分。服务器端代码库相对更容易组织和管理。
- 客户端应用程序将使用schema与服务器交互。客户端应用程序不应该关心服务端如何实现的。
Mantra[不支持Universal Apps这个观点](https://voice.kadira.io/say-no-to-isomorphic-apps-b7b7c419c634#.o9orzmk6k)。它鼓励不同的平台不同的应用程序并在其之间代码共享。通常有一个服务器与几个客户端应用程序之间交互。
**基于上述观点，将客户端和服务端代码混合在一起并不是一个好主意。**
当我们在本规范中进一步讨论Mantra时，它将指的是你应用程序的客户端。

然而，大多数应用程序将具有服务器端组件。因此，我们还提供一个服务器端的目录布局。有关详情，请参阅附录B。
#### 2.2 ES2015语法和ES2015模块
我们依赖ES2015及其模块的很多新特性，因此，为了使用Mantra，你需要使用Meteor 1.3，它附带了ES2015模块。
#### 2.3 使用React作为UI
我们使用React作为Mantra中的UI（表示）层。
UI组件不应该知道关于应用程序的其余部分的任何内容，并且不应该读取或修改应用程序的状态。 用于渲染UI组件的数据和事件处理程序应通过props从容器传递或作为动作(action)从其内部的事件处理程序中传递。 有时需要在UI组件内使用临时局部状态，但该状态不应在其自身组件外引用。
在编写UI组件时，你可以将任意React组件引入程序，包括
- 在应用程序中定义的其他UI组件。
- 来自NPM的UI组件（如material-ui）。
- 应用中的任何容器（我们稍后会讨论这个问题）。
还可以导入任何库函数并在UI组件中使用它们。 你可以直接从NPM模块引入，但不能从任何Meteor软件包引入。 这些函数应该是[纯函数](https://en.wikipedia.org/wiki/Pure_function)。
这里是一个简单的UI组件：
```js
import React from 'react';

const PostList = ({posts}) => (
  <div className='postlist'>
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <a href={`/post/${post._id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default PostList;
```
#### 2.4 动作(Actions)
动作是你在app中写**业务逻辑**的地方，它们包括:
- 验证
- State 管理
- 与远程数据源的交互
一个动作是一个简单的函数，它的第一个参数是整个应用的Context，其他参数通常来自函数调用时。
>注意: 在动作中，你所做的一切都应是基于应用的Context传递给动作的其他参数。你不能引用任何ES2015的modules 除了库以外。还应避免在动作中使用全局变量。

这是一个动作:
```js
export default{
    create({Meteor,LocalState,FlowRouter},title,content){
        if(!title||!content){
            return LocalState.set('SAVING_ERROR','Title & Content are required!');
        }
    }
    LocalState.set('SAVING_ERROR',null);
    //这里调用“config/method_stubs”中的一个method
    //这是我们如何做延迟补偿
    Meteor.call('posts.create', id, title, content, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.message);
      }
    });
    FlowRouter.go(`/post/${id}`);

    clearErrors({LocalState}){
        return     LocalState.set('SAVING_ERROR', null);
    }

};
```
#### 2.5 状态(state)管理
在app中，我们需要处理不同种类的状态。我们可以把他们分为两类。
1. 本地状态 - 从来不会同步到远程服务器的状态(错误，验证信息，当前的页面)
2. 远程状态 - 这是通常从远程服务器获取并与其同步的state。
我们有不同的解决方案来管理我们app中的states，包括:
- Meteor/MiniMongo (远程状态)
- Tracker/ReactiveDict (本地状态)
- FlowRouter (本地状态)
- Redux (本地状态)
- GraphQL (远程状态)
- Falcor (远程状态)
这就是JavaScript社区一直在创新的地方。因此，Mantra在涉及到状态管理时是灵活的。你可以使用任何你想使用的。
举个例子，你可以在你的应用启动时使用以下状态:
- Meteor/MiniMongo (远程状态)
- Tracker/ReactiveDict (本地状态)
- FlowRouter (本地状态)
之后你也可以换用其他解决方案。
> 注意: Mantra在管理状态时有一些强制规则
- 所有的状态的写操作都要在其对应的动作中完成。
- 你既可以在动作中读取状态也可以在容器中读取状态。
- 不允许直接在UI 组件中读写状态，UI 组件不应该知道任何应用程序中的状态。

下面的链接是一些关于状态的使用例子
[Reading from local state – inside a container](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/containers/newpost.js#L6)
[Writing into local state – inside an action](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/actions/posts.js#L4)
[Reading from a remote state – inside a container](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/containers/postlist.js#L7)

#### 2.6 容器(Containers)
容器是Mantra的集合层，他们执行这些操作:
- 使用状态来修改变量，并通过props将它们传递到UI组件。
- 将动作(action)传递到UI组件中。
- 将应用Context中的项目传递到UI组件中
容器是一个React component。

容器使用[react‐komposer](https://github.com/kadirahq/react-komposer)，它支持不同的数据源，包括 Meteor/Tracker, Promises, Rx.js Observable,和几乎所有其他的数据源。

通常情况下，在容器中需要些下面这些函数:
- composer函数用来从状态管理中获取数据。
- mapper函数从依赖注入层获取数据。
创建容器的一些规则:
- 单个文件中应该只有一个容器，并且这个容器必须是默认引出的(default export)
- composer函数和mapper函数必须从容器模块引出(exported)
- composer函数只能使用props传递变量
- mapper函数必须是纯函数([Pure function](https://en.wikipedia.org/wiki/Pure_function))
>注意:如果需要传递应用Context给一个组件，请使用mapper函数函数通过props传递。

这是一个容器的例子:
```js    
import PostList from '../components/postlist.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(PostList);
```
#### 2.7 应用Context
应用Context可用于所有操作和容器，因此这是应用程序中共享变量的地方，他们包括:
- Meteor namespace
- Meteor Collections
- 本地状态
- FlowRouter
- 其他Meteor包
- Redux Stores
- Rest Clients
- DDP Clients
这是一个简单的应用Context的例子:
```js
import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker
  };
}
```
#### 2.8 依赖注入
Mantra使用依赖注入来隔离应用程序的不同部分，包括UI组件和动作(actions)。

我们使用一个名为[react-simple-di](https://github.com/kadirahq/react-simple-di)的项目，它在后台使用React Context。 它同时接受应用Context和动作(action)作为依赖。

一旦配置，应用程序Context会注入到每一个action中，它是action的第一个参数，因此你不需要手动传递应用Context。

应用程序Context也可以在[容器](https://kadirahq.github.io/mantra/#sec-Containers)中访问。

##### 2.8.1 配置依赖注入
依赖关系将注入到应用程序的顶级组件中，通常是一个布局组件，你可以在你的路由中注入，看一下这个例子:
```js    
import React from 'react';
export default function (injectDeps) {
  //这是注入部分:
  const MainLayoutCtx = injectDeps(MainLayout);

  // 路由相关代码
  //......
}
```
#### 2.9 路由和组件挂载(Mounting)
>注意:当我们提到组件时，会同时包含容器(containers)和UI组件(UI components)

我们通常使用路由去挂载组件到UI，这可以有多种解决方案(比如[Flow Router](https://github.com/kadirahq/flow-router/)和[React Router](https://github.com/rackt/react-router))


路由只是一个工具，它在Mantra中的唯一功能就是将组件挂载到UI上。

看一下使用FlowRouter当做路由的例子:
```js
import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import PostList from '/client/modules/core/containers/postlist';

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });
}
```
> 注意:如果你需要根据某些条件重定向（例如用户未被授权），请使用action来代替像FlowRouter的triggersEnter这样的路由选项。 从组件或容器的composer函数调用action。

#### 2.10 库
每个应用程序都有一些实用的功能去完成不同的任务，你也可以通过NPM获取它们。这些库将引出(export)函数。所以，你可以在应用程序的任何位置引用他们，包括动作，组件和容器。

> 当在组件库中使用库函数时，它应该是纯函数。

#### 2.11 测试
测试是Mantra的一个核心部分，Mantra帮助你测试应用程序的每一个部分。我们强制执行这些规则有助于你编写测试程序。你可以使用熟悉的工具，如[Mocha](https://mochajs.org/)，[Chai](http://chaijs.com/)和[Sinon](http://sinonjs.org/)来进行测试。

使用Mantra，你可以在应用程序中单元测试以下三个核心部分:
- UI组件 - [Example](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/components/tests/post.js)
- Actions - [Example](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/actions/tests/posts.js)
- Container composers 和 mappers部分 - [Example](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/containers/tests/post.js)


##### 2.11.1 UI测试
我们使用[enzyme](https://github.com/airbnb/enzyme)为UI进行测试，点击[这里](https://github.com/mantrajs/mantra-sample-blog-app/blob/master/client/modules/core/components/tests/post.js)看一些简单的测试用例。

#### 2.12 Mantra 模块
Mantra遵循模块化架构。 除了“应用程序Context”之外，Mantra的所有组件都应驻留在模块中。

你可以创建很多很多的模块，并通过imports使它们建立联系。

##### 2.12.1 应用程序Context和模块的关系
应用程序Context是应用程序的核心。 它需要在不属于任何模块的地方定义。 所有模块可以作为依赖关系访问应用程序Context，模块不应更新应用程序Context。

##### 2.12.2 模块的定义
Mantra模块可以包含定义它的主文件文件。 它暴露动作，路由和接受context的函数。 通常是 `index.js` 文件。

一个简单的模块定义像这样:

```js
export default {
  // 可选的
  load(context, actions) {
    // 做一些模块的初始化工作
  },
  // 可选的
  actions: {
    myNamespace: {
      doSomething: (context, arg1) => {}
    }
  },
  // 可选的
  routes(injectDeps) {
    const InjectedComp = injectDeps(MyComp);
    // 加载路由并将"被注入的组件"显示在屏幕上。
  }
};
```

##### 2.12.3 隐式模块
如果一个模块没有任何action和路由，或者不需要任何初始化，那么可以避免使用定义文件。这种隐式模块可能包含以下内容:
- UI组件
- 容器
- 库

##### 2.12.4 模块容器和UI组件的关系
模块容器和UI组件应能够通过ES2015模块引入(imported)。

##### 2.12.5 模块动作
模块可以通过命名空间暴露动作。 这些命名空间对于应用程序是全局的，模块应该保证它们是唯一的。 一个模块可以暴露多个命名空间。

最后，来自每个模块的所有这些命名空间都被合并，并且可以在action和容器内访问。

##### 2.12.6 路由
你可以使用任意的路由库进行路由。如果需要，也可以在多个模块中使用路由定义。

##### 2.12.7 核心模块
Mantra是100％模块化的，应用程序中应至少有一个模块， 我们称之为核心模块。 它只是一个简单的模块，但你需要在任何其他模块之前加载它。 这个模块最好放在下面这些地方：
- 核心路由
- 应用配置
- 通用库
- 通用动作
和其他特定的应用代码中。
根据应用程序，有多种方式组织模块，详见[附录C](http://)

##### 2.12.8 子模块

在一个模块中，**不能** 包含子模块。这是为防止不必要的复杂性而做出的决定。 否则，编写多层嵌套模块是会很难管理。

#### 2.13 单一入口

使用Mantra，我们希望我们的应用是可与预测的。因此，你的应用只能有一个入口点，它就是`client/main.js`。

它将初始化应用程序Context并加载应用程序中的所有模块。 这里有一个`client / main.js`文件示例：
```js
import {createApp} from 'mantra-core';
import {initContext} from './configs/context';

// 模块
import coreModule from './modules/core';
import commentsModule from './modules/comments';

// 初始化 context
const context = initContext();

// 创建 app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.init();
```
### 3 目录布局
在Mantra中，我们强制使用一个公共目录结构。 这是任何应用程序的可维护性的核心部分。
> 在本节中，我们只讨论客户端目录布局。 要了解如何组织服务器端目录布局，请参阅附录B。

#### 3.1 顶层目录结构
所有与Mantra相关的代码都保留在应用程序的`client`目录中。 在内部，通常有两个目录和一个JavaScript文件。 他们是：
```
* configs
* modules
* main.js
```
让我们详细分析下他们中的每一个。

##### 3.1.1 configs
此目录包含应用程序中的根级别配置。 通常，这是一个放置所有模块通用的应用程序范围的全局配置的地方。
此目录中的所有JavaScript文件都应使用默认引出函数(default export function)，该功能可启动某些任务，并在需要时返回。

>注意:我们通常将应用Context放置在这里的context.js中。

##### 3.1.2 modules
此目录包含应用程序中的一个或多个模块（在自己的目录中）。 这里至少应该有一个模块，它通常被称为`core`。
在modules目录中，通常有这些内容:
```
* actions
* components
* configs
* containers
* libs
* routes.jsx
* index.js
```
让我们学习更多关于这个目录下的目录和文件。

###### 3.1.2.1 actions
此目录包含模块中的所有action。 这里有一个目录布局的示例：
```
* posts.js
* index.js
* tests
    - posts.js
```
posts.js是一个ES2015模块，它引出具有action的JavaScript对象。 例如，下面是一个简单的action模块：
```js
export default {
  create({Meteor, LocalState, FlowRouter}, title, content) {
    //...
  },

  clearErrors({LocalState}) {
    //...
  }
};
```
然后，在index.js中，我们引入所有action模块并聚合所有action。 我们给每个模块一个命名空间。
```js
import posts from './posts';

export default {
  posts
};
```
在上面的例子中，我们给`posts.js`这个action模块一个命名空间`posts`。
>注意:这些命名空间在应用程序中应该是唯一的。 这是模块的责任。

在tests目录中，我们使用action的名称为每个action模块编写测试。 请参阅附录D以了解有关测试文件命名约定的更多信息。

[点击这里查看action的目录布局](https://github.com/mantrajs/mantra-sample-blog-app/tree/master/client/modules/core/actions)

###### 3.1.2.2 components
Components包含模块化UI组件。 它的目录布局如下：
```
* main_layout.jsx
* post.jsx
* style.css
* tests
  - main_layout.js
  - post.js
```
- 在这个目录下所有的`.jsx`文件都必须默认引出。他们必须是一个React类。
- 你可以编写与这些React组件相关的CSS文件，Meteor将为你绑定它们。
就像在actions中，这里也有一个`tests`目录。请参阅附录D以了解有关测试文件命名约定的更多信息。

[点击这里查看components的目录布局](https://github.com/mantrajs/mantra-sample-blog-app/tree/master/client/modules/core/components)

###### 3.1.2.3 containers
此目录包含一组`.js`文件，每个文件表示一个容器。 每个文件应该作为React Container类默认引出。

这是一个通常的目录布局:
```
* post.js
* postlist.js
* tests
    - post.js
    - postlist.js
```
这个目录下也有一个`tests`目录。请参阅附录D以了解有关测试文件命名约定的更多信息。
[点击这里查看containers的目录布局](https://github.com/mantrajs/mantra-sample-blog-app/tree/master/client/modules/core/containers)

###### 3.1.2.4 configs
这个目录包含应用中模块层次的配置。

此目录中的所有JavaScript文件必须引出一个默认函数，该函数可启动任何任务，并在需要时返回一些内容。 该函数可以接受“应用程序Context”作为第一个参数。

这是一个简单的config文件:
```js    
export default function (context) {
  // do something
}
```
这些设置可以在加载这个模块时被引用和调用。

>注意:通常，这是我们保存用于乐观更新的Meteor方法存根的地方。

[点击这里查看configs的目录布局](https://github.com/mantrajs/mantra-sample-blog-app/tree/master/client/modules/core/configs)

###### 3.1.2.5 libs
此目录包含一组有效引出函数的JavaScript文件（`.js`或`.jsx`）。 这也被称为库。 您可以在`tests`的子目录中编写库的测试。

###### 3.1.2.6 routes.jsx
这是包含模块的路由定义的文件。 它有一个默认引出，它是一个函数。 下面是一个典型的路由定义：
```js
import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import PostList from '/client/modules/core/containers/postlist';

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });
}
```
如上所示，在加载模块时，将使用一个名为injectDeps的函数来调用此默认引出，injectDeps函数可以将依赖项注入到React组件(或容器)中。

###### 3.1.2.7 index.js
这是模块的定义文件(主文件)。如果不需要执行以下任务则不需要此文件:
- 加载路由
- 定义action
- 在加载模块时运行配置
这是一个典型的模块定义文件:
```js    
import methodStubs from './configs/method_stubs';
import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load(context) {
    methodStubs(context);
  }
};
```
在模块定义中，当模块加载时，会调用`.load()`方法，所以，这里是调用配置的地方。
##### 3.1.3main.js
这是Mantra应用程序的入口点。 它初始化应用程序Context并加载模块。 因此，它使用一个名为`mantra-core`的实用程序库。

这是一个简单的`main.js`文件的例子:

```js
import {createApp} from 'mantra-core';
import initContext from './configs/context';

// 模块
import coreModule from './modules/core';
import commentsModule from './modules/comments';

// 初始化 context
const context = initContext();

// 创建应用(app)
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.init();
```

### 4 未来的工作

Mantra是一个草稿，将有缺失的部分和我们可以做的改进。 我们已经确定以下功能对Mantra很重要，他们将在不久的将来可用。
(懒得翻了 过过再更~)
#### 4.1 Server-Side Rendering (SSR)

It’s extremely possible to do SSR with Mantra. We are trying to do this in a tool‐agnostic manner, but the reference implementation will be based on FlowRouter SSR.

#### 4.2 Distributing Mantra Modules via NPM

We could distribute Mantra modules via NPM. Once we do that, we could do reuse a lot of code between apps and organizations.

#### 4.3 Standard for Styling

It’s better to have a standard for styling UI components.

#### 4.4 Standard for Tests

It’s better to have a standard for writing test cases.

#### 4.5 Reusing Composers

Sometimes, we can use reuse composers for the same function in many places. We need to find a pattern for doing that.
