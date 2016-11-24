import {createApp} from 'mantra-core';
import initContext from './configs/context';

//模块
import coreModule from './modules/core';

//初始化conte
const context=initContext();

//创建应用
const app=createApp(context);
app.loadModule(coreModule);
app.init();
