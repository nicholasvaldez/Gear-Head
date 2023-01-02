import { Title } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gear } from "../Gear";
import { WishGearComp } from "./WishGearComp";

export const Wishlist = () => {
  const [gear, setGear] = useState([]);  //*state of the gear list
  const [dropdownItem, setDropdownItem] = useState([])  //*Dropdown filter state
  const[filteredGear, setFilteredGear] = useState([]) 
  const [gearTypeId, setGearTypeId] = useState("")

  const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)

  const navigate = useNavigate()


  useEffect(
    () => {
      fetch(`http://localhost:8088/userWishLishGear?userId=${gearUserObject.id}`)
      .then(res => res.json())
      .then(
        (gearData) => {
          setFilteredGear(gearData) //! Change to gear and add seperate useEffect for filtered gear, this is for testing 
        }
      );
  }, []);

  

  useEffect(
    () => {
        fetch(`http://localhost:8088/gearTypes?userInstrumentsId=${gearUserObject.instrumentOptionsId}&_expand=userInstruments&_embed=userOwnedGear`)
        .then(res => res.json())
        .then((data) => {
            setDropdownItem(data)
        })
    },
    []
  )

  useEffect(
    () => {
      const filteredCopy = gear.filter(item => item.gearTypeId === gearTypeId)
      setFilteredGear(filteredCopy)
    },
    [gearTypeId]
  )



  return (
    <>
    <Stack alignItems="center">
                    <Typography variant="h2">Wishlist</Typography>
                    <Box>

                    </Box>
                    <Typography>Wish Your Passion</Typography>
                </Stack>
    <fieldset>
                <div className="form-group">
                    <select onChange={(evt) => {
                      setGearTypeId(parseInt(evt.target.value))
                     } }>
                        <option value={0}>{`Filter by Type`}</option>
                        {
                            dropdownItem.map((item) => 
                                <option key={`gearType--${item.id}`} value={item.id}>{item.name}</option>

                            )

                        }

                    </select>
                </div>
            </fieldset>
      <button onClick={() => navigate("/gearList/add")}>Add to Wishlist</button>      

        <button 
        onClick={
          () => {
          setFilteredGear(gear)
          }
        }>All Gear</button>
      <Paper style={{maxHeight: 478, overflow: 'auto'}}>
        <List 
        sx={{ ml: '615px'}}>
          {
            filteredGear.map(g => <WishGearComp key={g.id}
              id={g.id} 
              name={g.name}
              gearTypeId={g.gearTypeId}
              price={g.price}
              description={g.description}
            /> )
                    
            }     
          </List>

      </Paper>

    </>
  );
};
