import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                className="login-input"
                prefix={<Icon type="user"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />} 
                placeholder="Username"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                className="login-input"
                prefix={<Icon type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                type="password"
                placeholder="Password"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="#">忘记密码？</a>
            <br/>
            <Button type="primary" htmlType="submit" className="login-form-button login-btn">
              登录
            </Button>
            <span>没有账号？</span>
            <a href="#">去注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
Login.propTypes = {
  form: PropTypes.object.isRequired,
};
const LoginForm = Form.create()(Login);
export default LoginForm;
