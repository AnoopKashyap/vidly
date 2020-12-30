import React, { Component } from 'react';

class Genre extends Component{
  state = {}

  render(){
  	return(
  		<ul className="list-group">
  		  <li className={this.props.genre === 'All' ? "list-group-item active":"list-group-item"} onClick={() => this.props.onClick('All')}>All Genres</li>
  		  { this.props.genres.map(genre => (
  		    <li className={this.props.genre === genre ? "list-group-item active":"list-group-item"} onClick={() => this.props.onClick(genre)}>{genre}</li>
  		  ))}
			</ul>
  	)
  }
}

export default Genre;
