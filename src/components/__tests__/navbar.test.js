/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar/navBar';

test('renders the navbar ', () => {
    render(<NavBar />);
});

