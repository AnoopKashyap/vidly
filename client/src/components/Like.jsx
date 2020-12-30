import React, { Component } from 'react';

class Like extends Component {

	componentDidMount(){
	  // console.log("Like - Mounted");
	}

  render(){
  	// console.log("Like - Rendered");

  	let classes;

  	if(this.props.liked) classes="fa fa-heart";
  	else classes="fa fa-heart-o";

  	return(
  		<i
  		  onClick={this.props.onClick}
  		  style={{ cursor: 'pointer' }}
  		  className={classes}>
  		</i>
  	)
  }
}

export default Like;
