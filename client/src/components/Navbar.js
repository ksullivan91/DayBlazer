import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="gradient"></div>
        <div className="navbar__items">
            <div className="navbar__items__item">
                <h4>About</h4>
                <h4>Explore</h4>
            </div>
            <h3>DayBlazer</h3>
            <div className="navbar__items__item">
                <h4>Signup</h4>
                <h4>Login</h4>
            </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
