import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./features/Layout";
import { Home } from "./pages/Home";
import { Tours } from "./pages/Tours";
import { About } from "./pages/About";
import { SpecificTour } from "./pages/SpecificTour";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { LogIn } from "./pages/LogIn";
import { ScrollToTop } from "./features/ScrollToTop";
import { WrongPage } from "./pages/WrongPage";
import { Overview } from "./features/Overview";
import { Itinerary } from "./features/Itinerary";
import { MeetingPoint } from "./features/MeetingPoint";
import { Dates } from "./features/Dates";
import { ReviewsTour } from "./features/ReviewsTour";
import { ProfileLayout } from "./features/ProfileLayout";
import { PurchasedTour } from "./pages/PurchasedTour";
import AddTour from "./pages/dashboard/tour/AddTour.tsx";
import ListTour from "./pages/dashboard/tour/ListTour.tsx";
import UpdateTour from "./pages/dashboard/tour/UpdateTour.tsx";
import AdminDashboard from "./pages/components/AdminDashboard.tsx";
import AddBike from "./pages/dashboard/bike/AddBike.tsx";
import ListBike from "./pages/dashboard/bike/ListBike.tsx";
import UpdateBike from "./pages/dashboard/bike/UpdateBike.tsx";
import ListUser from "./pages/dashboard/user/ListUser.tsx";
import AddNewUser from "./pages/dashboard/user/AddNewUser.tsx";
import DashboardReport from "./pages/dashboard/DashboardReport.tsx";
import AddReview from "./pages/dashboard/review/AddReview.tsx";
import ListReviews from "./pages/dashboard/review/ListReviews.tsx";
import UpdateReviews from "./pages/dashboard/review/UpdateReviews.tsx";
import UpdateUser from "./pages/dashboard/user/UpdateUser.tsx";
import * as React from "react";
import ListBooking from "./pages/dashboard/booking/ListBooking.tsx";
import {ForgotPassword} from "./pages/ForgotPassword.tsx";
import {ResetPassword} from "./pages/ResetPassword.tsx";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<WrongPage />} />
          <Route index element={<Home />} />
          <Route path="tours" element={<Tours />} />
          <Route path="about" element={<About />} />
          <Route element={<ProfileLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="order/:orderId" element={<PurchasedTour />} />
          </Route>
          <Route path="tours/:id" element={<SpecificTour />}>
            <Route index element={<Overview />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="meeting" element={<MeetingPoint />} />
            <Route path="dates" element={<Dates />} />
            <Route path="reviews" element={<ReviewsTour />} />
          </Route>
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />



        {localStorage.getItem("role")==="Admin" && <Route path="dashboard//*" element={<AdminDashboard />} >

          <Route path="home" element={<DashboardReport />} />

          <Route path="tour/create" element={<AddTour />} />
          <Route path="tour/list" element={<ListTour />} />
          <Route path="tour/update/:id" element={<UpdateTour />} />

          <Route path="bike/add" element={<AddBike />} />
          <Route path="bike/list" element={<ListBike />} />
          <Route path="bike/update/:id" element={<UpdateBike/>} />

          <Route path="testimonial/add" element={<AddReview />} />
          <Route path="testimonial/list" element={<ListReviews />} />
          <Route path="testimonial/update/:id" element={<UpdateReviews/>} />

          <Route path="user/list" element={<ListUser />} />
          <Route path="user/add" element={<AddNewUser />} />
          <Route path="user/update/:id" element={<UpdateUser />} />

          <Route path="booking/list" element={<ListBooking />} />

        </Route>}



      </Routes>
    </BrowserRouter>
  );
}

export default App;
