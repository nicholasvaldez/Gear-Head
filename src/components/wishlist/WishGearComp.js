import { CheckOutlined } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemText, Table, TableCell, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"

export const WishGearComp = ({ id, name, gearTypeId, datePurchased, pricePaid, description, toUpgrade}) => {
    
    
    return <section className="gear">
           
          <ListItemButton 
          component="a"
          sx={{
            width: '250px'
          }} 
          href={`wishlist/${id}`}>
            <ListItemText primary={`${name}`} />
          </ListItemButton>
       

          
  </section>
}



