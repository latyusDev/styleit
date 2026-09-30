import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import RepresentativeReferral from '@/components/representative/RepresentativeReferral'

// --- Mocks ---

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className, alt }) => (
    <img src={src} className={className} alt={alt} />
  )
}))

// --- Fixtures ---

const mockCreator = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  client_pic: 'https://example.com/avatar.png',
  business_name: 'Doe Designs',
  username: 'johndoe',
  refrercode: 'REF123'
}

const mockClient = {
  id: 2,
  firstName: 'Jane',
  lastName: 'Smith',
  client_pic: 'https://example.com/avatar2.png',
  business_name: 'Smith Co',
  username: 'janesmith',
  refrercode: 'REF456'
}

// --- Tests ---

describe('RepresentativeReferral', () => {
  describe('common rendering', () => {
    it('renders the avatar image', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getByAltText('avatar')).toBeInTheDocument()
    })

    it('renders the avatar with correct src', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'https://example.com/avatar.png')
    })

    it('renders full name in the picture column', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders first name in its own column', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getAllByText('John').length).toBeGreaterThan(0)
    })

    it('renders last name in its own column', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getAllByText('Doe').length).toBeGreaterThan(0)
    })

    it('renders the referral code', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getByText('REF123')).toBeInTheDocument()
    })
  })

  describe('creator mode (isClient=false)', () => {
    it('renders the business_name value', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.getByText(/Doe Designs/i)).toBeInTheDocument()
    })

    it('does not render the username value', () => {
      render(<RepresentativeReferral user={mockCreator} isClient={false} />)
      expect(screen.queryByText('johndoe')).not.toBeInTheDocument()
    })
  })

  describe('client mode (isClient=true)', () => {
    it('renders the username value', () => {
      render(<RepresentativeReferral user={mockClient} isClient={true} />)
      expect(screen.getByText(/janesmith/i)).toBeInTheDocument()
    })

    it('does not render the business_name value', () => {
      render(<RepresentativeReferral user={mockClient} isClient={true} />)
      expect(screen.queryByText('Smith Co')).not.toBeInTheDocument()
    })

    it('renders client first name', () => {
      render(<RepresentativeReferral user={mockClient} isClient={true} />)
      expect(screen.getAllByText('Jane').length).toBeGreaterThan(0)
    })

    it('renders client last name', () => {
      render(<RepresentativeReferral user={mockClient} isClient={true} />)
      expect(screen.getAllByText('Smith').length).toBeGreaterThan(0)
    })

    it('renders client referral code', () => {
      render(<RepresentativeReferral user={mockClient} isClient={true} />)
      expect(screen.getByText('REF456')).toBeInTheDocument()
    })
  })

  describe('missing data', () => {
    it('renders without crashing when optional fields are undefined', () => {
      render(
        <RepresentativeReferral
          user={{ id: 3, firstName: undefined, lastName: undefined, client_pic: undefined, refrercode: undefined }}
          isClient={false}
        />
      )
      expect(screen.getByAltText('avatar')).toBeInTheDocument()
    })

    it('renders without crashing when string fields are empty', () => {
      render(
        <RepresentativeReferral
          user={{ id: 3, firstName: '', lastName: '', client_pic: '', business_name: '', refrercode: '' }}
          isClient={false}
        />
      )
      expect(screen.getByAltText('avatar')).toBeInTheDocument()
    })
  })
})