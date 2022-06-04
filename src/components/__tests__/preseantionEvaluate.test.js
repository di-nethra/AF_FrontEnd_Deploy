/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react';
import presentationEvaluate from "../../pages/panelMember/presentationEvaluate";

test('renders the navbar ', () => {
    render(<presentationEvaluate />);
});
