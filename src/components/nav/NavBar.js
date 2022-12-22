import { MenuBook } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuBook />
                  </IconButton>
                  <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" variant="text" href={"/"}>Dashboard</Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" variant="text" href="http://localhost:3000/">Sold</Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" variant="text" href={"/wishlist"}>Wishlist</Button>
                    </Typography>
                    {
                localStorage.getItem("gear_user")
                    ? 
                        <Button color="inherit" onClick={() => {
                            localStorage.removeItem("gear_user")
                            navigate("/", {replace: true})
                        }}>Logout</Button>
                    
                    : ""
            }

                  </Stack>
                </Toolbar>
              </AppBar>
            </Box>
          );




       /*  <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Dashboard</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gearList">Sold Gear</Link>
            </li><li className="navbar__item active">
                <Link className="navbar__link" to="/gearList">Wishlist</Link>
            </li>
            {
                localStorage.getItem("gear_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("gear_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul> */
    
}

