import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const userList = [], 
          keys = Object.keys(localStorage);
          
    for(let i = 0; i < keys.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(keys[i]);
      let hiddenValue = '*'.repeat(value.length);
      userList.push({key, hiddenValue});
    }

    this.state = {
      users: userList,
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
    if(this.props.isOpen === 'false') {
      this.setState({
        redirection: <Redirect to="/login"/>
      });
    }
  }

  addPassword(e) {
    let node     = e.target,
    row      = node.closest('tr'),
    rowsId   = +row.querySelector('th').innerText - 1,
    keys     = Object.keys(localStorage),
    value    = localStorage.getItem(keys[rowsId]),
    newValue;

    if(value === '') {
      newValue = window.prompt('New password for ' + keys[rowsId] + ' is: ');
      localStorage.setItem(keys[rowsId], newValue);
      value = localStorage.getItem(keys[rowsId]);
      row.querySelector('.password-place').innerText = '*'.repeat(value.length);
      this.setState({
        warning: ''
      })
    } else {
      this.setState({
        warning: <span className="badge badge-warning">Password already exists.</span>
      })
    }
  }  

  revealPassword(e) {
    let node     = e.target,
        row      = node.closest('tr'),
        rowsId   = +row.querySelector('th').innerText - 1,
        keys     = Object.keys(localStorage),
        value    = localStorage.getItem(keys[rowsId]);

    row.querySelector('.password-place').innerText = value;
  }

  editPassword(e) {
    let node     = e.target,
        row      = node.closest('tr'),
        rowsId   = +row.querySelector('th').innerText - 1,
        keys     = Object.keys(localStorage),
        newValue = window.prompt('New password for ' + keys[rowsId] + ' is: '),
        value;
        
    localStorage.setItem(keys[rowsId], newValue);
    value = localStorage.getItem(keys[rowsId]);
    row.querySelector('.password-place').innerText = '*'.repeat(value.length);
  }

  deletePassword(e) {
    let node     = e.target,
        row      = node.closest('tr'),
        rowsId   = +row.querySelector('th').innerText - 1,
        keys     = Object.keys(localStorage),
        value    = localStorage.getItem(keys[rowsId]);
        
    localStorage.setItem(keys[rowsId], '');
    row.querySelector('.password-place').innerText = '';
  }

  render() {
    const {warning, users, redirection} = this.state;
    return (
      <>
      <>{redirection}</>
      <h1>Dashboard</h1>
      <>{warning}</>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Login</th>
            <th scope="col">Password</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
            {users.map((el, index) => 
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{el.key}</td>
              <td className="password-place">
                {el.hiddenValue}
              </td>
              <td>
                <div className="btn-group custom-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-success" onClick={(e) => this.addPassword(e)}>Add</button>
                  <button type="button" className="btn btn-primary" onClick={(e) => this.revealPassword(e)}>Reveal</button>
                  <button type="button" className="btn btn-warning" onClick={(e) => this.editPassword(e)}>Edit</button>
                  <button type="button" className="btn btn-danger" onClick={(e) => this.deletePassword(e)}>Delete</button>
                </div>
              </td>
            </tr>
            )}
        </tbody>
      </table>
      </>
    )
  }
}