import React, { useContext,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth';
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

function  Otp() {
  let {regemail }=useContext(AuthContext)
  const[formData, setFormData] = useState({ email: regemail, code: ''  });
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
  };

  const navigate =useNavigate();

  const handleSubmit=(event)  => {
    event.preventDefault(); 
    setErrors({});        
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/account/verify/', requestOptions)
    .then(response => {
      if (response.status === 400) {
        return response.json().then(data => {
          setErrors(data);
          throw new Error('Bad Request');
        });
      } else if (response.status === 200) {
        return response.json().then(data => {
          
          alert("Your Account is active !!"); 
          localStorage.removeItem('regemail');
          navigate('/login', {replace: true});;
        });
      } else {
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
            Verify
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="OTP CODE"
              type="text"
              name="code"
              value={formData.code }
              onChange={handleInputChange}
              error={errors.code ? true : false}
              helperText={errors.code ? errors.code[0] : ''}
              
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color: 'white' }}
            >
              submit
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

export default Otp;