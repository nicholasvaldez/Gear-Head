import { Title } from "@mui/icons-material";
import { FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gear } from "../Gear";
import { GearComp } from "./GearComp";

export const GearList = () => {
  const [gear, setGear] = useState([]);
  const [upgradeable, setUpgradeable] = useState(false)
  const [dropdownItem, setDropdownItem] = useState([])
  const[filteredGear, setFilteredGear] = useState([])
  const [gearTypeId, setGearTypeId] = useState("")

  const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)

  const navigate = useNavigate()


  useEffect(
    () => {
      fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
      .then(res => res.json())
      .then(
        (gearData) => {
          setGear(gearData)
        }
      );
  }, []);

  

  useEffect(
    () => {
      if (upgradeable) {
        const upgradeableGear = gear.filter(gearItem => gearItem.toUpgrade === true)
        setFilteredGear(upgradeableGear)
      } else {
        fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
        .then(res => res.json())
        .then(
          (gearData) => {
            setFilteredGear(gearData)
          }
        )
      }
    },
    [upgradeable]
  )

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
    <Grid container spacing={10}>
      <Grid item md={2 }>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter By Type</InputLabel>
        <Select
          autoWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(evt) => {
            setGearTypeId(parseInt(evt.target.value))
          } }
        >
          {
                              dropdownItem.map((item) => 
                                  <MenuItem key={`gearType--${item.id}`} value={item.id}>{item.name}</MenuItem>

                              )

          }
        </Select>
      </FormControl>
      </Grid>
    </Grid>
  {/*   <fieldset>
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
            </fieldset> */}
      <button onClick={() => navigate("/gearList/add")}>Add Gear</button>      

      <button 
        onClick={
          () => {
          setUpgradeable(true)
          }
        }>Upgradeable</button>
        <button 
        onClick={
          () => {
          setUpgradeable(false)
          setFilteredGear(gear)
          }
        }>All Gear</button>
      {/* <Paper style={{maxHeight: 478, overflow: 'auto'}}>
        <List 
        sx={{ ml: '615px'}}>

          {
            filteredGear.map(g => <GearComp key={g.id}
              id={g.id} 
              name={g.name}
              gearTypeId={g.gearTypeId}
              datePurchased={g.datePurchased}
              pricePaid={g.pricePaid}
              description={g.description}
            /> )
                    
            }     

              
          </List>

      </Paper> */}

     


      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gear Name</TableCell>
            <TableCell align="right">Price Paid</TableCell>
            <TableCell align="right">Date Purchased</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGear.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">${row.pricePaid}</TableCell>
              <TableCell align="right">{row.datePurchased}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  
    </>
  );
};
