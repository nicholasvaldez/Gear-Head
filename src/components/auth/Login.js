import { ArrowForward, Copyright, LockOutlined } from "@mui/icons-material";
import { Avatar, Button, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';




// import "./Login.css"

export const Login = () => {
    const [email, set] = useState("nick@thebandpacific.com")
    const navigate = useNavigate()

    const theme = createTheme()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("gear_user", JSON.stringify({
                        id: user.id,
                        instrumentOptionsId: user.instrumentOptionsId
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh', width: '100vw' }}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper}  elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
             >
                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                 </Avatar>
                      
                <Typography variant="h1">GearHead</Typography>
                <Typography variant="h6">Please sign in</Typography>
                            
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                autoFocus
                            />
                            
                            
                 <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >Sign In
                 </Button>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                         </Box>  
                     

                    </Box>
            </Grid>
    </Grid>
</ThemeProvider>
        
        )
        }
    