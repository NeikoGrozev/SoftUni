import { render, screen, cleanup } from "@testing-library/react";
import Header from "./Header";
import ReactDOM from 'react-dom';

describe('Header Component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        cleanup();
    });

    test('Has heading without testing library', () => {
        const rootElement = document.createElement('div');
        rootElement.id = 'root';

        document.body.appendChild(rootElement);
        ReactDOM.render(<Header />, rootElement);

        const actualElement = document.querySelector('h1');

        expect(actualElement.textContent).toBe('Unit Testing')
    });

    test('Has heading', () => {
        render(<Header />);

        const element = screen.getByText('Unit Testing');

        expect(element).toBeInTheDocument();
    });
});