import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';


class Movies extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      test: true
    }
  }

  render(){
    //Grab the top 20 movies and make a card for each of them
    //Try and use all data from the Movie class
    return (
      <div>
          {this.props.movies.slice(0, 20).map(movie => {
            return (
              <Card style={{ width: '25rem', margin: '0 auto' }}>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Card.Text>Average Score : {movie.average_votes} from {movie.total_votes} total votes with a popularity score of {movie.popularity}</Card.Text>
                  <Image src={movie.image_url} thumbnail />
                  <Card.Text>Release Date: {movie.released_on}</Card.Text>
              </Card>
            )
          })}
      </div>
    );
  }

}

export default Movies;
