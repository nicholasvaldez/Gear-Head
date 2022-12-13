import { CheckBox } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GearForm } from "./GearForm"
import "./Gears.css"
export const GearDetails = () => {
    const {gearId} = useParams()
    const [gear, setGear] = useState({})

    const navigate = useNavigate()

    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    const getAllGear = () => {
        fetch(`http://localhost:8088/userOwnedGear`)
        .then(res => res.json())
        .then ((data) => {
            setGear(data)
        })
    }

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

    
    return (
        <>
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
        <Grid item>
            <Card sx={{ width: 500, height: 500, mt:'50px'}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gear Details
                    </Typography>
                    <Typography variant="h5" component="div" textAlign='center' sx={{fontWeight: 'bold'}}>
                    {gear.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign='center'>
                    {gear?.gearType?.name}
                    </Typography>
                    <Typography variant="body2" textAlign='center'>
                    {gear.datePurchased}
                    </Typography>
                    <Typography textAlign='center'>
                    ${gear.pricePaid}
                    </Typography>
                    <Typography>
                    {gear.description}
                    </Typography>
                    
                    <CheckBox defaultChecked={gear.toUpgrade}>Upgradeable?</CheckBox>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("edit")} size="small">Edit</Button>
                    <Button onClick={() => {
                fetch(`http://localhost:8088/userOwnedGear/${gear.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                   getAllGear()
                }
                )
                .then(() => {
                    navigate("/")

                })
            
            }
            } size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>



















            {/* <section className="gearDeatils__info">
                <header className="gear__header">{gear.name}</header> 
                <div className="gear__category">{gear?.gearType?.name}</div>
                <div>{gear.datePurchased}</div>
                <div>${gear.pricePaid}</div>
                <div>{gear.description}</div>
            </section> */}
           {/*  <fieldset>
                <div className="gearDetails__check">
                    <label htmlFor="name">Upgrade soon?</label>
                    <input type="checkbox"
                        defaultChecked={gear.toUpgrade} 
                        onChange={
                            (evt) => {
                                const copy = { ...gear }
                                copy.toUpgrade = evt.target.checked
                                setGear(copy)

                                
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={() => navigate("edit")}>Edit</button>
            <button onClick={() => {
                fetch(`http://localhost:8088/userOwnedGear/${gear.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                   getAllGear()
                }
                )
                .then(() => {
                    navigate("/")

                })
            
            }
            }>Delete</button> */}

        </>
    )
    
}