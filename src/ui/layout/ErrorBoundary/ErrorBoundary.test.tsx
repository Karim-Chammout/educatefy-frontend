import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

const Boom = (): never => {
  throw new Error('boom');
};

const Ok = () => <div data-testid="ok-page">ok page</div>;

describe('ErrorBoundary reset', () => {
  it('shows the fallback after a render error', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>}>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('ok-page')).toBeNull();
  });

  it('resets the error state when resetKeys change', async () => {
    const { rerender } = render(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>} resetKeys={['route-a']}>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    // Same keys: stays in error state.
    rerender(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>} resetKeys={['route-a']}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    // New route key: resets and renders children again (they still throw here,
    // so the boundary re-enters the error state on the very next render).
    rerender(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>} resetKeys={['route-b']}>
        <Ok />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('ok-page')).toBeInTheDocument();
    expect(screen.queryByTestId('fallback')).toBeNull();
  });

  it('passes a reset callback to a function fallback', () => {
    let capturedReset: (() => void) | undefined;
    const FallbackWithReset = ({ reset }: { reset: () => void }) => {
      capturedReset = reset;

      return <div data-testid="fallback">fallback</div>;
    };

    const { rerender } = render(
      <ErrorBoundary fallback={FallbackWithReset}>
        <Boom />
      </ErrorBoundary>,
    );

    expect(typeof capturedReset).toBe('function');
    screen.getByTestId('fallback');

    // Re-render with a healthy child while still in the error state, then
    // reset: the error clears and the child renders.
    rerender(
      <ErrorBoundary fallback={FallbackWithReset}>
        <Ok />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    act(() => {
      capturedReset!();
    });

    expect(screen.queryByTestId('fallback')).toBeNull();
    expect(screen.getByTestId('ok-page')).toBeInTheDocument();
  });
});
