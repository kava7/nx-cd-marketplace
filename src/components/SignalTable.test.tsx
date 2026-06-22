import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { SignalTable } from './SignalTable';
import { usSignals } from '@/data/mock-signals-us';

describe('SignalTable', () => {
  it('renders 15 rows with symbol, signal time, and signal level', () => {
    render(<SignalTable locale="en" signals={usSignals} />);

    expect(screen.getAllByRole('row')).toHaveLength(16);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('TSLA')).toBeInTheDocument();

    expect(screen.getByText('Symbol')).toBeInTheDocument();
    expect(screen.getByText('Signal Time')).toBeInTheDocument();
    expect(screen.getByText('Signal Level')).toBeInTheDocument();
  });

  it('sorts by strength with highest first', () => {
    render(<SignalTable locale="en" signals={usSignals} />);

    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    expect(firstDataRow).toHaveTextContent('AAPL');
  });
});
