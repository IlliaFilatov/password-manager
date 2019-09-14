import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav">
          <li className="nav-link">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-link">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-link">
            <Link to="/register">Registration</Link>
          </li>
        </ul>
      </nav>
    )
  }
}