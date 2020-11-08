import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders button that parses invoice file', () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/download and parse invoice/i);
    expect(buttonElement).toBeInTheDocument();
});
