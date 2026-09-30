import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import router from "@/router";
import CustomQueryClientProvider from "@/components/global/CustomQueryClientProvider";

// ---- mocks ----

vi.mock('sonner', () => ({
  Toaster: () => null,
  toast: vi.fn(),
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { role: 'client', profile_pic: null },
    logout: vi.fn(),
  })),
}))

vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(() => ({
    isLoginForm: false,
    isSignUpForm: false,
    role: 'client',
  })),
}))

vi.mock('@/hooks/useToggleAuthPage', () => ({
  default: vi.fn(() => ({
    togglePage: vi.fn(),
  })),
}))

vi.mock('@/store/useClient', () => ({
  useClientStore: vi.fn(() => ({
    likedPosts: vi.fn(),
  })),
}))

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    })),
  }
})

vi.mock('@/components/auth/LoginForm', () => ({
  default: () => <div data-testid="login-form" />,
}))

vi.mock('@/components/auth/SignUpForm', () => ({
  default: () => <div data-testid="signup-form" />,
}))

vi.mock('@/components/global/ToggleAuthPage', () => ({
  default: () => <div data-testid="toggle-auth-page" />,
}))

vi.mock('@/components/global/TrendingContents', () => ({
  default: () => <div data-testid="trending-contents" />,
}))

vi.mock('@/components/global/FashionDesignersPage', () => ({
  default: () => <div data-testid="fashion-page" />,
}))

vi.mock('@/components/global/FrequentlyAskedQuestions', () => ({
  default: () => <div data-testid="faqs-content" />,
}))
vi.mock('@/components/dashboard/client/ClientEditProfileForm', () => ({
  default: () => <div data-testid="client-test" />,
}))

vi.mock('@/components/global/notifications/Notifications', () => ({
  default: () => <div data-testid="notifications-content" />,
}))

vi.mock('@/components/global/Image', () => ({
  default: (props) => <img {...props} />,
}))

vi.mock('@/components/dashboard/profile/Profile', () => ({
  default: () => <div data-testid="profile-content" />,
}))

vi.mock('@/components/dashboard/creator/subscription/SubscriptionHistory', () => ({
  default: () => <div data-testid="subscription-history" />,
}))

vi.mock('@/components/dashboard/post/Post', () => ({
  default: () => <div data-testid="post-content" />,
}))

vi.mock('@/components/dashboard/bookings/Bookings', () => ({
  default: () => <div data-testid="bookings-content" />,
}))

vi.mock('@/components/dashboard/creator/subscription/ShowSubscription', () => ({
  default: () => <div data-testid="show-subscription-content" />,
}))

vi.mock('@/components/dashboard/creator/subscription/ProceedSubscription', () => ({
  default: () => <div data-testid="proceed-subscription-content" />,
}))

vi.mock('@/components/global/EditProfileForm', () => ({
  default: () => <div data-testid="edit-profile-form" />,
}))

vi.mock('@/components/dashboard/profile/creator/PostForm', () => ({
  default: () => <div data-testid="post-form" />,
}))

vi.mock('@/components/dashboard/profile/MyPost', () => ({
  default: () => <div data-testid="my-post" />,
}))

vi.mock('@/components/dashboard/client/appointments/Appointments', () => ({
  default: () => <div data-testid="appointments-content" />,
}))

vi.mock('@/components/dashboard/client/appointments/Appointments', () => ({
  default: () => <div data-testid="appointments-content" />,
}))

vi.mock('@/components/dashboard/client/appointments/BookAppointment', () => ({
  default: () => <div data-testid="book-appointment-content" />,
}))

vi.mock('@/components/dashboard/client/payment/ClientPayment', () => ({
  default: () => <div data-testid="client-payment-content" />,
}))

vi.mock('@/pages/creator/Subscriptions', () => ({
  default: () => <section data-testid="subscriptions-page" />,
}))

vi.mock('@/pages/client/TaskPaymentPage', () => ({
  default: () => <section data-testid="task-payment-page" />,
}))

vi.mock('@/components/admin/creator/subscription/CreatorSubscriptions', () => ({
  default: () => <div data-testid="creator-subscriptions-content" />,
}))

vi.mock('@/components/admin/creator/payment/CreatorPayments', () => ({
  default: () => <div data-testid="creator-payments-content" />,
}))

vi.mock('@/components/admin/shared/LastSeen', () => ({
  default: () => <div data-testid="last-seen" />,
}))

vi.mock('@Components/dashboard/profile/MyPost',()=>({
  default:()=> <div data-testid="my-posts" />
}))

vi.mock('@/components/dashboard/client/payment/ConfirmPayment',()=>({
  default:()=> <div data-testid="confirm-mock" />
}))

// ---- helper ----

const createRouter = (initialEntries = ["/"]) =>
  createMemoryRouter(router.routes, { initialEntries })

const routeProvider = (route) =>
  render(
    <CustomQueryClientProvider>
      <RouterProvider router={createRouter([route])} />
    </CustomQueryClientProvider>
  )

// ---- tests ----

describe("Routing", () => {

  // ---- client ----
  
  it("should render client profile page", async () => {
    routeProvider("/client/profile")
    expect(await screen.findByTestId("profile-page")).toBeInTheDocument()
  })

  it("should render liked posts page", async () => {
    routeProvider("/client/likedPosts")
    expect(await screen.findByTestId("liked-posts")).toBeInTheDocument()
  })

  it("should render appointment details page", async () => {
    routeProvider("/client/appointmentDetails")
    expect(await screen.findByTestId("appointment-details")).toBeInTheDocument()
  })

  it("should render settings page", async () => {
    routeProvider("/client/settings")
    expect(await screen.findByTestId("settings-page")).toBeInTheDocument()
  })

  it("should render book appointment page", async () => {
    routeProvider("/client/bookAppointment")
    expect(await screen.findByTestId("book-appointment")).toBeInTheDocument()
  })

  it("should render client payment page", async () => {
    routeProvider("/client/payment/test/1/2")
    expect(await screen.findByTestId("client-payment-page")).toBeInTheDocument()
  })

  it("should render sucessful payment page", async () => {
    routeProvider("/client/payverify")
    expect(await screen.findByTestId("client-successful-payment")).toBeInTheDocument()
  })
  it("should render edit client page", async () => {
    routeProvider("/client/profile/edit")
    expect(await screen.findByTestId("client-edit-profile-page")).toBeInTheDocument()
  })
  it("should render client confirm payment page", async () => {
    routeProvider("/client/payment/uthman/3/2/confirm_payment")
    expect(await screen.findByTestId("client-confirm-payment-page")).toBeInTheDocument()
  })


})

 













//   // ---- 404 ----

//   it("should render 404 page", async () => {
//     routeProvider("/unknown-route")
//     expect(await screen.findByTestId("not-found")).toBeInTheDocument()
//   })