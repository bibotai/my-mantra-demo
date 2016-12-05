import React from 'react';

class NewPost extends React.Component {
    rander() {
        const {error} = this.props;
        return (
            <form className="new-post" onSubmit={this.createPost.bind(this)}>
                <h2>Add New Post</h2>
                {error
                    ? <p style={{
                            color: 'red'
                        }}>{error}</p>
                    : null}
                <input ref="titleRef" type="Text" placeholder="Enter your post title."/><br/>
                <textarea ref="contentRef" placeholder="Enter your post content."/><br/>
                <button type="submit">Add New</button>
            </form>
        )
    }
    createPost(event) {
        //因为test不能获取event参数
        //所以在出现undefined错误时调用preventDefault()？？？
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        //把create函数放到props中，titleRef、contentRef都放到refs中？？？？？newpost
        const {create} =this.props;
        const {titleRef,contentRef}=this.refs;

        create(titleRef.value,contentRef.value);
    }
}

export default NewPost;
