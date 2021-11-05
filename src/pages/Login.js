import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Stack
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yellow } from '@material-ui/core/colors';
import { styled } from '@material-ui/styles'


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('hireoo');
  const [password, setPassword] = useState('123456');

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const input_data = {};
    input_data['username'] = username;
    input_data['password'] = password;

    axios
      .post('/token/', input_data)
      .then((res) => {
        window.localStorage.setItem('token', res.data.access);
        console.log('login local store', localStorage.getItem('token'));
        navigate('/app/dashboard', { replace: true });
      })
      .catch((err) => {
        console.log('err msg', err);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'Background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container
          sx={{
            textAlign: 'center',
            paddingTop: '20%'
          }}
        >
          <Grid
            container
            spacing={5}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item paddingLeft={0}>
              <Typography variant={'h1'}>Login</Typography>
            </Grid>
            <Grid item>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                  <TextField
                    label="username"
                    defaultValue={username}
                    onChange={handleUsername}
                  />
                  <TextField
                    label="password"
                    type="password"
                    onChange={handlePassword}
                  />
                  <Button type="submit">Login </Button>
              </Stack>
            </form>
          </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Login;
