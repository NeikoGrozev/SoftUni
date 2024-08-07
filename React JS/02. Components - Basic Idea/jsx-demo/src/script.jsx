import '../node_modules/react/umd/react.production.min.js';
import '../node_modules/react-dom/umd/react-dom.production.min.js';
import React from './react';

const rootDomElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootDomElement);

//none JSX component

function Footer() {
    return React.createElement('div', {className: 'site-footer'}, React.createElement('p', {}, 'All right reserved!'));

}

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

root.render(headerJSX);