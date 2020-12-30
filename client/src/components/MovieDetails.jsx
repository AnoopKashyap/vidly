import React, { Component } from 'react';
import queryString from 'query-string';
import { getMovie, saveMovie } from '../services/MovieService';
import { getGenres } from '../services/GenreService';

class MovieDetails extends Component {
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
    const movieId = this.props.match.params.id;
    const { data } = await getMovie(movieId);
    let genres = await getGenres();
    let genreNames = [];
    genres.data.map(genre => {
      genreNames.push({ _id: genre._id, name: genre.name });
    });

    this.setState({ account: data, genres: genreNames });
  }

  handleUpdate = async (e) => {
    // Navigate to /products
    e.preventDefault();
    const movie = {...this.state.account};
    await saveMovie(movie);
    this.props.history.push('/movies');
  };

  handleChange = (e) => {
    let account = this.state.account;
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
      account[e.currentTarget.name] = e.currentTarget.value;
    }
    this.setState({ account });
  };

  render(){
    const { title, genre, numberInStock, dailyRentalRate } = this.state.account;

    return(
    	<div>
        <div className="container">
          <form>
            <h1>Movie - {this.props.match.params.id}</h1>
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
            <button className="btn btn-warning" onClick={this.handleUpdate}>Update</button>
          </form>
        </div>
    	</div>
    )
  }
}

export default MovieDetails;
