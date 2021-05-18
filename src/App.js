import React from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  
  
  constructor() {
    super();
    this.state = {
      search: '',
      lat: 0,
      long: 0,
      mapSrc: '',
      cityObj: {}
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

  fetchLocation = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    if(this.state.search === ''){
      console.error("Status Code: 400, 404, 500");
      alert("Status Code: 400, 404, 500");
      console.error("Error: Unable to Geocode");
      alert("Error: Unable to Geocode");
    }else{
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
      .then((response) => {
        //This assumes that the first search result will be the correct one
        this.setCity(response.data[0]);
        this.setLat(this.state.cityObj.lat);
        this.setLong(this.state.cityObj.lon);
        this.fetchMap();
      })
      .catch((error) => console.error(error));
      console.log(response);
    }
  }

  fetchMap = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let response = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.lat},${this.state.long}&zoom=13`);
    this.setMap(response.config.url);
  }

  render() {
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
      </div>
    );
  }
}

export default App;
