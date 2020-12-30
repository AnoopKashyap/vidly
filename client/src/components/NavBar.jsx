import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
  	tab: "movies"
  };

  onSwitchTabs = (param) => {
    this.setState({ tab: param });
  }

  render(){
  	return(
	    <nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <Link className="navbar-brand" to="/" onClick={() => this.onSwitchTabs('Vidly')}>Vidly</Link>
			  <div className="collapse navbar-collapse" id="navbarNav">
			    <ul className="navbar-nav">
			      <li className="nav-item">
			        <Link className={ this.state.tab === "movies" ? "nav-link active": "nav-link" } onClick={() => this.onSwitchTabs('movies')} to="/movies">Movies</Link>
			      </li>
			      <li className="nav-item">
			        <Link className={ this.state.tab === "customers" ? "nav-link active": "nav-link" } onClick={() => this.onSwitchTabs('customers')} to="/customers">Customers</Link>
			      </li>
			      <li className="nav-item">
			        <Link className={ this.state.tab === "rentals" ? "nav-link active": "nav-link" } onClick={() => this.onSwitchTabs('rentals')} to="/rentals">Rentals</Link>
			      </li>
			      <li className="nav-item">
			        <Link className={ this.state.tab === "login" ? "nav-link active": "nav-link" } onClick={() => this.onSwitchTabs('login')} to="/login">Login</Link>
			      </li>
			      <li className="nav-item">
			        <Link className={ this.state.tab === "register" ? "nav-link active": "nav-link" } onClick={() => this.onSwitchTabs('register')} to="/register">Register</Link>
			      </li>
			    </ul>
			  </div>
			</nav>
	  )
  }
}

export default NavBar;
