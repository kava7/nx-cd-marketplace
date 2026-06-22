import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { PaymentModal } from './PaymentModal';

describe('PaymentModal', () => {
  it('renders payment methods and confirms payment', async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(
      <PaymentModal
        amount={49}
        isOpen
        locale="en"
        productName="NX/CD Indicator"
        onClose={vi.fn()}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByText('Scan to Pay')).toBeInTheDocument();
    expect(screen.getByText('WeChat Pay')).toBeInTheDocument();
    expect(screen.getByText('PayPal')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /i have paid/i }));

    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
