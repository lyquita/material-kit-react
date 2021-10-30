import { Box, Container, TextField, Typography, Button } from '@material-ui/core';
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () =>{
const navigate = useNavigate();
const [username, setUsername] = useState('hireoo')
const [password, setPassword] = useState('123456')

function handleUsername(e){
  setUsername(e.target.value)
}

function handlePassword(e){
  setPassword(e.target.value)
}

function handleSubmit(e){
  e.preventDefault()

  const input_data = {}
  input_data['username'] = username;
  input_data['password'] = password

  axios.post('/token/', input_data)
  .then(
    res => {
      window.localStorage.setItem('token', res.data.access)
      console.log('login local store', localStorage.getItem('token'))
      navigate('/app/dashboard', {replace:true})
    }
  )
  .catch(
    err => {
      console.log('err msg', err)
    }
  )

}

  return(
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <Box sx={{
      backgroundColor:'Background.default',
      minHeight: '100%',
      py:3
    }}>
      <Container sx={{
        textAlign: 'center',
        paddingTop: '20%'

      }} >
      <Typography style={{marginBottom:15, fontSize:30}}> Login </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="username" defaultValue={username} onChange={handleUsername}/>
        <TextField label="password" type="password" onChange={handlePassword}/>
        <Button type="submit">Login </Button>
      </form>
      </Container>
    </Box>
    </>
  )
}

export  default Login;