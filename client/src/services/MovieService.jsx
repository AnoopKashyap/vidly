import http from './httpService';
import { movieUrl } from '../config';
import * as genresAPI from "./GenreService";

const url = movieUrl + '/movies';

export function getMovies(){
	return http.get(url);
}

export function deleteMovie(id) {
  return http.delete(url + '/' + id);
}

export function getMovie(id) {
  return http.get(url + '/' + id);
}

export function saveMovie(movie) {
  if(movie._id){
    let putMovie = {
      "title": movie.title,
      "genreId": movie.genre._id,
      "numberInStock": movie.numberInStock,
      "dailyRentalRate": movie.dailyRentalRate,
    }
    return http.put(url + '/' + movie._id,putMovie);
  }

  else{
    let postMovie = {
      "title": movie.title,
      "genreId": movie.genre._id,
      "numberInStock": movie.numberInStock,
      "dailyRentalRate": movie.dailyRentalRate,
    }
    return http.post(url,postMovie);
  }
}
