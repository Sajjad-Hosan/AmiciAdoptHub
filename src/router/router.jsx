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
        path: "/pet_detail",
        element: <PetDetails />,
      },
      {
        path: "/donation_page",
        element: <DonationPage />,
      },
      {
        // TODO: Id will be on the path name
        path: "/donation_details",
        element: <DonationDetails />,
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
      // admin pages routes
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
