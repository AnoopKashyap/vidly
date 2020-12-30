import React, { Component } from 'react';

class RegisterInput extends Component{
  state = {};

  render(){
  	const { name, type, value, label, errorField, onChange } = this.props;

    return(
      <React.Fragment>
	      <div className="form-group">
	        <label htmlFor={name}>{label}</label>
			    <input
			      type={type}
			      name={name}
			      className="form-control"
			      onChange={onChange}
			      value={value}
			      id={name}
			    />
			    { errorField && <div className="alert alert-danger">{errorField}</div> }
			  </div>
      </React.Fragment>
    )
  }
}

export default RegisterInput;
