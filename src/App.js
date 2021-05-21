import React from 'react';
import './App.css';
import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './weather.js';
import Map from './map.js';
import Movies from './movies.js';
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
      lat: 0,
      long: 0,
      mapSrc: '',
      cityObj: {},
      weather: [],
      movies: [],
      searched: false
    }
  }
  
  //Larger calling method that will first directly get city then pass info to server calls
  fetchLocation = async () => {
    
    //First try pulling the city basic data, if this works call other request functions
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`);

    //Get the basic data for the other calls out of the response
    //This assumes that the first search result will be the correct one
    this.setState({ cityObj: response.data[0] }, () => console.log(this.state.cityObj));
    this.setState({ lat: this.state.cityObj.lat }, () => console.log(this.state.lat));
    this.setState({ long: this.state.cityObj.lon }, () => console.log(this.state.long));
    
    //Start making the other calls that are not dependant on each other so can be called asynchronously at the same time.
    await this.fetchMap();
    await this.fetchWeather();
    await this.fetchMovie();

    //Let the page know it can load the info now
    this.setState({searched: true});
      

  }
  
  fetchMap = async () => {
    let response = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.lat},${this.state.long}&zoom=13`);
    this.setState({ mapSrc: response }, () => console.log(this.state.mapSrc));
  }

  fetchWeather = async () => {
    let response = await axios.get(`http://localhost:3030/weather?lat=14.15678&lon=14.abc&searchQuery=Seattle`);
    this.setState({ weather: response }, () => console.log(this.state.weather));
  }
  
  fetchMovie = async () => {
    let response = await axios.get(`http://localhost:3030/movies?search=${this.state.search}`);
    this.setState({ movies: response }, () => console.log(this.state.movies));
  }

  render() {
    console.log(this.state.weather);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome, Enter a City and Explore!</h1>
          <input onChange={(e) => {this.setState({ search: e.target.value })}} type='text' />
          <button onClick={this.fetchLocation}>Explore!</button>
          <p>Empty Searches Throw Errors</p>
        </header>
        { this.state.searched ?
          <div>
            <Map
              mapSRC={this.state.mapSRC}
              cityObj={this.state.cityObj}
            />
            <Weather
              weather={this.state.weather}
            />
            <Movies
              movies={this.state.movies}
            />
          </div>
          : null}
      </div>
    );
  }
}

export default App;
