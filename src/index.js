var style = require('./style/globalstyle.css');

var messages = require('./messages');

import $ from 'jquery';

//import Button from './button';
//import Kitten from './image';
//import Logo from './logo';

// var newMessage = () => (`
//     <p>${messages.hi} ${messages.event}</p>
//     ${Kitten}
//     ${Logo}
// `);
//var newMessage = () => (Button.button);

//import { multipul } from './mathStaff';

//const newMessage = () => (multipul(3, 3));
// const newMessage = () => (`
//     <div class="${style.box}">
//         DEV: ${DEVELOPMENT.toString()}<br>
//         PROD: ${PRODUCATION.toString()}<br>
//     </div>
// `);

var app = document.getElementById('app');
//app.innerHTML = newMessage();
app.innerHTML = `
    <div id="menu">
        <button id="loadPage1">Load Page 1</button>
        <button id="loadPage2">Load Page 2</button>
    </div>
    <div id="content">
        <h1>Home</h1>
    </div>
`;

document.getElementById('loadPage1').addEventListener('click', () => {
    System.import('./page1')
        .then(pageModule => {
            document.getElementById('content').innerHTML = pageModule.default;
        })
});

document.getElementById('loadPage2').addEventListener('click', () => {
   System.import('./page2')
        .then(pageModule => {
            document.getElementById('content').innerHTML = pageModule.default;
        })
});

$('#app').css('background-color', 'red');

//Button.attachEl();

if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept();
    }
}