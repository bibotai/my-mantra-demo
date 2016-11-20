import {useDeps, composeWithTracker(composer),
  useDeps(depsMapper), composeAll} from 'mantra-core';
import Component from '../components/create_comment.js';

export const composer = ({
    contest,
    clearErrors
}, onData) => {
  const {LocalState}=context();
  const error=LocalState.get('CREATE_COMMENT_ERROR');
  onData(null,{error});
  return clearErrors;
};

export const depsMapper=(context,actions)=>({
  create:actions.comments.create,
  clearErrors:actions.comments.clearErrors,
  context:()=>context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
