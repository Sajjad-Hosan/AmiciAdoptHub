import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetListing from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetDetails/PetDetails";
import DonationPage from "../pages/DonationPage/DonationPage";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AddPet from "../dashBoardPages/AddPet/AddPet";
import AddedPets from "../dashBoardPages/AddedPets/AddedPets";
import PetUpdate from "../dashBoardPages/PetUpdate/PetUpdate";
import CreateCamPaign from "../dashBoardPages/CreateCamPaign/CreateCamPaign";
import DonationCampaigns from "../dashBoardPages/DonationCampaigns/DonationCampaigns";
import CampaignUpdate from "../dashBoardPages/CampaignUpdate/CampaignUpdate";
import MyDonations from "../dashBoardPages/MyDonations/MyDonations";
import AdoptedRequest from "../dashBoardPages/AdoptedRequest/AdoptedRequest";
import AdminUsers from "../dashBoardPages/AdminUsers/AdminUsers";
import AdminPets from "../dashBoardPages/AdminPets/AdminPets";
import AdminDonations from "../dashBoardPages/AdminDonations/AdminDonations";
import PrivateRoute from "../service/PrivateRoute/PrivateRoute";
import AdminRoute from "../service/AdminRoute/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pet_listing",
        element: <PetListing />,
      },
      {
        // TODO: id will be add on the path name
        path: "/pet_detail/:id",
        loader: ({ params }) =>
          fetch(
            `https://amici-adopt-hub-server.vercel.app/pet_info/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation_page",
        element: <DonationPage />,
      },
      {
        // TODO: Id will be on the path name
        path: "/donation_details/:id",
        element: (
          <PrivateRoute>
            {" "}
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/pet_update/:id",
        loader: ({ params }) =>
          fetch(
            `https://amici-adopt-hub-server.vercel.app/pet_info/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <PetUpdate />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // user pages routes
      {
        path: "add_pet",
        element: <AddPet />,
      },
      {
        path: "added_pets",
        element: <AddedPets />,
      },
      {
        path: "adoption_request",
        element: <AdoptedRequest />,
      },
      {
        path: "pet_details/:id",
        loader: ({ params }) =>
          fetch(
            `https://amici-adopt-hub-server.vercel.app/pet_info/${params.id}`
          ),
        element: <PetDetails />,
      },
      {
        path: "pet_update/:id",
        loader: ({ params }) =>
          fetch(
            `https://amici-adopt-hub-server.vercel.app/pet_info/${params.id}`
          ),
        element: <PetUpdate />,
      },
      {
        path: "create_campaign",
        element: <CreateCamPaign />,
      },
      {
        path: "donation_campaign",
        loader: () =>
          fetch("https://amici-adopt-hub-server.vercel.app/donations_count"),
        element: <DonationCampaigns />,
      },
      {
        path: "campaign_update/:id",
        loader: ({ params }) =>
          fetch(
            `https://amici-adopt-hub-server.vercel.app/donation_info/${params.id}`
          ),
        element: <CampaignUpdate />,
      },
      {
        path: "my_donations",
        loader: () =>
          fetch("https://amici-adopt-hub-server.vercel.app/donations_count"),
        element: <MyDonations />,
      },
      // admin pages routes
      {
        path: "admin_users",
        element: (
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin_pets",
        loader: () =>
          fetch("https://amici-adopt-hub-server.vercel.app/pets_count"),
        element: (
          <AdminRoute>
            <AdminPets />
          </AdminRoute>
        ),
      },
      {
        path: "admin_donations",
        loader: () =>
          fetch("https://amici-adopt-hub-server.vercel.app/donations_count"),
        element: (
          <AdminRoute>
            {" "}
            <AdminDonations />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //   {
  //     path: "/dashboard",
  //     element: <div></div>,
  //     children: [
  //       {
  //         path: "user_home",
  //         element: <div></div>,
  //       },
  //     ],
  //   },
]);

export default router;
