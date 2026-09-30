import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import ReferralCard from '@/components/representative/ReferralCard'

// --- Mocks ---

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className, alt }) => (
    <img src={src} className={className} alt={alt} />
  )
}))

// --- Fixtures ---

const mockCreatorReferral = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  client_pic: 'https://example.com/avatar.png',
  business_name: 'Doe Designs',
  username: 'johndoe',
  refrercode: 'REF123'
}

const mockClientReferral = {
  id: 2,
  firstName: 'Jane',
  lastName: 'Smith',
  client_pic: 'https://example.com/avatar2.png',
  business_name: 'Smith Co',
  username: 'janesmith',
  refrercode: 'REF456'
}

// --- Tests ---

describe('ReferralCard', () => {
  describe('common rendering', () => {
    it('renders the avatar image', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByAltText('avatar')).toBeInTheDocument()
    })

    it('renders the avatar image with the correct src', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'https://example.com/avatar.png')
    })

    it('renders the "Full Name" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })

    it('renders the full name as lastName + firstName', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Doe John')).toBeInTheDocument()
    })

    it('renders the "First Name:" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('First Name:')).toBeInTheDocument()
    })

    it('renders the first name value', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getAllByText('John').length).toBeGreaterThan(0)
    })

    it('renders the "Last Name:" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Last Name:')).toBeInTheDocument()
    })

    it('renders the last name value', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getAllByText('Doe').length).toBeGreaterThan(0)
    })

    it('renders the "Refer Code:" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Refer Code:')).toBeInTheDocument()
    })

    it('renders the referral code value', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('REF123')).toBeInTheDocument()
    })
  })

  describe('creator mode (isClient=false)', () => {
    it('renders "Business Name" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Business Name')).toBeInTheDocument()
    })

    it('renders the business_name value', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.getByText('Doe Designs')).toBeInTheDocument()
    })

    it('does not render "Username" label', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.queryByText('Username')).not.toBeInTheDocument()
    })

    it('does not render the username value', () => {
      render(<ReferralCard referral={mockCreatorReferral} isClient={false} />)
      expect(screen.queryByText('johndoe')).not.toBeInTheDocument()
    })
  })

  describe('client mode (isClient=true)', () => {
    it('renders "Username" label', () => {
      render(<ReferralCard referral={mockClientReferral} isClient={true} />)
      expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('renders the username value', () => {
      render(<ReferralCard referral={mockClientReferral} isClient={true} />)
      expect(screen.getByText('janesmith')).toBeInTheDocument()
    })

    it('does not render "Business Name" label', () => {
      render(<ReferralCard referral={mockClientReferral} isClient={true} />)
      expect(screen.queryByText('Business Name')).not.toBeInTheDocument()
    })

    it('does not render the business_name value', () => {
      render(<ReferralCard referral={mockClientReferral} isClient={true} />)
      expect(screen.queryByText('Smith Co')).not.toBeInTheDocument()
    })

    it('renders client referral code', () => {
      render(<ReferralCard referral={mockClientReferral} isClient={true} />)
      expect(screen.getByText('REF456')).toBeInTheDocument()
    })
  })

  describe('missing data', () => {
    it('renders without crashing when optional fields are undefined', () => {
      render(
        <ReferralCard
          referral={{ id: 3, firstName: undefined, lastName: undefined, client_pic: undefined, refrercode: undefined }}
          isClient={false}
        />
      )
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })

    it('renders empty strings gracefully for missing name fields', () => {
      render(
        <ReferralCard
          referral={{ id: 3, firstName: '', lastName: '', client_pic: '', refrercode: '' }}
          isClient={false}
        />
      )
      expect(screen.getByText('First Name:')).toBeInTheDocument()
      expect(screen.getByText('Last Name:')).toBeInTheDocument()
    })
  })
})