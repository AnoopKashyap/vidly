import React, { Component } from 'react';

class Input extends Component {
  state ={}

  render(){

  	const { name, value, onChange, label, errors } = this.props;

  	const error = errors;
  	return(
  		<div className="form-group">
		    <label htmlFor={name}>{label}</label>
		    <input
		      value={value}
		      name={name}
		      onChange={onChange}
		      type={name}
		      className="form-control"
		      id={name}
		      aria-describedby="emailHelp" />
		      {error && <div className="alert alert-danger">{error}</div>}
		  </div>
  	)
  }
}

export default Input;
