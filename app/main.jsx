import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect } from 'antd';
import './main.less';
class Index extends React.Component {
  render() {
    const parentTreeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    }];
    return (
      <TreeSelect
        placeholder='测试treeselect'
        treeData={parentTreeData}
        onChange={this.onChange}
      />
    );
  }
}

ReactDOM.render(
  <Index />,
  root
)
