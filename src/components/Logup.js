import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
class Logup extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logup">
        <Form onSubmit={this.handleSubmit} className="logup-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                className="logup-input"
                prefix={<Icon type="user"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />} 
                placeholder="Username"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                className="logup-input"
                prefix={<Icon type="mail"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />} 
                placeholder="email"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                className="logup-input"
                prefix={<Icon type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                type="password"
                placeholder="Password"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password again!' }],
            })(
              <Input
                className="logup-input"
                prefix={<Icon type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                type="password"
                placeholder="Password again"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="logup-form-button logup-btn">
              注册
            </Button>
            <span>已有账号？</span>
            <a href="#">去登录</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
Logup.propTypes = {
  form: PropTypes.object.isRequired,
};
const LogupForm = Form.create()(Logup);
export default LogupForm;
