import '../node_modules/react/umd/react.production.min.js';
import '../node_modules/react-dom/umd/react-dom.production.min.js';
import React from 'react';

const rootDomElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootDomElement);
// const reactHeading = React.createElement('h1', {}, 'Hello from JSX!');
// const reactSecondHeading = React.createElement('h2', {}, 'The best syntax ever!')
// const header = React.createElement('header', {className: 'site-header'}, reactHeading, reactSecondHeading);

// const Footer = () => {
//     return React.createElement('div', { className: 'site-footer' }, React.createElement('p', {}, 'All rights reserved'));
// }

const Footer = () => (
    <div className='site-footer'>
         <p>All right reserved</p>
    </div>
);

const headerJSX = (
    <div>
        <header className='site-header'>
            <h1>Hello from JSX</h1>
            <h2>The best syntax ever!</h2>

            <p>Something else</p>
        </header>
        <Footer />
    </div>
);

//root.render(header);
root.render(headerJSX);