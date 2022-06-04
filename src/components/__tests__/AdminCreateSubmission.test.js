/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react';
import AdminCreateSubmission from '../../pages/admin/AdminCreateSubmission';

test('renders the admin submission component ', () => {
    render(<AdminCreateSubmission />);
});

