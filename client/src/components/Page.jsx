import React, { Component } from 'react';
import _ from 'lodash';

class Page extends Component {
  render(){
  	const { itemsCount, pageSize } = this.props;

  	const pagesCount = Math.ceil(itemsCount/pageSize);
  	if(pagesCount === 1) return null;
  	const pages = _.range(1, pagesCount + 1);

    return(
      <nav aria-label="Page navigation example">
        <ul class="pagination">
		  	  {pages.map(page => (
		  	    <li key={page} class={page === this.props.currentPage ? "page-item active": "page-item"}>
			  	    <a class="page-link" onClick={() => this.props.onPageChange(page)}>{page}</a>
			  	  </li>
		  	  ))}
        </ul>
      </nav>
    )
  }
}

export default Page;
