import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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



 /* const GearFilter = (event) => {
  event.preventDefault()
  const copy = {...gear}
  const filteredCopy = copy.filter(item => item.gearTypeId === parseInt(event.target.value))
  setFilteredGear(filteredCopy)
  }  */

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
      <article className="gearDetails">
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
  </article>
    </>
  );
};
