import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { SignalTable } from './SignalTable';
import { usSignals } from '@/data/mock-signals-us';

describe('SignalTable', () => {
  it('renders 15 rows and expands details', async () => {
    render(<SignalTable locale="en" signals={usSignals} />);

    expect(screen.getAllByRole('row')).toHaveLength(16);

    await userEvent.click(screen.getByText('AAPL'));

    expect(screen.getByText(/RSI/)).toBeInTheDocument();
  });

  it('sorts by change percent', async () => {
    render(<SignalTable locale="en" signals={usSignals} />);

    await userEvent.click(screen.getByRole('button', { name: /change/i }));

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('TSLA');
  });
});
