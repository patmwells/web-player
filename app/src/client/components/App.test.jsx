import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App.jsx', () => {
    it('should render the App component', () => {
        render(<App />);

        screen.getByText('Hello World!');
    });
});
