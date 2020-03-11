import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import  ProxySetting from './component/ProxySetting'
import { Form, Switch,Layout, Button, message, Icon, Tooltip, Radio,Col,Row,Tabs  } from 'antd';

@connect(
  state => {
    return {
      projectMsg: state.project.currProject
    };
  }
)
class ProjectProxy extends Component {
  state = {
  }
  componentDidMount(){
    console.log(this.props.projectMsg)
  }
  onChange = ()=>{
  }
  render() {
    return (
      <div style={{ padding: '20px 10px' }}>
         <ProxySetting></ProxySetting>
      </div>
    );
  }
}

module.exports = Form.create()(withRouter(ProjectProxy));