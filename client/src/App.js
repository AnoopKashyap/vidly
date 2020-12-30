import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import MoviesComponent from './components/movies';
import MovieDetails from './components/MovieDetails';
import Movie from './components/Movie';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import LoginForm from './components/loginForm';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/new" component={Movie}/>
        <Route path="/movies/:id" component={MovieDetails}/>
        <Route path="/movies" exact component={MoviesComponent} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="/movies" exact />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
