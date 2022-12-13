import { CheckOutlined } from "@mui/icons-material"
import { ListItem, Table, TableCell, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"

export const GearComp = ({ id, name, gearTypeId, datePurchased, pricePaid, description, toUpgrade}) => {
    
    
    return <section className="gear">
      
         <ListItem >
            <div><Link to={`/gearList/${id}`}>{name}</Link></div> 
          </ListItem>
           
       

          
  </section>
}







/* {
    "id": 1,
    "userId": 1,
    "name": "Tama Silverstar",
    "gearTypeId": 1,
    "datePurchased": "08/23/2014",
    "pricePaid": 450,
    "description": "5 piece, fusion sizes, birch wood",
    "toUpgrade": true
  } */