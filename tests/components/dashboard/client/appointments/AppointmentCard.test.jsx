import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { toast } from 'sonner'
import { confirmDelivery } from '@/api/appointment'
import AppointmentCard from '@/components/dashboard/client/appointments/AppointmentCard'
import CustomQueryClientProvider from '@/components/global/CustomQueryClientProvider'

// --- Mocks ---

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  )
}))

vi.mock('@/components/dashboard/bookings/BookingCard', () => ({
  default: () => <div>BookingCard</div>
}))

vi.mock('@/components/dashboard/client/appointments/AppointmentMessage', () => ({
  default: () => <div>AppointmentMessage</div>
}))

vi.mock('@/components/dashboard/client/appointments/Accepted', () => ({
  default: () => <div>Accepted Component</div>
}))

vi.mock('@/api/appointment', () => ({
  confirmDelivery: vi.fn()
}))

vi.mock('sonner', () => ({
  toast: vi.fn()
}))

// --- Fixtures ---

const baseAppointment = {
  id: 1,
  status: 'pending',
  paymentStatus: 'unpaid',
  collectionStatus: null
}

// Appointment in "completed but not collected" state — the only state that shows the confirm-delivery button
const completedAppointment = {
  ...baseAppointment,
  status: 'completed',
  collectionStatus: 'not collected'
}

// --- Tests ---

describe('AppointmentCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders component', () => {
    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={baseAppointment} />
      </CustomQueryClientProvider>
    )
    expect(screen.getByRole('appointment-card')).toBeInTheDocument()
  })

  it('shows "payment completed" when paid and accepted', () => {
    render(
      <CustomQueryClientProvider>
        <AppointmentCard
          appointment={{ ...baseAppointment, status: 'accept', paymentStatus: 'paid' }}
        />
      </CustomQueryClientProvider>
    )

    expect(screen.getByRole('completed')).toHaveTextContent('payment completed')
    expect(screen.getByText('work in progress...')).toBeInTheDocument()
  })

  it('shows Accepted component when accepted but not paid', () => {
    render(
      <CustomQueryClientProvider>
        <AppointmentCard
          appointment={{ ...baseAppointment, status: 'accept', paymentStatus: 'unpaid' }}
        />
      </CustomQueryClientProvider>
    )

    expect(screen.getByText('Accepted Component')).toBeInTheDocument()
  })

  it('shows confirm delivery button when status is completed and not collected', () => {
    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={completedAppointment} />
      </CustomQueryClientProvider>
    )

    expect(screen.getByTestId('confirm-delivery')).toBeInTheDocument()
  })

  it('does not show confirm delivery button when status is completed but already collected', () => {
    render(
      <CustomQueryClientProvider>
        <AppointmentCard
          appointment={{ ...baseAppointment, status: 'completed', collectionStatus: 'collected' }}
        />
      </CustomQueryClientProvider>
    )

    expect(screen.queryByTestId('confirm-delivery')).not.toBeInTheDocument()
    expect(screen.getByText('Task Collected')).toBeInTheDocument()
  })

  it('calls confirmDelivery on button click', async () => {
    confirmDelivery.mockResolvedValue({ status: 200 })

    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={completedAppointment} />
      </CustomQueryClientProvider>
    )

    fireEvent.click(screen.getByTestId('confirm-delivery'))

    await waitFor(() => {
      expect(confirmDelivery).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      )
    })
  })

  it('shows success toast when API returns 200', async () => {
    confirmDelivery.mockResolvedValue({ status: 200 })

    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={completedAppointment} />
      </CustomQueryClientProvider>
    )

    fireEvent.click(screen.getByTestId('confirm-delivery'))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        'Delivery confirmed successfully',
        expect.anything()
      )
    })
  })

  it('shows error toast when API fails', async () => {
    confirmDelivery.mockResolvedValue({
      status: 400,
      data: { message: 'Something went wrong' }
    })

    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={completedAppointment} />
      </CustomQueryClientProvider>
    )

    fireEvent.click(screen.getByTestId('confirm-delivery'))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        'Something went wrong',
        expect.anything()
      )
    })
  })

  it('shows loading state when confirming delivery', async () => {
    confirmDelivery.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 100))
    )

    render(
      <CustomQueryClientProvider>
        <AppointmentCard appointment={completedAppointment} />
      </CustomQueryClientProvider>
    )

    fireEvent.click(screen.getByTestId('confirm-delivery'))

    expect(screen.getByText('Confirming...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Confirming...')).not.toBeNull()
    })
  })
})