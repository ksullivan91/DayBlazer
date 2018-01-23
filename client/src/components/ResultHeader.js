import React, { Component } from 'react';
import Search from './Search';

class ResultHeader extends Component {
  componentDidMount = () => {
  }
  render() {
    return (
      <div className="results__header">
        <Search data={this.props.data}/>
      </div>
    );
  }
}

export default ResultHeader;
