//程序要用到的所有Context都写在这里
import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
//??
import {ReactiveDict} from 'meteor/reactive-dict';
//??
import {Tracker} from 'meteor/tracker';

export default function(){
  return{
    Meteor,
    FlowRouter,
    Collections,
    LocalState:new ReactiveDict(),
    Tracker
  };
}
