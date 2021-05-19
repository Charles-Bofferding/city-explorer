import React from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Weather from './weather.js';
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
      weather: []
    }
  }

  //Setting up the modifying state functions
  //Expect to break App into main class's later and it will be easier to pass down
  
  setSearch = (term) => {
    this.setState({ search: term }, () => console.log(this.state.search));
  }

  setLat = (latitude) => {
    this.setState({ lat: latitude }, () => console.log(this.state.lat));
  }
  
  setLong = (longitude) => {
    this.setState({ long: longitude }, () => console.log(this.state.long));
  }
  
  setMap = (mapSource) => {
    this.setState({ mapSrc: mapSource }, () => console.log(this.state.mapSrc));
  }

  setCity = (cityReturn) => {
    this.setState({ cityObj: cityReturn }, () => console.log(this.state.cityObj));
  }

  setWeather = (weatherData) => {
    this.setState({ weather: weatherData }, () => console.log(this.state.weather));
  }

  fetchLocation = async () => {
    //If search is empty return the error messages
    if(this.state.search === ''){
      console.error("Status Code: 400, 404, 500");
      alert("Status Code: 400, 404, 500");
      console.error("Error: Unable to Geocode");
      alert("Error: Unable to Geocode");
    }else{
      //First try pulling the city basic data
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
      .then((response) => {
        //This assumes that the first search result will be the correct one

        //Get the basic data for the other calls out of the response
        this.setCity(response.data[0]);
        this.setLat(this.state.cityObj.lat);
        this.setLong(this.state.cityObj.lon);

        //Start making the other calls that are not dependant on each other so can be called asynchronously at the same time.
        this.fetchMap();
        this.fetchWeather();
      })
      .catch((error) => console.error(error));
      console.log(response);
    }
  }

  fetchWeather = async () => {
    let response = await axios.get(`http://localhost:3030/weather?lat=14.15678&lon=14.abc&searchQuery=Seattle`);
    this.setWeather(response);
  }

  fetchMap = async () => {
    let response = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.lat},${this.state.long}&zoom=13`);
    this.setMap(response.config.url);
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
          <Table className="myTable" striped bordered hover>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Data Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>City Name</td>
                <td>{this.state.cityObj.display_name}</td>
              </tr>
              <tr>
                <td>Latitude</td>
                <td>{this.state.lat}</td>
              </tr>
              <tr>
                <td>Longitude</td>
                <td>{this.state.long}</td>
              </tr>
            </tbody>
          </Table>
          <Image src={this.state.mapSrc} thumbnail />

          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weather Description</th>
              </tr>
            </thead>
            {/* <tbody>
              {this.state.weather.map((day, idx) => (
                <Weather
                  info = {day}
                />
              ))}
            </tbody> */}
          </Table>


      </div>
    );
  }
}

export default App;
