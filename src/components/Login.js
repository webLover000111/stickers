import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import oAxios from '../config/Axios';

const FormItem = Form.Item;
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleLogin() {
    const { username, password } = this.state;
    console.log(this.state.password)
    const data = {
      username,
      password,
    };
    const res = await oAxios.post('/login', data)
      .then(res => res.data)
      .catch(err => console.log(err));
    if (res) {
      if (res.code === 0) {
        console.log(res);
        console.log(document.cookie);
        window.location.hash = '/main';
      } else {
        alert(res.msg);
      }
    } else {
      alert('出现错误，建议重新登陆');
    }
  }

  handleUsername(e) {
    const username = e.target.value.trim();
    this.setState({
      username,
    });
  }

  handlePassword(e) {
    const password = e.target.value.trim();
    this.setState({
      password,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input
              className="login-input"
              prefix={
                <Icon
                  type="user"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              placeholder="Username"
              onChange={this.handleUsername}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input
              className="login-input"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="password"
              placeholder="Password"
              onChange={this.handlePassword}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <a
              className="login-form-forgot"
              href="./#"
            >
              忘记密码？
            </a>
            <br />
            <Button
              type="primary"
              onClick={this.handleLogin}
              className="login-form-button login-btn"
            >
              登录
            </Button>
            <span>没有账号？</span>
            <NavLink
            to='/logup'
            >
              去注册
            </NavLink>
          </FormItem>
        </Form>
      </div>
    );
  }
}
Login.propTypes = {

};
const LoginForm = Form.create()(Login);
export default LoginForm;
