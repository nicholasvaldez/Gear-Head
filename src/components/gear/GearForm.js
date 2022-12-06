import { useEffect, useState } from "react";

export const GearForm = () => {
    //TODO Provide initial state for edit form

    const [gear, setGear] = useState({
        name: "",
        datePurchased: "",
        pricePaid: 0,
        description: "",
        toUpgrade: false
    })

    //TODO Get userownedgear info from api and update state
    const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)

  useEffect(
    () => {
      fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
      .then(res => res.json())
      .then(
        (gearData) => {
            const gearObj = gearData[0]
          setGear(gearObj)
        }
      );
  }, []);

  
  
  const handleSaveButtonClick = (event) => {
      event.preventDefault()
      
      /*
      TODO: Perform the PUT fetch() call here to update the profile.
      Navigate user to home page when done.
      */

           return fetch(`http://localhost:8088/userOwnedGear?id=${gear.id}`, {
               method: "PUT",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(gear)
           })
           .then(res => res.json())
           .then(()=> {})
       
    
    }
    

    return (
        <form className="Edit">
            <h2 className="Edit__title">Edit Gear</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={gear.name}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...gear}
                                copy.name = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="datePurchased">Date Purchased:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        defaultValue={gear.datePurchased}
                        onChange={
                            (evt) => {
                                const copy = {...gear}
                                copy.datePurchased = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price Paid:</label>
                    <input type="number"
                        className="form-control"
                        defaultValue={gear.pricePaid}
                        onChange={
                            (evt) => {
                                
                                const copy = {...gear}
                                copy.pricePaid = parseFloat(evt.target.value, 2)
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={gear.description}
                        onChange={
                            (evt) => {
                                const copy = {...gear}
                                copy.description = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Uprgade Soon?:</label>
                    <input type="checkbox"
                        defaultValue={gear.toUpgrade}
                        onChange={
                            (event) => {
                                const copy = {...gear}
                                copy.toUpgrade = event.target.checked //* .value would not work here because this is a checkbox
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}