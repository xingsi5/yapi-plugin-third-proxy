import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import  ProxySetting from './component/ProxySetting'
import { Form, Switch,Layout, Button, message, Icon, Tooltip, Radio,Col,Row,Tabs  } from 'antd';
console.log(Form.Item)
class ProxyUi extends Component {
  state = {
    enable:false
  }
  onChange = ()=>{
  }
  render() {
    let {getFieldDecorator} = this.props.form
    return (
      <div style={{ padding: '20px 10px' }}>
         <ProxySetting></ProxySetting>
      </div>
    );
  }
}

module.exports = Form.create()(withRouter(ProxyUi));