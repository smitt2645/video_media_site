import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  createRoutesFromElements,
  Route,
  useRouteError,
  Link,
} from "react-router-dom";
import { Layout } from "./outlet/Layout.jsx";
import { Dashboard, Login, Register, ProfileSettings } from "./pages/index.js";
import ProtectedRoute from "./outlet/ProtectedRoute.jsx";
import setupLocatorUI from "@locator/runtime";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

if (import.meta.env.DEV) {
  setupLocatorUI();
}

const ErrorRoter = () => {
  const error = useRouteError();
  console.log("error", error);
  return (
    <>
      <h1>Something went wrong 😬</h1>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Go back home</Link>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorRoter />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Route>
      {/* <Route path="users" element={<Users />} /> */}
      {/* <Route path="users/:userId" element={<UserDetail />} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
