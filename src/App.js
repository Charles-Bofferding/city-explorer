import React from 'react';
import './App.css';
import axios from 'axios';

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
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.ca7576decb274b38b69c9ba95209131a&q=${this.state.search}&format=json`);
    this.setCity(response);
  }

  render() {
    console.log(this.state.cityObj);
    return (
      <div className="App">
        <header className="App-header">
          <input onChange={(e) => {this.setState({ search: e.target.value })}} type='text' />
          <button onClick={this.fetchLocation}>Explore!</button>
        </header>
      </div>
    );
  }
}

export default App;
