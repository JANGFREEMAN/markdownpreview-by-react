import React from 'react';
import ReactDOM from 'react-dom';

require('../css/main.scss');
var marked = require('marked');

//编辑组件
var Editor = React.createClass({
    handleChange: function(e){
      var val = e.target.value;
      if(val != this.props.src){
        this.props.updateVal(val);
      }
    },
    render:function(){
        return (
          <textarea  rows = '28' onChange = {this.handleChange}>
              {this.props.val}
          </textarea>
        );
    }
});

//显示Markdown组件
var ShowBlock = React.createClass({
  render:function(){
    return (
      <div className = 'right'>
          <span dangerouslySetInnerHTML={{__html:this.props.val}} />
      </div>
    )
  }
});


//Markdown容器组件
var MarkdownEditor = React.createClass({
  getInitialState:function(){
    return {
      val:'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](http://freecodecamp.com/hermanfassett)*'
    }
  },
  updateVal:function(val){
    this.setState({
      val:val
    });
  },
  marked:function(val){
    return  marked(val, {sanitize: true});
  },
  render:function(){
    return (
      <div className = 'container cf'>
        <div className = 'left'>
            <Editor updateVal = {this.updateVal} val = {this.state.val}/>
        </div>
        <div className = 'right'>
          <ShowBlock val = {this.marked(this.state.val)} />
        </div>
      </div>
    );
  }
})

export {MarkdownEditor}
