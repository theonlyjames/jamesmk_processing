import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
// import SacredShapes from './components/SacredShapes';
import TheGameOfLife from './components/TheGameOfLife';

const API_KEY = 'AIzaSyBCS33yorJD1xJVTqIqstRYM0SQiWsHuLM';

YTSearch({key: API_KEY, term: 'surfboards'}, (data) => {
	console.log(data);
})

const App = () => {
	return (
		<div>
			<SearchBar />	
			<TheGameOfLife />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));