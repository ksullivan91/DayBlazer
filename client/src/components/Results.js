import React, { Component } from 'react';
import ResultHeader from './ResultHeader';
import {fetchLocation, fetchResults, abbrState, fetchHikingTrails, fetchMTBTrails, fetchTrailrunTrails, fetchSkiTrails} from '../actions/index';
import ResultItem from './ResultItem';
import ResultMap from './ResultMap';
class Results extends Component {
  componentWillMount = async () => {
    this.setState({activities: []});
    this.fetchData(this.props.location.state.query);
  }
  componentWillReceiveProps = () => {
    this.fetchData(this.props.location.state.query);
  }
  fetchData = async (query) => {
    const city = query.substr(0, query.indexOf(','));
    const state = abbrState(query.substr(query.indexOf(',') + 1, query.length -1).replace(' ', ''), 'abbr')
    const location = await fetchLocation(city, state);
    const brews = await fetchResults(location);
    const trails = (await fetchHikingTrails(location)).concat(await fetchMTBTrails(location)).concat(await fetchTrailrunTrails(location)).concat(await fetchSkiTrails(location));
    const activities = brews.concat(trails).filter((s => a => !s.has(a.id) && s.add(a.id))(new Set()));
    this.setState({activities, location, city, state}, () => console.log(activities));
  }
  render() {
    return (
      <div className="results">
        <ResultHeader data={this.props} />
        <div className="results__container">
          <div className="results__result-list">
            {this.state.activities.length > 1 &&
              this.state.activities.map(activity => {
                return (
                  <ResultItem key={activity.id} data={activity} />
                )
              })
            }
          </div>
          <div className="results__map">
            <ResultMap data={this.state}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
