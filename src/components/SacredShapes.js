import React from 'react';
import p5 from 'p5';

const initS = () => {
	let myp5 = new p5( function( s ) { // s = sketch
		let h = window.innerHeight;
		let w = window.innerWidth;
		let hC = (window.innerHeight-100) / 2; // height origin
		let wC = (window.innerWidth) / 2; // height origin

		// circle
		let d = 100; // default diamater
		let height = 100;
		let radius = 100/2; // default diamater

		let x = 100; 
		let y = 100;

		let level = 0;

		s.setup = function() {
			s.createCanvas(w, h-100);
			s.noStroke();
			s.noLoop();
			s.background(111);
		};

		s.draw = function() {
			drawCircle(w/2, h/4, level+=1);
		};

		let drawCircle = (x, radius, level) => {                    
			var tt = 126 * level/4.0;
			s.fill(tt);
			s.ellipse(x, height*4, radius*2, radius*2);      
			if(level > 1) {
				level = level - 1;
				drawCircle(x - radius/2, radius/2, level);
				drawCircle(x + radius/2, radius/2, level);
			}
		}

		const limit = 5;
		let count = 0;

		let timer = window.setInterval(() => {
			s.redraw();
			count++;
			if(count>limit) {
				clearInterval(timer);
			}
		}, 1000);

	}, 'myShape');
};

class SacredShapes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	initS();
  }

  render() {
    return (
      <div id='myShape'></div>
    );
  }
}

export default SacredShapes;	