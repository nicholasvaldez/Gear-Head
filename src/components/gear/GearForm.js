import { AppBar, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { CheckBox } from "@mui/icons-material";

export const GearForm = () => {
    //TODO Provide initial state for edit form
    const navigate = useNavigate()
    const {gearId} = useParams()

    const [gear, setGear] = useState({
        name: "",
        gearTypeId: 0,
        datePurchased: "",
        pricePaid: "",
        description: "",
        toUpgrade: false,
    })
    
    const [dropdownItem, setDropdownItem] = useState([])

    //TODO Get userownedgear info from api and update state
    const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}&id=${gearId}&_expand=gearType`)
            .then(res => res.json())
            .then((gearData) => {
                    const singleGear = gearData[0]
                    setGear(singleGear)
            }
            )
        },
        [gearId]
    )

   useEffect(
    () => {
        fetch(`http://localhost:8088/gearTypes?userInstrumentsId=${gearUserObject.instrumentOptionsId}&_expand=userInstruments`)
        .then(res => res.json())
        .then((data) => {
            setDropdownItem(data)
        })
    },
    []
   )









  
  
  const handleSaveButtonClick = (event) => {
      event.preventDefault()
      

            fetch(`http://localhost:8088/userOwnedGear/${gearId}`, {
               method: "PUT",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(gear)
           })
           .then(res => res.json())
           .then(() => {
            navigate("/")
           })
       
    
    }
    

    return (
        <React.Fragment>
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
                <EditIcon />
            </Avatar>    
            <Typography component="h1" variant="h5">
                Edit Gear
            </Typography>
            <Box component="form" noValidate onSubmit={handleSaveButtonClick} sx={{ mt: 3}} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={gear.name}
                            onChange={
                                (evt) => {
                                    const copy = {...gear}
                                    copy.name = evt.target.value
                                    setGear(copy)
                                }
                            } 

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="dropdown">{`${gear?.gearType?.name}`}</InputLabel>
                                <Select
                                    labelId="dropdownOptions"
                                    id="user-instrument"
                                    value={dropdownItem.name}
                                    label="Intruments"
                                    onChange={
                                        (evt) => {
                                        const copy = {...gear}
                                        copy.gearTypeId = parseInt(evt.target.value)
                                        setGear(copy)
                                    }
                                        }>
                                {
                                    dropdownItem.map((item) => 
                                        <MenuItem key={`gearType--${item.id}`} value={item.id}>{item.name}</MenuItem>

                                    )

                                }
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                                <TextField
                                    
                                    fullWidth
                                    name="someDate"
                                    label="Purchased"
                                    InputLabelProps={{ shrink: true, required: false }}
                                    type="date"
                                    value={gear.datePurchased}
                                    onChange={
                                        (evt) => {
                                            const copy = {...gear}
                                            copy.datePurchased = evt.target.value
                                            setGear(copy)
                                        }
                                    }
                                />
                                    
                    </Grid>
                    <Grid item xs={12}>
                                <TextField
                                    
                                    fullWidth
                                    name="somePrice"
                                    label="Price"
                                    InputLabelProps={{ shrink: true, required: false }}
                                    type="number"
                                    value={gear.pricePaid}
                                    onChange={
                                        (evt) => {
                                            
                                            const copy = {...gear}
                                            copy.pricePaid = parseFloat(evt.target.value, 2)
                                            setGear(copy)
                                        }
                                    }
                                />
                                    
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            
                            fullWidth
                            id="description"
                            label="Decription"
                            name="description"
                            value={gear.description}
                            onChange={
                                (evt) => {
                                    const copy = {...gear}
                                    copy.description = evt.target.value
                                    setGear(copy)
                                }
                            } 

                        />
                    </Grid>
                    <Grid item xs={12}>
                             <FormControl fullWidth>
                                <FormControlLabel control={<Checkbox 
                                sx={
                                    {
                                        mr: 20
                                    }
                                }
                                checked={gear.toUpgrade}
                                onChange={
                                    (evt) => {
                                        const copy = { ...gear }
                                        copy.toUpgrade = evt.target.checked
                                        setGear(copy)
                                    }
                                } />} 
                                labelPlacement="start" 
                                label="Upgradeable" />
                             </FormControl>
                                    
                    </Grid>
                   
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Save
                    </Button>
                    
                    
                  </Grid>
                </Box>
            </Box>
        </Container>
      </React.Fragment>





    )
}
/* 
        <form className="Edit">
            <h2 className="Edit__title">Edit Gear</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={gear.name}
                        onChange={
                            (evt) => {
                                const copy = {...gear}
                                copy.name = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select onChange={(evt) => {
                        const copy = {...gear}
                        copy.gearTypeId =parseInt(evt.target.value)
                        setGear(copy)
                    }}>
                        <option value={0}>{`${gear?.gearType?.name}`}</option>
                        {
                            dropdownItem.map((item) => 
                                <option key={`gearType--${item.id}`} value={item.id}>{item.name}</option>

                            )

                        }

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="datePurchased">Date Purchased:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        defaultValue={gear.datePurchased}
                        onChange={
                            (evt) => {
                                const copy = {...gear}
                                copy.datePurchased = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price Paid:</label>
                    <input type="number"
                        className="form-control"
                        defaultValue={gear.pricePaid}
                        onChange={
                            (evt) => {
                                
                                const copy = {...gear}
                                copy.pricePaid = parseFloat(evt.target.value, 2)
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={gear.description}
                        onChange={
                            (evt) => {
                                const copy = {...gear}
                                copy.description = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Upgrade Soon?</label>
                    <input type="checkbox"
                        checked={gear.toUpgrade}
                        onChange={
                            (evt) => {
                                const copy = { ...gear }
                                copy.toUpgrade = evt.target.checked
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save 
            </button>
        </form> */