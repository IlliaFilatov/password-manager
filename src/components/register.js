import React from 'react';
import ReactDOM from 'react-dom';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      congratulations: ''
    }
  }
  regUser(e) {
    e.preventDefault();

    const formElement = ReactDOM.findDOMNode(this),
          loginInputValue = formElement.querySelector('.login-input-name').value,
          passwordInputValue = formElement.querySelector('.login-input-password').value;

    if(loginInputValue && passwordInputValue) {
      console.log(loginInputValue, passwordInputValue);
      localStorage.setItem(loginInputValue, passwordInputValue);
      this.setState({
        congratulations: <span className="badge badge-success">Registration is successfull!</span>
      })
    } else {
      this.setState({
        congratulations: <span className="badge badge-warning">Please, put in correct data.</span>
      })
    }
    
  }
  render() {
    const {congratulations} = this.state;
    return (
      <div>
        <h1>Registration</h1>
        <form className="login-form">
          {congratulations}
          <div className="form-group">
            <input type="email" className="form-control login-input-name" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control login-input-password" placeholder="Password"/>
          </div>
          <button type="submit" onClick={(e) => this.regUser(e)} className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}