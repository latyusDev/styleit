import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AwaitingApproval from '@/components/admin/creator/AwaitingApproval/AwaitingApproval'

const mockData = {
  tpay_id: '123',
  creator_businessName: 'Style Creator',
  client_firstname: 'John',
  client_lastname: 'Doe',
  tpay_amount: '5000',
  tpay_transNo: 'TXN12345',
  tpay_status: 'pending',
}

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <AwaitingApproval awaitingApproval={mockData} />
    </MemoryRouter>
  )
}

describe('AwaitingApproval Component', () => {
  
  it('renders creator name', () => {
    renderComponent()
    expect(screen.getByTestId('name-123')).toHaveTextContent('Style Creator')
  })

  it('renders client name', () => {
    renderComponent()
    expect(screen.getByTestId('plan-123')).toHaveTextContent('John Doe')
  })

  it('renders amount', () => {
    renderComponent()
    expect(screen.getByTestId('to-123')).toHaveTextContent('₦5000')
  })

  it('renders transaction reference number', () => {
    renderComponent()
    expect(screen.getByTestId('status-123')).toHaveTextContent('TXN12345')
  })

  it('renders transaction status', () => {
    renderComponent()
    expect(screen.getByTestId('from-123')).toHaveTextContent('pending')
  })

  it('renders approve button with correct link', () => {
    renderComponent()
    
    const button = screen.getByTestId('actionButton-123')
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute(
      'href',
      '/admin/creators/awaitingApproval/TXN12345'
    )
  })

})