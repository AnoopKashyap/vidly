import React, { Component } from 'react';

class Search extends Component {
  render(){
  	const { value, onChange } = this.props;
  	return(
  	  <input
  	    type="text"
  	    style={{ marginBottom: "10px" }}
  	    onChange={onChange}
  	    value={value}
  	    className="form-control"
  	    placeholder="search here..."
  	  />
  	)
  }
}

export default Search;
