import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Toast } from '../Toast'

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with success message', () => {
    vi.useFakeTimers()
    render(<Toast message="成功" type="success" onClose={() => {}} />)
    act(() => { vi.advanceTimersByTime(10) })
    expect(screen.getByText('成功')).toBeDefined()
    vi.useRealTimers()
  })

  it('renders with error message', () => {
    vi.useFakeTimers()
    render(<Toast message="失败" type="error" onClose={() => {}} />)
    act(() => { vi.advanceTimersByTime(10) })
    expect(screen.getByText('失败')).toBeDefined()
    vi.useRealTimers()
  })

  it('calls onClose after duration', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast message="test" type="success" onClose={onClose} duration={1000} />)
    act(() => { vi.advanceTimersByTime(10) })
    act(() => { vi.advanceTimersByTime(1000) })
    act(() => { vi.advanceTimersByTime(300) })
    expect(onClose).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
