import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import oAxios from '../config/Axios';

const FormItem = Form.Item;
class Logup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordAgain = this.handlePasswordAgain.bind(this);
    this.handleLogup = this.handleLogup.bind(this);
  }

  handleUsername(e) {
    const username = e.target.value.trim();
    this.setState({
      username,
    });
  }

  handleEmail(e) {
    const email = e.target.value.trim();
    this.setState({
      email,
    });
  }

  handlePassword(e) {
    const password = e.target.value.trim();
    this.setState({
      password,
    });
  }

  handlePasswordAgain(e) {
    const passwordAgain = e.target.value.trim();
    this.setState({
      passwordAgain,
    });
  }

  async handleLogup() {
    const {
      username, email, password, passwordAgain,
    } = this.state;
    if (!username.length && !email.lengtth && !password.length && !passwordAgain.length) {
      alert('请把表单填写完整!');
      return;
    }
    if (password !== passwordAgain) {
      alert('前后两次输入密码不一致!');
      return;
    }
    const data = {
      username,
      email,
      password,
    };
    const res = await oAxios.post('/logup', data)
      .then(response => response.data)
      .catch(err => console.log(err));
    if (res) {
      if (res.code === 0) {
        window.location.hash = '/main';
      } else {
        alert(res.msg);
      }
    } else {
      alert('出现错误，建议重新尝试!');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logup">
        <Form onSubmit={this.handleSubmit} className="logup-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input
              className="logup-input"
              prefix={
                <Icon
                  type="user"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="Username"
              onChange={this.handleUsername}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input
              className="logup-input"
              prefix={
                <Icon
                  type="mail"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="email"
              onChange={this.handleEmail}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input
              className="logup-input"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              type="password"
              placeholder="Password"
              onChange={this.handlePassword}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password_again', {
              rules: [{ required: true, message: 'Please input your Password again!' }],
            })(<Input
              className="logup-input"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              type="password"
              placeholder="Password again"
              onChange={this.handlePasswordAgain}
            />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              className="logup-form-button logup-btn"
              onClick={this.handleLogup}
            >
              注册
            </Button>
            <span>已有账号？</span>
            <NavLink
              to="/login"
            >
              去登录
            </NavLink>
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
