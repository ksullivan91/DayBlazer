import React, { Component } from 'react';
import {fetchCities} from '../actions/index';
class Search extends Component {
  componentWillMount = () => {
    const query = this.props.data ? this.props.data.location.state.query: '';
    this.setState({matches: [], query: query, cities: []});
  }
  componentDidMount = async () => {
    this.setState({cities: await fetchCities()});
  }
  findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }

  displayMatches = () => {
    const matchArray = this.findMatches(this.state.query, this.state.cities);
    this.setState({matches: matchArray});
  }

  handleStateChange = (event) => {
    this.setState({query: event.target.value}, () => this.displayMatches(this.state.query, this.state.cities));
  }

  submitQuery = () => {
    if (!this.props.data) {
      this.props.history.push({
        pathname: `/results/${this.state.query}`,
        state: {
          query: this.state.query
        }
      });
    } else {
      this.props.data.history.push({
        pathname: `/results/${this.state.query}`,
        state: {
          query: this.state.query
        }
      });
    }
  }
  setDestination = async (e) => {
    const query = e.target.innerHTML;
    this.setState({query, matches: []});
  }

  render() {
    return (
      <div className="headline__searchbar">
        <input type="text" onChange={(event) => this.handleStateChange(event)} onKeyUp={(event) => this.handleStateChange(event)} placeholder="Enter the destination of your adventure" value={this.state.query} />
        <button onClick={this.submitQuery}>SEARCH</button>
        {this.state.query.length > 0 && this.state.matches.length > 0 && <div className="headline__searchbar__matches">
          <ul>
            {
              this.state.matches.length > 0 && this.state.matches.map(match => {
                return (
                  <li onClick={(e) => this.setDestination(e)} key={match.longitude}>{match.city}, {match.state}</li>
                );
              })
            }
          </ul>
        </div>
        }
      </div>
    );
  }
}

export default Search;
