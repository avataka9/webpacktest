'use strict';

//import _ from 'lodash';
import printMe from './print.js';
import './../scss/style.scss';
//import Icon from './../img/icon.png';
//import Data from './../data/data.xml';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = 'Hello webpack';
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    // const myIcon = new Image();
    myIcon.src = Icon;
    // myIcon.height= '100';

    //element.appendChild(myIcon);

    //console.log(Data);

    return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.querySelector('.container').appendChild(element);


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.querySelector('.container').removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.querySelector('.container').appendChild(element);
    })
}

let x = 'outer';
function test(inner) {
	if (inner) {
		let x = 'inner';
		return x;
	}
	return x; // gets result from line 1 as expected
}

test(false); // outer
test(true); // inner