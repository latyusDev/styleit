import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import BookAppointment from '@/components/dashboard/client/appointments/BookAppointment'

// ---- mocks ----

const mockMutate = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(() => ({ mutate: mockMutate, isPending: false })),
  }
})

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
  FormField: ({ render }) => render({ field: {}, fieldState: {} }),
  FormItem: ({ children }) => <div>{children}</div>,
  FormLabel: ({ children }) => <label>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => <span />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children }) => <div>{children}</div>,
  SelectTrigger: ({ children }) => <div>{children}</div>,
  SelectContent: ({ children }) => <div>{children}</div>,
  SelectItem: ({ children, value, onClick }) => (
    <div onClick={() => onClick?.(value)}>{children}</div>
  ),
  SelectValue: () => <span>Select</span>,
}))

vi.mock('@/components/ui/popover', () => ({
  Popover: ({ children }) => <div>{children}</div>,
  PopoverTrigger: ({ children }) => <div>{children}</div>,
  PopoverContent: ({ children }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/calendar', () => ({
  Calendar: () => <div data-testid="calendar" />,
}))

vi.mock('@/components/global/Image', () => ({
  default: () => <img data-testid="image" />,
}))

vi.mock('@/components/global/Indicator', () => ({
  default: () => <span data-testid="indicator" />,
}))

vi.mock('@/components/global/loaders/CreatorLoader', () => ({
  default: () => <div data-testid="loader" />,
}))

vi.mock('@/components/global/TimeInput', () => ({
  default: ({ onChange }) => (
    <input
      data-testid="time-input"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))

vi.mock('@/validations/appointmentValidation', () => ({
  bookAppointmentSchema: {},
}))

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => async (values) => ({ values, errors: {} }),
}))

vi.mock('sonner', () => ({
  toast: vi.fn(),
}))

vi.mock('@/api/appointment', () => ({
  makeAppointment: vi.fn(),
}))

// ---- test data ----

const mockDesigners = {
  data: {
    designers: [
      {
        creator: 'john',
        creator_id: '1',
        fname: 'John',
        lname: 'Doe',
        state: 'Lagos',
        lga: 'Ikeja',
        profile_pic: '',
      },
    ],
  },
}

// ---- setup ----

beforeEach(() => {
  vi.clearAllMocks()

  vi.mocked(useQuery).mockReturnValue({
    data: mockDesigners,
    isLoading: false,
  })

  vi.mocked(useMutation).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
  })
})

// ---- tests ----

describe('BookAppointment', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <BookAppointment />
      </MemoryRouter>
    )

  it('should render form', () => {
    renderComponent()
    expect(screen.getByText(/make appointment/i)).toBeInTheDocument()
  })

  it('should show loader when loading designers', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isLoading: true,
    })
    renderComponent()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should update search input', () => {
    renderComponent()
    const input = screen.getByPlaceholderText(/search for designers/i)
    fireEvent.change(input, { target: { value: 'lagos' } })
    expect(input.value).toBe('lagos')
  })

  it('should call mutate on submit', async () => {
    renderComponent()
    const submitBtn = screen.getByRole('button', { name: /make appointment/i })
    fireEvent.click(submitBtn)
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled()
    })
  })
})