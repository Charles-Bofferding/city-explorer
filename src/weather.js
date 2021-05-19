import React from 'react';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      test: true
    }
  }

  render(){
    return (
      <tr>
        <td>{this.props.info.date}</td>
        <td>{this.props.info.description}</td>
      </tr>
    );
  }

}

export default Weather;
