import React, { Component } from 'react';
import './Aform.css';
// import './input';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

class Aform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      matches: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      matches: findMatches(event.target.value, cities)
    });
  }

  renderMatches () {
    if (this.state.matches.length) {
      return (
        <ul className="suggestions">
          {
            this.state.matches.map(place => {
              const regex = new RegExp(this.state.value, 'gi');
              const cityName = place.city.replace(regex, `<span class="hl">${this.state.value}</span>`);
              const stateName = place.state.replace(regex, `<span class="hl">${this.state.value}</span>`);
              const html = `${cityName}, ${stateName}`
              return (
                <li key={place.city + place.state}>
                  <span className="name" dangerouslySetInnerHTML={{__html: html}} />
                  <span className="population">{place.population}</span>
                </li>
              )
            })
          }
        </ul>
      )
    } else {
      return (
        <ul className="suggestions">
          <li key='filter'>Filter for a city</li>
          <li key='state'>or a state</li>
        </ul>
      )
    }
  }

  render() {
    return (
      <form className="search-form">
        <input type="text" className="search" placeholder="City or State" value={this.state.value} onChange={this.handleChange} />
        {this.renderMatches()}
      </form>
    );
  }
}

export default Aform;
