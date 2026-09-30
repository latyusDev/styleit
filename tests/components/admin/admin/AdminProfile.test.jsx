import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AdminProfile from '@/components/admin/admin/AdminProfile'
import React from 'react'

// --- Mocks ---

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: () => <div data-testid="skeleton" />
}))

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
  FormField: ({ render, name }) => render({ field: { value: '', onChange: vi.fn(), name } }),
  FormItem: ({ children }) => <div>{children}</div>,
  FormLabel: ({ children }) => <label>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => null
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props) => <input {...props} />
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => (
    <img src={src} className={className} data-testid="profile-image" alt="profile" />
  )
}))

vi.mock('@/components/admin/shared/profile/UserProfileCard', () => ({
  default: ({ children, cardProps }) => (
    <div data-testid={`card-${cardProps.sectionId}`}>
      <button
        data-id={cardProps.sectionId}
        onClick={cardProps.handleEdit}
        data-testid={`edit-btn-${cardProps.sectionId}`}
      >
        edit
      </button>
      {children}
    </div>
  )
}))

vi.mock('@/components/global/loaders/SingleLoader', () => ({
  default: () => <div data-testid="single-loader" />
}))

vi.mock('@/images/avatar_profile.png', () => ({ default: '/avatar.png' }))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useForm: vi.fn(() => ({
      control: {},
      handleSubmit: (fn) => (e) => { e?.preventDefault?.(); fn({}) },
      reset: vi.fn(),
      formState: { errors: {} }
    }))
  }
})

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn())
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({ user: { role: 'admin' } }))
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn(() => ({ updateProfileImage: vi.fn() }))
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

vi.mock('lucide-react', () => ({ X: () => <span>X</span> }))

// --- Fixtures ---

const mockData = {
  user: {
    firstname: 'John',
    lastname: 'Doe',
    admin_email: 'john@example.com',
    admin_phone: '08012345678',
    admin_gender: 'male',
    admin_address: '12 Lagos Street',
    admin_pic: '/avatar.png'
  }
}

// --- Tests ---

describe('AdminProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Loading state
  describe('loading state', () => {
    it('renders skeleton while loading', () => {
      render(<AdminProfile isLoading={true} data={undefined} />)
      expect(screen.getAllByTestId('skeleton').length).toBeGreaterThanOrEqual(1)
    })

    it('renders single loaders for each field while loading', () => {
      render(<AdminProfile isLoading={true} data={undefined} />)
      expect(screen.getAllByTestId('single-loader').length).toBeGreaterThan(0)
    })

    it('does not render form inputs while loading', () => {
      render(<AdminProfile isLoading={true} data={undefined} />)
      expect(screen.queryByTestId('firstName')).not.toBeInTheDocument()
      expect(screen.queryByTestId('email')).not.toBeInTheDocument()
    })
  })

  // Success state
  describe('success state', () => {
    beforeEach(() => {
      render(<AdminProfile isLoading={false} data={mockData} />)
    })

    it('renders all form inputs', () => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument()
      expect(screen.getByTestId('lastName')).toBeInTheDocument()
      expect(screen.getByTestId('email')).toBeInTheDocument()
      expect(screen.getByTestId('phoneNumber')).toBeInTheDocument()
      expect(screen.getByTestId('gender')).toBeInTheDocument()
      expect(screen.getByTestId('address')).toBeInTheDocument()
    })

    it('renders the profile image', () => {
      expect(screen.getByTestId('profile-image')).toBeInTheDocument()
    })

    it('renders the admin full name', () => {
      expect(screen.getByText(/john/i)).toBeInTheDocument()
      expect(screen.getByText(/doe/i)).toBeInTheDocument()
    })

    it('renders the "Admin" user label', () => {
      expect(screen.getByText(/user: admin/i)).toBeInTheDocument()
    })

    it('does not render skeletons or loaders', () => {
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('single-loader')).not.toBeInTheDocument()
    })
  })

  // Form labels
  describe('form labels', () => {
    it('renders all field labels', () => {
      render(<AdminProfile isLoading={false} data={mockData} />)
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone number')).toBeInTheDocument()
      expect(screen.getByText(/gender/i)).toBeInTheDocument()
      expect(screen.getByText('Address')).toBeInTheDocument()
    })
  })

  // Empty / missing data
  describe('empty data', () => {
    it('renders without crashing when data is undefined', () => {
      render(<AdminProfile isLoading={false} data={undefined} />)
      expect(screen.getByTestId('firstName')).toBeInTheDocument()
    })

    it('renders full name fallback when user data is missing', () => {
      render(<AdminProfile isLoading={false} data={undefined} />)
      expect(screen.getByText(/full name:/i)).toBeInTheDocument()
    })
  })

  // Profile cards
  describe('profile cards', () => {
    it('renders the businessName card', () => {
      render(<AdminProfile isLoading={false} data={mockData} />)
      expect(screen.getByTestId('card-businessName')).toBeInTheDocument()
    })

    it('renders the personal info card', () => {
      render(<AdminProfile isLoading={false} data={mockData} />)
      expect(screen.getByTestId('card-personal info')).toBeInTheDocument()
    })
  })
})