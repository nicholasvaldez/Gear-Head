import { ThemeProvider } from "@emotion/react"
import { Avatar, Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider1 } from '@mui/material/styles';
import { LockOutlined } from "@mui/icons-material"

export const Register = (props) => {
     const [user, setUser] = useState({
        email: "",
        name: "",
        instrumentOptionsId: 0
    })

    const [dropdownItem, setDropdownItem] = useState([])


    let navigate = useNavigate()

    const registerNewUser = () => {
         fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("gear_user", JSON.stringify({
                        id: createdUser.id,
                        instrumentOptionsId: createdUser.instrumentOptionsId

                        
                    }))

                    navigate("/")
                }
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/instrumentOptions`)
            .then(res => res.json())
            .then((data) => {
                setDropdownItem(data)
            })
        },
        []
       )

    const handleRegister = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const theme = createTheme();
      
     

    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs"> 
            <CssBaseline />
            <Box 
            sx={{
                marginTop:8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m:1, bgcolor: 'secondary.main'}}>
                <LockOutlined />
            </Avatar>    
            <Typography component="h1" variant="h5">
            Please Register for GearHead
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3}} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.name = evt.target.value
                            setUser(copy)    
                                }
                            }      

                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.email = evt.target.value
                        setUser(copy)    
                            }
                        }  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="dropdown">Choose Your instrument</InputLabel>
                        <Select
                            labelId="dropdownOptions"
                            id="user-instrument"
                            value={dropdownItem.name}
                            label="Intruments"
                            onChange={
                                (evt) => {
                                    const copy = {...user}
                                    copy.instrumentOptionsId = parseInt(evt.target.value)
                                    setUser(copy)    
                                        }
                                    }>
                        {
                            dropdownItem.map((item) => 
                            <MenuItem key={`gearType--${item.id}`} value={item.id}>{item.name}</MenuItem>
                            )
                        }
                        </Select>
                </FormControl>



            
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body6">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                        </Grid>
                  </Grid>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    )
}

