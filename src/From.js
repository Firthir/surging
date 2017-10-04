import React, { Component } from 'react';
import './from.css';
// import './input';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data));

console.log(cities);

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

// console.log(findMatches('bos', cities));

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<div class="hl">${this.value}</div>`)
    const stateName = place.state.replace(regex, `<div class="hl">${this.value}</div>`)
    return `
      <li>
        <div class="name">${cityName}, ${stateName} </div>
        <div class="population">${place.population}</div>
      </li>
    `
  }).join('');
}


const searchInput = document.querySelector('.search');
const surggestions = document.querySelector('.serggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);


class AjaxFrom extends Component {
  render() {
    return (
      <form className="search-form">
        <input type="text" className="search" placeholder="City or State" />
        <ul className="suggestions">
          <li>Filter for a city</li>
          <li>or a state</li>
        </ul>
      </form>
    );
  }
}

export default AjaxFrom;
