import React, { useEffect, useState } from "react";
import { Gear } from "../Gear";
import { GearComp } from "./GearComp";

export const GearList = () => {
  const [gear, setGear] = useState([]);

  const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)


  useEffect(
    () => {
     fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
      .then(res => res.json())
      .then(
        (userGear) => {
          setGear(userGear)
        }
      );
  }, []);

  return (
    <article className="gear">
      {
        gear.map(g => <GearComp key={g.id}
          id={g.id} 
          name={g.name}
          gearTypeId={g.gearTypeId}
          datePurchased={g.datePurchased}
          pricePaid={g.pricePaid}
          description={g.description}
          toUpgrade={g.toUpgrade} /> )
                 
        }     
    </article>
  );
};
