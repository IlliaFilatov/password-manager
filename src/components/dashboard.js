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

  addPassword() {

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
        value    = localStorage.getItem(keys[rowsId]);

    row.querySelector('.password-place').innerText = value;
  }
  deletePassword() {

  }

  render() {
    const {users, redirection} = this.state;
    return (
      <>
      <>{redirection}</>
      <h1>Dashboard</h1>
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
                  <button type="button" className="btn btn-success">Add</button>
                  <button type="button" className="btn btn-primary" onClick={(e) => this.revealPassword(e)}>Reveal</button>
                  <button type="button" className="btn btn-warning">Edit</button>
                  <button type="button" className="btn btn-danger">Delete</button>
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