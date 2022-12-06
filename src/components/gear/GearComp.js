export const GearComp = ({ id, name, gearTypeId, datePurchased, pricePaid, description, toUpgrade}) => {
    
    
    return <section>
    <header>{name}</header>
    <div>{gearTypeId}</div>
    <div>{datePurchased}</div>
    <div>{pricePaid}</div>
    <div>{description}</div>
    <div>{toUpgrade}</div>

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