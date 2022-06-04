/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../../pages/admin/AdminDashboard';

test('renders the admin submission component ', () => {
    render(<AdminDashboard />);
});