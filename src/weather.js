import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      test: true
    }
  }

  render(){
    return (
      <div>
        <Table className="myTable" striped bordered hover>
          <thead>
            <tr>
              <th>Forecast Date</th>
              <th>Weatehr Description</th>
            </tr>
          </thead>
          <tbody>
          {this.props.weather.map(day => {
            return (
              <tr>
                <td>{day.date}</td>
                <td>{day.description}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    );
  }

}

export default Weather;
