import React, { Component } from 'react';

class SearchBar extends Component {
	constructor() {
		super();

		this.state = {
			val: ''
		};
	}
	render() {
		return (
			<div>
				<input 
					value={ this.state.val }
					onChange={event => {this.setState({val: event.target.value})}} />
				Val: {this.state.val}
			</div>
		);
	}
}

export default SearchBar;