import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  VisibilityOff,
  Visibility,
  LockOutlined,
  PersonOutline,
  EmailOutlined,
  Google as GoogleIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginUser, registerUser } from '../../features/auth/authSlice';
import axios from 'axios';

// ==========================================
// LOGIN PAGE
// ==========================================

const Login = () => {
  const dispatch = useDispatch();
  // const  = useSelector(state=>state);
  // const auth = useSelector(state => state.auth);
// const user = useSelector(state => state.auth);
// console.log("user:",user)
const user = useSelector((state)=> state.auth)
useEffect(()=>{
  if(user.isAuthenticated){
    // console.log(,user)
    navigate("/dashboard");
    return
  }else{
    navigate("/login");
    return
  }
},[user]);
console.log("user:",user)
  // console.log("auth:",auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username:''
  });
  console.log("formData::::::",formData)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Your login API call here
      // const response = await loginAPI(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login data:', formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    navigate("/register");
    dispatch(registerUser({

              }))
  }
const handleLogin = async (e,cred)=>{
  e.preventDefault();
  console.log("cred:::::",cred)
  console.log("comes ???")
  try {
    // const token = localStorage.getItem("token");
    const loginRes = await axios.post("http://localhost:8002/api/v1/user/login",{username:cred.username,password:cred.password},{
      withCredentials:true,
      // headers:{
      //   Authorization:`Bearer ${token}`
      // }
    });
    
    console.log("data:",loginRes.data.data.user);
    console.log("accessToken:",loginRes?.data?.data?.generateAccessToken);
    console.log("API RES token:",loginRes?.data?.data.generateAccToken)
    dispatch(loginUser({user:loginRes?.data?.data?.user || null,success:loginRes?.data?.success,token:loginRes?.data?.data?.generateAccToken}))
    
  } catch (error) {
    localStorage.clear();
    console.log(error); 
  }
  //  dispatch(login({
  //               username:"aman",
  //               password:"aman123"
  //             }))
}
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2
              }}
            >
              {/* <img src={}></img> */}
              {/* <LockOutlined sx={{ color: 'white', fontSize: 30 }} /> */}
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome Back {user?.user?.username }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link
                href="/forgot-password"
                variant="body2"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              // type="submit"
              variant="contained"
              size="large"
              onClick={(e)=>handleLogin(e,formData)}
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ py: 1 }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{ py: 1 }}
              >
                GitHub
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  // href="/register"
                  sx={{
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    color: 'primary.main'
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default Login;