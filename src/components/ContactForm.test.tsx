import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('blocks empty submissions and submits valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm locale="en" onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(onSubmit).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText('Name'), 'Ada');
    await userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'Need access');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Need access',
    });
  });
});
