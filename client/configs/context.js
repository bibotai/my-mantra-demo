//程序要用到的所有Context都写在这里
import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
// 此包提供ReactiveDict，一种用于跟踪器的通用反应数据类型。
// 它提供了Meteor文档中记录的Session对象的所有功能，例如反应get，set和equals函数。
// 如果您为其构造函数提供了名称，则其内容将在Hot Code Push客户端代码更新中保存。
import {ReactiveDict} from 'meteor/reactive-dict';
//??
import {Tracker} from 'meteor/tracker';

export default function() {
    return {Meteor, FlowRouter, Collections, LocalState: new ReactiveDict(), Tracker};
}
