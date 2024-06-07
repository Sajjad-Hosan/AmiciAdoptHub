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
import useAuth from "../hooks/useAuth";
import MyDonations from "../dashBoardPages/MyDonations/MyDonations";
import AdoptedRequest from "../dashBoardPages/AdoptedRequest/AdoptedRequest";
import AdminUsers from "../dashBoardPages/AdminUsers/AdminUsers";

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
          fetch(`http://localhost:1000/pet_info/${params.id}`),
        element: <PetDetails />,
      },
      {
        path: "/donation_page",
        element: <DonationPage />,
      },
      {
        // TODO: Id will be on the path name
        path: "/donation_details/:id",
        element: <DonationDetails />,
      },
      {
        path: "/pet_update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:1000/pet_info/${params.id}`),
        element: <PetUpdate />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
          fetch(`http://localhost:1000/pet_info/${params.id}`),
        element: <PetDetails />,
      },
      {
        path: "pet_update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:1000/pet_info/${params.id}`),
        element: <PetUpdate />,
      },
      {
        path: "create_campaign",
        element: <CreateCamPaign />,
      },
      {
        path: "donation_campaign",
        element: <DonationCampaigns />,
      },
      {
        path: "campaign_update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:1000/donation_info/${params.id}`),
        element: <CampaignUpdate />,
      },
      {
        path: "my_donations",
        element: <MyDonations />,
      },
      // admin pages routes
      {
        path: "admin_users",
        element: <AdminUsers />,
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
