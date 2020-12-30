import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as movieService from '../services/MovieService';
import * as genreService from '../services/GenreService';
import { paginate } from '../utils/Paginate';
import Like from './Like';
import Genre from './Genres';
import Page from './Page';
import NavBar from './NavBar';
import Search from './Search';
import _ from 'lodash';

class MoviesComponent extends Component{
  state = {
  	movies: [],
    pageNos: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    genre: "All",
    search: []
  }

  styles = {
    "margin": 10
  }

  async componentDidMount(){
    // console.log("Movies - Mounted");
    // this.fetchMovies();
    const movies = await movieService.getMovies();
    let genres = await genreService.getGenres();
    let genre = [];
    genres.data.map(g => {
      genre.push(g.name);
    });
    this.setState({ movies: movies.data, genres: genre });
    console.log("genres componentDidMount", genres);
    this.generateNumberOfPages();
    // this.handlePageChange(1);
  }

  generateNumberOfPages = () => {
    if(this.state.movies.length != 0){
      this.numberOfPages = Math.ceil(this.state.movies.length/this.pageSize);
    }
    else {
      this.numberOfPages = Math.ceil(movieService.getMovies().length/this.pageSize);
    }
    for(let i=0; i<this.numberOfPages; i++){
      this.pageNos.push(i+1);
    }
    this.setState({ pageNos: this.pageNos });
  }

  deleteMovie = async (movie) => {
  	let originalMovies = [...this.state.movies];
  	let movies = originalMovies.filter(m => m._id != movie._id);
  	this.setState({ movies });

    try{
      await movieService.deleteMovie(movie._id);
    }
    catch(ex){
      if(ex.response && ex.response.status === 404)
        alert('This movie is already deleted.');

      this.setState({ movies: originalMovies });
    }
  }

  isLiked = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  }

  getMovieGenres = async (genre) => {
    const search = [];
    this.setState({ search: search });
    let movies = await movieService.getMovies();
    movies = movies.data;
    console.log("getMovieGenres", movies);
    if(genre != 'All'){
      let genres = movies.filter(movie => movie.genre.name === genre);
      this.setState({ genre: genre, currentPage: 1 });
      this.setState({ movies: genres });
    }
    else{
      this.setState({ movies: movies, currentPage: 1 });
      this.setState({ genre: genre });
    }
    console.log("after getMovieGenres", movies);
    // this.generateNumberOfPages();
  }

  sortMovies = (header) => {
    let movies = [...this.state.movies];
    let temp;
    let op;

    for(let i=0; i<movies.length-1; i++){
      if(movies[i][header] > movies[i+1][header]){
        temp = movies[i];
        movies[i] = movies[i+1];
        movies[i+1] = temp;
        i=0;
      }
    }

    this.setState({ movies: movies });
    console.log("sorted movies", movies);
  }

  handlePageChange = (page) => {
    this.movies = []
    console.log("handlePageChange clicked", page);
    this.setState({ currentPage: page });
    // let pageIndex = (page - 1)*this.state.pageSize;
    // console.log("pageIndex", pageIndex);
    // for(let i=pageIndex; i<(this.state.pageSize+pageIndex); i++){
    //   this.movies.push(this.state.movies[i]);
    // }
    // console.log("this.movies", this.movies);
    // this.movies = _.compact(this.movies);
  }

  searchMovies = async (e) => {
    let movies = await movieService.getMovies();
    movies = movies.data;
    const input = e.currentTarget.value;
    let searchedMovies = [];
    searchedMovies = movies.filter(movie => movie['title'].includes(input));

    /* Another method of search using map
    this.state.movies.map(movie => {
      if(movie['title'].includes(input)){
        searchedMovies.push(movie);
      }
    });

    if(input === ''){
      this.setState({ movies: movies });
    } */

    this.setState({ search: input, genre: 'All', currentPage: 1, movies: searchedMovies });
  };

  render(){
    console.log("Movies - Rendered");
    const movies = paginate(this.state.movies, this.state.currentPage, this.state.pageSize);
    console.log("p movies", movies);
  	return(
      <div>
    		<div className="container" style={{ marginTop: 30 }}>
          <div className="row">
            <div className="col-3" style={{ marginTop: 30 }}>
              <Genre
                genres={this.state.genres}
                onClick={this.getMovieGenres}
                genre={this.state.genre}
              />
            </div>
            <div className="col">
              <Link to="/movies/new"><button className="btn btn-primary">New Movie</button></Link><br/><br/>
              <Search
                onChange={this.searchMovies}
                value={this.state.search}
              />
              <span>
                { this.state.movies.length != 0 ? `Showing ${this.state.movies.length} movies in the Database!!` : "There are no movies in the Database :(" }
              </span>
              <table className="table" style={{ marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th onClick={() => this.sortMovies('title')}>Title</th>
                    <th onClick={() => this.sortMovies('genre.name')}>Genre</th>
                    <th onClick={() => this.sortMovies('numberInStock')}>Stock</th>
                    <th onClick={() => this.sortMovies('dailyRentalRate')}>Rate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  { movies.map(movie => (
                    <tr key={movie._id}>
                      <td><Link to={"/movies/"+movie._id}>{movie.title}</Link></td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          onClick={() => this.isLiked(movie)}
                          liked={movie.liked}
                        />
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => this.deleteMovie(movie)}>Delete</button>
                      </td>
                    </tr>))
                  }
                  <Page
                    itemsCount={this.state.movies.length}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={this.state.currentPage}
                  />
                </tbody>
              </table>
            </div>
          </div>
    		</div>
      </div>
  	);
  }
}

export default MoviesComponent;
