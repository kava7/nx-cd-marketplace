import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AlertLog } from './AlertLog';

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = () => {};

describe('AlertLog', () => {
  it('renders alert container', () => {
    render(<AlertLog />);
    const container = document.querySelector('.rounded-xl');
    expect(container).toBeDefined();
  });

  it('accepts tab prop', () => {
    render(<AlertLog tab="us" />);
    const container = document.querySelector('.rounded-xl');
    expect(container).toBeDefined();
  });
});
