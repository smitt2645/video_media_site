import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from './Layout';

const ProtectedRoute = () => {
  const auth = useSelector(state => state);
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute auth:", auth);

  if (!auth.isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;
