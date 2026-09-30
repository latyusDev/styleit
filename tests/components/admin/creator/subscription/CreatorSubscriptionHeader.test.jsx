import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import CreatorSubscrptionHeader from '@/components/admin/creator/subscription/CreatorSubscrptionHeader'

describe('CreatorSubscrptionHeader', () => {
  it('renders the full header when full prop is true', () => {
    render(<CreatorSubscrptionHeader full={true} />)
    expect(screen.getByTestId('full-header')).toBeInTheDocument()
  })

  it('renders the half header when full prop is false', () => {
    render(<CreatorSubscrptionHeader full={false} />)
    expect(screen.getByTestId('half-header')).toBeInTheDocument()
  })

  it('renders the half header when full prop is not provided', () => {
    render(<CreatorSubscrptionHeader />)
    expect(screen.getByTestId('half-header')).toBeInTheDocument()
  })

  it('does not render the half header when full is true', () => {
    render(<CreatorSubscrptionHeader full={true} />)
    expect(screen.queryByTestId('half-header')).not.toBeInTheDocument()
  })

  it('does not render the full header when full is false', () => {
    render(<CreatorSubscrptionHeader full={false} />)
    expect(screen.queryByTestId('full-header')).not.toBeInTheDocument()
  })

  it('renders name, plan, from, to, status items in full header', () => {
    render(<CreatorSubscrptionHeader full={true} />)
    const header = screen.getByTestId('full-header')
    expect(header).toHaveTextContent('name')
    expect(header).toHaveTextContent('plan')
    expect(header).toHaveTextContent('from')
    expect(header).toHaveTextContent('to')
    expect(header).toHaveTextContent('status')
  })

  it('renders plan, from, to, status items in half header', () => {
    render(<CreatorSubscrptionHeader full={false} />)
    const header = screen.getByTestId('half-header')
    expect(header).toHaveTextContent('plan')
    expect(header).toHaveTextContent('from')
    expect(header).toHaveTextContent('to')
    expect(header).toHaveTextContent('status')
  })

  it('does not render name item in half header', () => {
    render(<CreatorSubscrptionHeader full={false} />)
    const header = screen.getByTestId('half-header')
    expect(header).not.toHaveTextContent('name')
  })
})