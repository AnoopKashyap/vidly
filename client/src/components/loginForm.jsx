import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';

class LoginForm extends Component {
  state = {
    account: {
    	username: "",
    	password: ""
    },
   errors: {}
  };

  schema = {
  	username: Joi.string().required().label('Username'),
  	password: Joi.string().required().label('Password')
  };

  validate = () => {
  	const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
  	if(!result.error) return null;
  	const errors = {};
  	console.log("result", result);
  	for(let item of result.error.details)
  	  errors[item.path[0]] = item.message;
  	return errors;
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	// this.username.current.value;

  	const errors = this.validate();
  	this.setState({ errors: errors ? errors : {}})
  	// console.log(errors);
  	if(errors != null)
  		return
  	console.log("submitted");
  }

  validateProperty = (input) => {
    let error = {...this.state.errors};
    if(input.name === 'username' && input.value.trim() === '')
  	  error.username = "Username is required.";
    else error.username = "";

    if(input.name === 'password' && input.value.trim() === '')
  	  error.password = "Password is required.";
    else error.password = "";

    return error;
  };

  handleChange = e => {
    const account = {...this.state.account}
    const name = e.currentTarget.name;
    account[name] = e.currentTarget.value;

    const errors = this.validateProperty(e.currentTarget);

    this.setState({ account, errors });
  };

  render(){
  	const { errors } = this.state;
  	console.log("account, errors", this.state.account, this.state.errors);
  	const errorObj = {};

    return(
    	<form>
    	  <h1>Login</h1>
			  <Input
			    value={this.state.account.username}
			    name="username"
			    label="Username"
			    onChange={this.handleChange}
			    errors={this.state.errors.username}
			  />

			  <Input
			    value={this.state.account.password}
			    name="password"
			    label="Password"
			    onChange={this.handleChange}
			    errors={this.state.errors.password}
			  />

			  <button type="submit" className="btn btn-primary" disabled={this.validate()} onClick={this.handleSubmit}>Login</button>
			</form>
    )
  }
}

export default LoginForm;
