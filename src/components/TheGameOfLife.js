import React from 'react';
import p5 from 'p5';

function initG() {
	let myp5 = new p5( function( s ) { // s = sketch
		let w;
		let columns;
		let rows;
		let board;
		let next;
		let width = window.innerWidth;
		let height = window.innerHeight;

		s.setup = function() {
			s.createCanvas(width, height);
			w = 20;
			// Calculate columns and rows
			columns = s.floor(width/w);
			rows = s.floor(height/w);
			// Wacky way to make a 2D array is JS
			board = new Array(columns);
			for (let i = 0; i < columns; i++) {
				board[i] = new Array(rows);
			} 
			// Going to use multiple 2D arrays and swap them
			next = new Array(columns);
			for (let i = 0; i < columns; i++) {
				next[i] = new Array(rows);
			}
			init();
		}

		s.draw = function() {
			s.background(255);
			generate();
			for ( let i = 0; i < columns;i++) {
				for ( let j = 0; j < rows;j++) {
					if ((board[i][j] == 1)) s.fill(0);
					else s.fill(255); 
					s.stroke(0);
					s.rect(i*w, j*w, w-1, w-1);
				}
			}
		}

		// reset board when mouse is pressed
		s.mousePressed = function() {
			init();
		}

		// Fill board randomly
		function init() {
			for (let i = 0; i < columns; i++) {
				for (let j = 0; j < rows; j++) {
					// Lining the edges with 0s
					if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
					// Filling the rest randomly
					else board[i][j] = s.floor(s.random(2));
					next[i][j] = 0;
				}
			}
		}

		// The process of creating the new generation
		function generate() {

			// Loop through every spot in our 2D array and check spots neighbors
			for (let x = 1; x < columns - 1; x++) {
				for (let y = 1; y < rows - 1; y++) {
					// Add up all the states in a 3x3 surrounding grid
					let neighbors = 0;
					for (let i = -1; i <= 1; i++) {
						for (let j = -1; j <= 1; j++) {
							neighbors += board[x+i][y+j];
						}
					}

					// A little trick to subtract the current cell's state since
					// we added it in the above loop
					neighbors -= board[x][y];
					// Rules of Life
					if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
					else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
					else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
					else                                             next[x][y] = board[x][y]; // Stasis
				}
			}

			// Swap!
			let temp = board;
			board = next;
			next = temp;
		}
	}, 'myGame');
}
initG();

class TheGameOfLife extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	//initG()
  }

  render() {
    return (
      <div id='myGame'></div>
    );
  }
}

export default TheGameOfLife;	