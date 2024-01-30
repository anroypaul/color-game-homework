import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    login(formData)
      .then(() => {
        navigate(state?.path || '/game');
      })
      .catch((error) => setError(error));
  };

  return (
    <Box
      display="grid"
      gap={1}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" component="h2">
        Login
      </Typography>
      {error && (
        <Typography variant="body1" component="h2" color="red">
          {error}
        </Typography>
      )}
      <TextField
        required
        label="Email"
        variant="standard"
        name="email"
        type="email"
        value={formData.email}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        required
        label="Password"
        variant="standard"
        type="password"
        name="password"
        autoComplete="current-password"
        value={formData.password}
        fullWidth
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleLogin}>
        Log in
      </Button>
    </Box>
  );
};

export default LoginPage;
