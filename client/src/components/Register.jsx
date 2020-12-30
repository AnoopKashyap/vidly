import React, { Component } from 'react';
import RegisterInput from './RegisterInput';

class Register extends Component {
  state = {
    account: {
    	username: '',
    	password: '',
    	name: ''
    },
    errors: {}
  };

  validateForm = () => {
  	let errors = {};
  	const { username, password, name } = this.state.account;
    // check the state of account for each field
    if(username.trim() === '')
    	errors.username = "Username is Required";
    if(password.trim() === '')
    	errors.password = "Password is Required";
    if(name.trim() === '')
    	errors.name = "Name is Required";
    return errors;   // if state is invalid return the error
  };

  validateProperty = (input) => {
  	let error = {};
  	/*keeping receving the state/values of each field
      check the value only of that particular field
      return the error if any for the field to the same state */
  	if(input.name === 'username')
  		if(input.value.trim() === '')
  			error.username = "Username is required";
  	if(input.name === 'password')
  		if(input.value.trim() === '')
  			error.password = "Password is required";
  	if(input.name === 'name')
  		if(input.value.trim() === '')
  			error.name = "Name is required";
  	return error;
  };

  onSubmit = (e) => {
  	e.preventDefault();
  	const errors = this.validateForm(); // receive the errors
  	this.setState({ errors: errors ? errors : {} });
  	if(this.state.errors) return;
    console.log("Register submitted");
  };

  handleChange = (e) => {
  	let error = {};
  	let account = {...this.state.account};
  	account[e.currentTarget.name] = e.currentTarget.value;
  	error = this.validateProperty(e.currentTarget);
    this.setState({ account: account, errors: error });
  };

  render(){
  	console.log("account", this.validateForm());
  	return(
  	  <React.Fragment>
  	    <h1 style={{ marginLeft: "200px", marginTop: "10px" }}>Register</h1>
  	    <form>
				  <RegisterInput name="username" label="Username" type="email" onChange={this.handleChange} value={this.state.account.username} errorField={this.state.errors.username}/>
				  <RegisterInput name="password" label="Password" type="password" onChange={this.handleChange} value={this.state.account.password} errorField={this.state.errors.password}/>
				  <RegisterInput name="name" label="Name" type="text" onChange={this.handleChange} value={this.state.account.name} errorField={this.state.errors.name}/>
				  <button type="submit" disabled={Object.keys(this.validateForm()).length != 0} onClick={this.onSubmit} className="btn btn-primary">Register</button>
				</form>
  	  </React.Fragment>
  	)
  }
}

export default Register;
