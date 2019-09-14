import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: '',
      redirection: ''
    }
  }

  componentDidMount() {
    this.redirection();
  }

  redirection() {
    if(localStorage.length === 0) {
      this.setState({
        redirection: <Redirect to="/register"/>
      });
    } 
  }

  logInUser(e) {
    e.preventDefault();

    const keys = Object.keys(localStorage),
          formElement = ReactDOM.findDOMNode(this),
          loginInputValue = formElement.querySelector('.login-input-name').value,
          passwordInputValue = formElement.querySelector('.login-input-password').value;

    for(let i = 0; i < keys.length; i++) {
      let key = localStorage.key(i),
          value = localStorage.getItem(keys[i]);

      if(loginInputValue === key && passwordInputValue === value) {
        this.props.handleLogin();
        this.setState({
          warning: <Redirect to="/"/>
        });
        break;
      } else {
        this.setState({
          warning: <span className="badge badge-warning">Incorrect data.</span> 
        })
      }
    }
  }
  render() {
    const { warning, redirection } = this.state;

    return (
      <div>
        <>{redirection}</>
        <h1>Login</h1>
        <form className="login-form">
        {warning}
          <div className="form-group">
            <input type="email" className="form-control login-input-name" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control login-input-password" placeholder="Password"/>
          </div>
          <button type="submit" onClick={(e) => this.logInUser(e)} className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}