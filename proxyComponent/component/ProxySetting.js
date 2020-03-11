import React, { Component } from 'react';
import AceEditor from 'client/components/AceEditor/AceEditor';
import './proxySetting.scss'
// import { connect } from 'react-redux'
import { Form, Switch,Layout, Button,Input, message, Icon, Tooltip, Radio,Col,Row,Tabs  } from 'antd';
const FormItem = Form.Item
class ProxySetting extends Component {
  state = {
    is_proxy_open:false,
    pre_proxy_script:'',
    after_proxy_script:''
  }
  onChange = e =>{
    this.setState({
      is_proxy_open:e
    })
  }
  handleSubmit = ()=>{

  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { pre_script, after_script } = this.state;
    return (
      <div style={{ padding: '20px 10px' }} className="project-request">
        <Form onSubmit={this.handleSubmit}>
        <FormItem
            label={
              <span>
                开启代理&nbsp;<a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://hellosean1025.github.io/yapi/documents/project.html#%E5%85%A8%E5%B1%80mock"
                >
                  <Tooltip title="点击查看文档">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </a>
              </span>
            }
            {...formItemLayout}
          >
            <Switch
              checked={this.state.is_proxy_open}
              onChange={this.onChange}
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </FormItem>
          <FormItem
            label={
              <span>
                代理地址:
              </span>
            }
            {...formItemLayout}
          >
            <Input></Input>
          </FormItem>
          <FormItem {...formItemLayout} label="proxy Script(转发请求前脚本)">
            <AceEditor
              data={pre_script}
              onChange={editor => this.setState({pre_proxy_script: editor.text })}
              fullScreen={true}
              className="request-editor"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="proxy Script(响应请求后脚本)">
            <AceEditor
              data={after_script}
              onChange={editor => this.setState({ after_proxy_script: editor.text })}
              fullScreen={true}
              className="request-editor"
            />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

module.exports =  ProxySetting