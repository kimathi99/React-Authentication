import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#4caf50',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function  ResetPassword() {
 
  const [errors, setErrors] = useState({});
  const [success, setsuccess] = useState({});
  const [formData, setFormData] = useState({    
    password: '',
    confirm_password:'',
    token:'',
    uid64:''
  });
 
 

  const navigate =useNavigate();

  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.password !== formData.confirm_Password) {
      setErrors('Passwords do not match');
      return;
    }
    setErrors({});    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/reset_password/', requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if(response.status === 200){
          return response.json().then(data => {
            setsuccess(data);
            alert("operation sucess"); 
            navigate('/logout', {replace: true});
          });          
          
        }
        else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{padding :2, elevation: 60}}> 
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgb(223,3,3)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password[0] : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              error={errors.confirm_password ? true : false}
              helperText={errors.confirm_password ? errors.confirm_password[0] : ''}
            />           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color: 'white' }}
            >
            Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgotPassword' variant="body2" color='#4aaf51'>
                  
                </Link>
              </Grid>
              <Grid item>
                <Link to='/forgotPassword' variant="body2" color ='#4aaf51' >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
  );
}
export default ResetPassword