import { lazy } from "react"
// import Dashboard from "./dashboard/Dashboard"


const Dashboard = lazy(()=> import("./dashboard/Dashboard"));
const Login = lazy(()=> import("./Auth/Login"));
const Register = lazy(()=> import("./Auth/Register"));
const ProtectedRoute =  import(".././outlet/ProtectedRoute");

export {Dashboard,Login,Register,ProtectedRoute};