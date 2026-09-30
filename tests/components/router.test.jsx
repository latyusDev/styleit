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

vi.mock('@/components/admin/shared/userInfo/UserInformation', () => ({
  default: () => <div data-testid="user-information" />,
}))

vi.mock('@/pages/admin/creator/AdminCreatorsPage', () => ({
  default: () => <section data-testid="admin-creators" />,
}))

vi.mock('@/pages/admin/creator/CreatorSingleSubscriptionPage', () => ({
  default: () => <section data-testid="admin-single-creator-subscription" />,
}))

vi.mock('@/pages/admin/creator/CreatorSinglePaymentsPage', () => ({
  default: () => <section data-testid="admin-single-creator-payment" />,
}))

vi.mock('@/components/home/Designer', () => ({
  default: () => <div data-testid="designer" />,
}))

vi.mock('@/components/home/Trending', () => ({
  default: () => <div data-testid="home-trending" />,
}))

vi.mock('@/components/home/NewLetter', () => ({
  default: () => <div data-testid="newsletter" />,
}))

vi.mock('@/components/home/HappyClient', () => ({
  default: () => <div data-testid="happy-client" />,
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
  it("should render home page", async () => {
    routeProvider("/")
    expect(await screen.findByTestId("home-page")).toBeInTheDocument()
  })

  it("should render trending page", async () => {
    routeProvider("/trending")
    expect(await screen.findByTestId("trending-page")).toBeInTheDocument()
  })

  it("should render fashion designers page", async () => {
    routeProvider("/fashionDesigners")
    expect(await screen.findByTestId("fashion-page")).toBeInTheDocument()
  })

  it("should render login page", async () => {
    routeProvider("/login")
    expect(await screen.findByTestId("login-page")).toBeInTheDocument()
  })

  it("should render signup page", async () => {
    routeProvider("/signUp")
    expect(await screen.findByTestId("signUp-page")).toBeInTheDocument()
  })

  it("should render faqs page", async () => {
    routeProvider("/faqs")
    expect(await screen.findByTestId("faqs-page")).toBeInTheDocument()
  })

  it("should render notifications page", async () => {
    routeProvider("/notifications")
    expect(await screen.findByTestId("notifications-page")).toBeInTheDocument()
  })

  // ---- creator ----

  it("should render creator profile page", async () => {
    routeProvider("/creator/profile")
    expect(await screen.findByTestId("profile-page")).toBeInTheDocument()
  })

  it("should render creator bookings page", async () => {
    routeProvider("/creator/bookings")
    expect(await screen.findByTestId("bookings-page")).toBeInTheDocument()
  })

  it("should render creator posts page", async () => {
    routeProvider("/creator/posts")
    expect(await screen.findByTestId("posts-page")).toBeInTheDocument()
  })

  it("should render creator history page", async () => {
    routeProvider("/creator/history")
    expect(await screen.findByTestId("history-page")).toBeInTheDocument()
  })

  it("should render creator subscriptions page", async () => {
    routeProvider("/creator/subscriptions")
    expect(await screen.findByTestId("subscriptions-page")).toBeInTheDocument()
  })

  it("should render single subscription page", async () => {
    routeProvider("/creator/subscriptions/1")
    expect(await screen.findByTestId("show-subscription")).toBeInTheDocument()
  })

  it("should render proceed subscription page", async () => {
    routeProvider("/creator/subscriptions/1/proceed")
    expect(await screen.findByTestId("proceed-subscription")).toBeInTheDocument()
  })

  it("should render creator edit profile page", async () => {
    routeProvider("/creator/profile/edit")
    expect(await screen.findByTestId("edit-profile-page")).toBeInTheDocument()
  })

  it("should render create post page", async () => {
    routeProvider("/creator/create-post")
    expect(await screen.findByTestId("create-post-page")).toBeInTheDocument()
  })

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

  it("should render task payment page", async () => {
    routeProvider("/client/taskPayment")
    expect(await screen.findByTestId("task-payment-page")).toBeInTheDocument()
  })

  // ---- admin ----

  it("should render admin creators page", async () => {
    routeProvider("/admin/creators")
    expect(await screen.findByTestId("admin-creators")).toBeInTheDocument()
  })

  it("should render admin creator subscriptions page", async () => {
    routeProvider("/admin/creators/subscriptions")
    expect(await screen.findByTestId("admin-creator-subscription")).toBeInTheDocument()
  })

  it("should render admin single creator subscription page", async () => {
    routeProvider("/admin/creators/subscriptions/1/s")
    expect(await screen.findByTestId("admin-single-creator-subscription")).toBeInTheDocument()
  })

  it("should render admin creator payments page", async () => {
    routeProvider("/admin/creators/payments")
    expect(await screen.findByTestId("admin-creator-payment")).toBeInTheDocument()
  })

  it("should render admin single creator payment page", async () => {
    routeProvider("/admin/creators/payments/1/p")
    expect(await screen.findByTestId("admin-single-creator-payment")).toBeInTheDocument()
  })

  it("should render admin creator profile page", async () => {
    routeProvider("/admin/creators/1/profile/ct")
    expect(await screen.findByTestId("admin-creator-profile")).toBeInTheDocument()
  })

  it("should render admin client profile page", async () => {
    routeProvider("/admin/clients/1/profile/cn")
    expect(await screen.findByTestId("admin-client-profile")).toBeInTheDocument()
  })

    it("should render home page", async () => {
        routeProvider("/")
        expect(await screen.findByTestId("home-page")).toBeInTheDocument()
      })
})

 













//   // ---- 404 ----

//   it("should render 404 page", async () => {
//     routeProvider("/unknown-route")
//     expect(await screen.findByTestId("not-found")).toBeInTheDocument()
//   })