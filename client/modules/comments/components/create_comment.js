import React from 'react';

class CreatComment extends React.Component {
    rander() {
        //???
        const {error} = this.prop;
        return (
            <div>
                {/*填充错误信息*/}
                {error
                    ? this._renderError(error)
                    : null}
                    <textarea ref='text' placeholder='Enter your comment here.'></textarea>
                    <br/>
                    {/* 掉 _create方法传值*/}
                    <button onClick={this._create.bind(this)}>Add Comment</button>
            </div>

        )
    }
}
//
_create(){
  //获取文本域中text的值
  const text =this.refs.text.value;
  //创建两个props
  const {create,postId}=this.props;
  //？？
  create(postId,text);
  //清空文本域中的值
  this.refs.text.value='';

}
//填充错误信息
_renderError(error) {
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default CreatComment;
