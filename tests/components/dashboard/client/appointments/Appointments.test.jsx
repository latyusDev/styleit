import React from 'react'
import Appointments from '@/components/dashboard/client/appointments/Appointments'
import { render,screen } from '@testing-library/react'
import {describe,it} from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import CustomQueryClientProvider from '@/components/global/CustomQueryClientProvider'
import { getAppointments } from '@/api/appointment'


vi.mock('@/components/dashboard/client/appointments/AppointmentCard', () => ({
  default: ({ appointment }) => (
    <div data-testid="appointment-card">
      {appointment.id}
    </div>
  ),
}))

vi.mock('@/api/appointment', () => ({
  getAppointments: vi.fn(),
}))



describe('Appoointments',()=>{

    it('should show loader while fetching', () => {
  getAppointments.mockReturnValue(new Promise(() => {})) // never resolves

  render(
        <CustomQueryClientProvider>
            <MemoryRouter>
                <Appointments />
            </MemoryRouter>
        </CustomQueryClientProvider>
        )
    expect(screen.getByTestId('post-loader')).toBeInTheDocument()
})


it('should render list of appointments', async () => {
  getAppointments.mockResolvedValue({
    appointments: [
        {
            id:1,
            receiver:'ariky stitches',
            name:'Ademola Decode',
            bookingDate:'2024-11-10',
            bookingTime:'12:30',
            collectionDate:'2024-11-15',
            collectionTime:'15:20',
            status:'accepted',
            reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
        },
        {
            id:2,
            receiver:'ariky stitches',
            name:'Ademola Decode',
            bookingDate:'2024-11-10',
            bookingTime:'12:30',
            collectionDate:'2024-11-15',
            collectionTime:'15:20',
            status:'accepted',
            reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
        },
    ],
  })

   render(
        <CustomQueryClientProvider>
            <MemoryRouter>
                <Appointments />
            </MemoryRouter>
        </CustomQueryClientProvider>
        )

  const cards = await screen.findAllByTestId('appointment-card')

  expect(cards.length).toBe(2)
})


it('should show error message when request fails', async () => {
  getAppointments.mockRejectedValue(new Error('Failed to fetch'))

   render(
        <CustomQueryClientProvider>
            <MemoryRouter>
                <Appointments />
            </MemoryRouter>
        </CustomQueryClientProvider>
        )

  expect(
    await screen.findByText(/failed to fetch/i)
  ).toBeInTheDocument()
})
})