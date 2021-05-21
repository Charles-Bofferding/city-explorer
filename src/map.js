import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

class Map extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      test: true
    }
  }

  render(){
    return (
      <div>
        <Image src={this.props.mapSrc} thumbnail />
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
              <td>{this.props.cityObj.display_name}</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>{this.props.cityObj.lat}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{this.props.cityObj.lon}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

}

export default Map;
