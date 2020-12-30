import React, { Component } from 'react';
import { getGenres } from '../services/GenreService';
import * as movieService from '../services/MovieService';

class Movie extends Component {
  state = {
    account: {
    	_id: '',
    	title: '',
    	genre: { _id: '', name: '' },
    	numberInStock: '',
    	dailyRentalRate: ''
    },
    genres: []
  };

  async componentDidMount(){
    let genres = await getGenres();
    let genreNames = [];
    genres.data.map(genre => {
      genreNames.push({ _id: genre._id, name: genre.name });
    });
    this.setState({ genres: genreNames });
  }

  onSaveMovie = async (e) => {
  	e.preventDefault();
    await movieService.saveMovie(this.state.account);
    this.props.history.push('/movies');
  };

  handleChange = (e) => {
  	let currentValue = {...this.state.account};
    let genreId;
    if(e.currentTarget.name === 'genre'){
      this.state.genres.map(genre => {
        if(genre.name === e.currentTarget.value)
          genreId = genre._id;
      });

      this.state.account.genre._id = genreId;
      this.state.account.genre.name = e.currentTarget.value;
    }
    else{
  	  currentValue[e.currentTarget.name] = e.currentTarget.value;
    }
  	this.setState({ account: currentValue });
  };

  render(){
  	const { title, genre, numberInStock, dailyRentalRate } = this.state.account;
    console.log("movie", this.state.genres);
  	return(
  		<div className="container">
	  		<form>
	  			<h1>Movie Form</h1>
				  <div className="form-group">
				    <label htmlFor="title">Title</label>
				    <input type="text" className="form-control" name="title" value={title} onChange={this.handleChange} id="title"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="genre">Genre</label>
				    <select className="form-control" name="genre" value={genre.name} onChange={this.handleChange} id="genre">
				      { this.state.genres.map(genre => (
                <option>{genre.name}</option>
              ))}
				    </select>
				  </div>
				  <div className="form-group">
				    <label htmlFor="stock">Number In Stock</label>
				    <input type="text" className="form-control" name="numberInStock" value={numberInStock} onChange={this.handleChange} id="stock"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="rate">Rate</label>
				    <input type="text" className="form-control" name="dailyRentalRate" value={dailyRentalRate} onChange={this.handleChange} id="rate"/>
				  </div>
				  <button className="btn btn-primary" onClick={this.onSaveMovie}>Save</button>
				</form>
  		</div>
  	);
  }
}

export default Movie;
