import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/Button';

describe('<Button />', () => {
  it('renders children', () => {
    render(<Button>Send brief</Button>);
    expect(screen.getByRole('button', { name: /send brief/i })).toBeInTheDocument();
  });

  it('defaults to type="button" to prevent accidental form submission', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('fires onClick handler', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as anchor with href when as="a"', () => {
    render(
      <Button as="a" href="#contact">
        Contact
      </Button>,
    );
    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toHaveAttribute('href', '#contact');
  });

  it('honors disabled state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variant + size classes', () => {
    const { rerender } = render(
      <Button variant="primary" size="lg">
        Primary LG
      </Button>,
    );
    expect(screen.getByRole('button').className).toMatch(/bg-accent/);

    rerender(
      <Button variant="ghost" size="sm">
        Ghost SM
      </Button>,
    );
    expect(screen.getByRole('button').className).toMatch(/text-bone-100/);
  });
});
