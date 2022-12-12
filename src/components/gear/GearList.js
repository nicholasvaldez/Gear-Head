import { Title } from "@mui/icons-material";
import { List, ListItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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

      <List sx={ {ml:'40vw'}}>

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



     
        
     
      <Link color="primary" href="#" onClick={<></>} sx={{ mt: 3 }}>
        Add Gear
      </Link>
    



     {/*  <article className="gearDetails">
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
  </article> */}
    </>
  );
};
