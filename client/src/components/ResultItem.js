import React, { Component } from 'react';

class ResultItem extends Component {
  render() {
    return (
      <div className="results__result-list__item">
        <h5 className="activity-name">{this.props.data.brewery ? this.props.data.brewery.name : this.props.data.name}</h5>
        <h5>{this.props.data.brewery && this.props.data.brewery.description ? this.props.data.brewery.description.length > 1 && this.props.data.brewery.description.slice(0, 240) : this.props.data.summary && this.props.data.summary.slice(0, 240)}</h5>
        <h5>{this.props.data.brewery ? `${this.props.data.streetAddress}, ${this.props.data.locality}, ${this.props.data.region} ${this.props.data.postalCode}` : this.props.data.location}</h5>
      </div>
    )
  }
}

export default ResultItem;