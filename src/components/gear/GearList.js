import React, { useEffect, useState } from "react";
import { Gear } from "../Gear";
import { GearComp } from "./GearComp";

export const GearList = () => {
  const [gear, setGear] = useState([]);
  const [upgradeable, setUpgradeable] = useState(false)

  const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)


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
        setGear(upgradeableGear)
      } else {
        fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
        .then(res => res.json())
        .then(
          (gearData) => {
            setGear(gearData)
          }
        )
      }
    },
    [upgradeable]
  )

  return (
    <>
      <button 
        onClick={
          () => {
          setUpgradeable(true)
          }
        }>Uprgadeable</button>
        <button 
        onClick={
          () => {
          setUpgradeable(false)
          }
        }>All Gear</button>
      <article className="gearDetails">
        {
          gear.map(g => <GearComp key={g.id}
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
