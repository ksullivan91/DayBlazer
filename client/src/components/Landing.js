import React, { Component } from 'react';
import Search from './Search';

class Landing extends Component {
  render() {
    return (
      <div className="headline">
        <h2>Welcome to DayBlazer</h2>
        <Search {...this.props} />
      </div>
    );
  }
}

export default Landing;
