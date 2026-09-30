import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import TrendingPage from './pages/TrendingPage';
import Subscriptions from './pages/creator/Subscriptions';
import History from './pages/creator/History';
import CreatorLayout from './layouts/CreatorLayout';
import ProfilePage from './pages/creator/ProfilePage';
import BookingPage from './pages/creator/BookingPage';
import PostPage from './pages/creator/PostPage';
import ClientLayout from "./layouts/ClientLayout";
import AppointmentDetails from "./pages/client/AppointmentDetails";
import LikedPosts from "./pages/client/LikedPosts";
import Settings from "./pages/client/Settings";
import BookAppointmentPage from "./pages/client/BookAppointmentPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminCreatorLayout from "./layouts/AdminCreatorLayout";
import AdminCreatorsPage from "./pages/admin/creator/AdminCreatorsPage";
import AdminCreatorProfilePage from "./pages/admin/creator/AdminCreatorProfilePage";
import CreatorSubscriptionPage from "./pages/admin/creator/CreatorSubscriptionPage";
import CreatorSingleSubscriptionPage from "./pages/admin/creator/CreatorSingleSubscriptionPage";
import CreatorPaymentPage from "./pages/admin/creator/CreatorPaymentsPage";
import CreatorSinglePaymentPage from "./pages/admin/creator/CreatorSinglePaymentsPage";
import AdminClientLayout from "./layouts/AdminClientLayout";
import AdminClientsPage from "./pages/admin/client/AdminClientsPage";
import AdminClientBookingPage from "./pages/admin/client/AdminClientBookingPage";
import AdminSingleClientBookingPage from "./pages/admin/client/AdminSingleClientBookingPage";
import AdminClientComplaints from "./pages/admin/client/AdminClientComplaints";
import AdminClientProfilePage from "./pages/admin/client/AdminClientProfilePage";
import AdminPage from "./pages/admin/admin/AdminPage";
import SuperAdminPage from "./pages/admin/superAdmin/SuperAdminPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AccountVerificationPage from "./pages/auth/AccountVerificationPage";
import ResendActivationLinkPage from "./pages/auth/ResendActivationLinkPage";
import ViewTrendingPost from "./pages/ViewTrendingPost";
import CreatePostPage from "./pages/creator/CreatePostPage";
import FrequentlyAskedQuestionsPage from "./pages/FrequentlyAskedQuestionsPage";
import ClientPaymentPage from "./pages/client/ClientPaymentPage";
import AdminLoginPage from "./pages/admin/admin/AdminLoginPage";
import FashionDesignersPage from "./pages/FashionDesignersPage";
import NotFound from "./pages/NotFound";
import DescriptionPage from "./pages/creator/DescriptionPage";
import AdminSignUpPage from "./pages/admin/admin/AdminSignUpPage";
import NotificationPage from "./pages/NotificationPage";
import ForgottenPasswordPage from "./pages/auth/ForgottenPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SuccessfulPaymentPage from "./pages/client/SuccessfulPaymentPage";
import ClientConfirmPaymentPage from "./pages/client/ClientConfirmPaymentPage ";
import ShowSubscriptionPage from "./pages/creator/ShowSubscriptionPage";
import ProceedSubscriptionPage from "./pages/creator/ProceedSubscriptionPage";
import UploadNinPage from "./pages/auth/UploadNinPage";
import AwaitingApprovals from "./components/admin/creator/AwaitingApproval/AwaitingApprovals";
import ApprovedCreator from "./components/admin/creator/AwaitingApproval/ApprovedCreator";
import SuccessfulSubscriptionPage from "./pages/creator/SuccessfulSubscriptionPage";
import OtpForm from "./components/admin/creator/OtpForm";
import RepresentativeSignUpFormPage from "./pages/representative/RepresentativeSignUpFormPage";
import RepresentativeLoginFormPage from "./pages/representative/RepresentativeLoginFormPage";
import RepresentativesPage from "./pages/admin/representative/RepresentativesPage";
import AdminRepresentativeLayout from "./layouts/AdminRepresentativeLayout";
import AdminRepresentativeProfilePage from "./pages/admin/admin/AdminRepresentativeProfilePage";
import RepresentativeLayout from "./layouts/RepresentativeLayout";
import RepresentativeProfilePage from "./pages/representative/RepresentativeProfilePage";
import RepresentativeReferralsPage from "./pages/representative/RepresentativeReferralsPage";
import ClientEditProfilePage from "./pages/client/ClientEditProfilePage";
import CreatorEditProfilePage from "./pages/creator/CreatorEditProfilePage";
import MailNotificationPage from "./pages/admin/superAdmin/MailNotificationPage";
import AdminClientTransactionPage from "./pages/admin/client/AdminClientTransactionPage";
import AllTransactionPage from "./pages/admin/AllTransactionPage";
import DirectBookingPage from "./pages/client/DirectBookingPage";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/admin/resetPassword" element={<ResetPasswordPage/>}/>
          <Route path="/admin/forgottenPassword" element={<ForgottenPasswordPage/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
          <Route path="/admin/reset-password/:token" element={<ResetPasswordPage/>}/>
          <Route path="/user/forgottenPassword" element={<ForgottenPasswordPage/>}/>
          <Route path="/ninUpload" element={<UploadNinPage/>}/>
          <Route path='/user/:id/creatorDescriptions' element={<DescriptionPage/>} />
          <Route path="/representativeSignup" element={<RepresentativeSignUpFormPage/>}/>
          <Route path="/representative/login" element={<RepresentativeLoginFormPage/>}/>

          <Route path="/notifications" element={< NotificationPage/>}/>
          <Route path='/trending' element={<TrendingPage/>} />
          <Route path='/trending/:id' element={<ViewTrendingPost/>} />
          <Route path='/faqs' element={<FrequentlyAskedQuestionsPage/>} />
          <Route path='/fashionDesigners' element={<FashionDesignersPage/>} />
            <Route path='verifyAccount' element={<AccountVerificationPage/>} />
            <Route path='resendVerificationLink' element={<ResendActivationLinkPage/>} />

            {/* creator */}
          <Route path='/creator' element={<CreatorLayout/>}>
            <Route path='profile' element={<ProfilePage/>} />
            <Route path='create-post' element={<CreatePostPage/>} />
            <Route path='profile/edit' element={<CreatorEditProfilePage/>} />
            <Route path='bookings' element={<BookingPage/>} />
            <Route path='posts' element={<PostPage/>} />
            <Route path='history' element={<History/>} />
            <Route path='subscriptions' element={<Subscriptions/>} />
            <Route path='subscriptions/success' element={<SuccessfulSubscriptionPage/>} />
            <Route path='subscriptions/:id' element={<ShowSubscriptionPage/>} />
            <Route path='subscriptions/:id/proceed' element={<ProceedSubscriptionPage/>} />
          </Route>

          {/* client */}
          <Route path='/client' element={<ClientLayout/>}>
            
            <Route path='payverify' element={<SuccessfulPaymentPage/>} />
            <Route path='profile' element={<ProfilePage/>} />
            <Route path='profile/edit' element={<ClientEditProfilePage/>} />
            <Route path='likedPosts' element={<LikedPosts/>} />
            <Route path='appointmentDetails' element={<AppointmentDetails/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='bookAppointment' element={<BookAppointmentPage/>} />
            <Route path='directBooking' element={<DirectBookingPage/>} />
            <Route path='payment/:name/:bookingId/:designerId' element={<ClientPaymentPage/>} />
            <Route path='payment/:name/:bookingId/:designerId/confirm_payment' element={<ClientConfirmPaymentPage/>} />
          </Route>

          {/* representative */}
          <Route path='/representative' element={<RepresentativeLayout/>}>
            
            <Route index path='profile' element={<RepresentativeProfilePage/>} />
            <Route path='referrals' element={<RepresentativeReferralsPage/>} />
            
          </Route>
          
          {/* admin */}
            <Route path='/admin/login' element={<AdminLoginPage/>} />
            <Route path='/admin' element={<AdminLayout/>}>
            {/* admin representative */}

                <Route path="all transfer" element={<AllTransactionPage/>}/>
            <Route path='representatives' element={<AdminRepresentativeLayout/>} >
                <Route index element={<RepresentativesPage/>}/>
                <Route path="profile/:referCode" element={<AdminRepresentativeProfilePage/>}/>
                <Route path="profile/:referCode/referrals" element={<RepresentativeReferralsPage/>} />
            </Route>

            {/* admin client */}

            <Route path='clients' element={<AdminClientLayout/>} >
                <Route index element={<AdminClientsPage/>}/>
                <Route path="bookings" element={<AdminClientBookingPage/>}/>
                <Route path="transaction payments" element={<AdminClientTransactionPage/>}/>
                <Route path="bookings/:id/b" element={<AdminSingleClientBookingPage/>}/>
                <Route path=":id/profile/cn" element={<AdminClientProfilePage/>}/>
                <Route path="complaints & disputes" element={<AdminClientComplaints/>}/>
            </Route>
            <Route path='dashboard'  element={<AdminDashboardLayout/>} >
              <Route index element={<DashboardPage/>} />
              <Route path=":id/profile" element={<AdminPage/>} />
              <Route path=":id/b" element={<AdminSingleClientBookingPage/>} />
              <Route path=":id/p" element={<CreatorSinglePaymentPage/>} />
              <Route path=":id/s" element={<CreatorSingleSubscriptionPage/>} />
              <Route path=":id/profile/ct" element={<AdminClientProfilePage/>} />
              <Route path=":id/profile/cn" element={<AdminCreatorProfilePage/>} />
            </Route>

            {/* admin creator */}
            <Route path='creators' element={<AdminCreatorLayout/>} >
                <Route index element={<AdminCreatorsPage/>}/>
                <Route path="subscriptions" element={<CreatorSubscriptionPage/>}/>
                <Route path="subscriptions/:id/s" element={<CreatorSingleSubscriptionPage/>}/>
                <Route path=":id/profile/ct" element={<AdminCreatorProfilePage/>}/>
                <Route path="payments" element={<CreatorPaymentPage/>}/>
                <Route path="payments/:id/p" element={<CreatorSinglePaymentPage/>}/>
                <Route  path="awaitingApproval" element={<AwaitingApprovals/>}/>
                <Route  path="awaitingApproval/:refNumber" element={<ApprovedCreator/>}/>
                <Route  path="awaitingApproval/:refNumber/finalize" element={<OtpForm/>}/>
            </Route>


                <Route  path="my profile" element={<AdminPage/>}/>
                <Route  path="signUp" element={<AdminSignUpPage/>}/>
          
            <Route path='superAdmin' element={<AdminClientLayout/>} >
                <Route index element={<SuperAdminPage/>}/>
                <Route path='mailNotification' element={<MailNotificationPage/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>} />
      </Route>
    )
)

export default router 
