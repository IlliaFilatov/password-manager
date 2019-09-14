import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import Login from './components/login';
import Register from './components/register';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    document.cookie = "isOpen=false";
    this.state = {
      isOpen: this.getCookie(),
      redirection: ''
    }
  }
  
  getCookie() {
    var value = document.cookie;
    var parts = value.split("; ");
    var arr = [];
    for(let i=0; i < parts.length; i++) {
      arr.push(parts[i].split('='));
    }
    
    if(arr[0][1] === 'true') {
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    this.redirection();
    this.setState({
      isOpen: this.getCookie()
    })
  }
  
  handleLogin() {
    document.cookie = "isOpen=true";
    this.getCookie();
  }

  redirection() {
    if(localStorage.length === 0) {
      this.setState({
        redirection: <Redirect to="/register"/>
      });
    } 
    if(this.state.isOpen === 'false') {
      this.setState({
        redirection: <Redirect to="/login"/>
      });
    }
  }

  render() {
    const { redirection } = this.state;
    return (
      <Router>
        <>{redirection}</>
        <Navigation></Navigation>
        <Route 
          exact 
          path="/" 
          render={(props) => <Dashboard {...props} isOpen={this.state.isOpen}/>}
        />
        <Route
          path='/login'
          render={(props) => <Login {...props} handleLogin={this.handleLogin} warning={this.state.warning} isOpen={this.state.isOpen}/>}
        />
        <Route path="/register" component={Register}></Route>
      </Router>
    )
  }
}
