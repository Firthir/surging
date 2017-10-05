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

function displayMatches() {
  const matchArray = findMatches(this.state.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${place.population}</span>
    </li>
    `;
  }).join('');
  //suggestions.innerHTML = html;
}



class Aform extends Component {


  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    findMatches(event.target.value, cities)
  }


  render() {
    return (
      <form className="search-form">
        <input type="text" className="search" placeholder="City or State" value={this.state.value} onChange={this.handleChange} />
        <ul className="suggestions">
          <li>Filter for a city</li>
          <li>or a state</li>
        </ul>
      </form>
    );
  }
}

export default Aform;
