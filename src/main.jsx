import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" richColors />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SkeletonTheme>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
