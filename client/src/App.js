import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Landing from './components/Landing';
import Results from './components/Results';
import ResultMap from './components/ResultMap';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/results/*" component={Results} />
            <Route exact path="/map" component={ResultMap} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
