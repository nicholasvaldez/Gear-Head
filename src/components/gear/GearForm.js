import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const GearForm = () => {
    //TODO Provide initial state for edit form
    const navigate = useNavigate()
    const {gearId} = useParams()

    const [gear, setGear] = useState({
        name: "",
        gearTypeId: 0,
        datePurchased: "",
        pricePaid: "",
        description: "",
        toUpgrade: false,
    })
    
    const [dropdownItem, setDropdownItem] = useState([])

    //TODO Get userownedgear info from api and update state
    const localGearUser = localStorage.getItem("gear_user")
  const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}&id=${gearId}&_expand=gearType`)
            .then(res => res.json())
            .then((gearData) => {
                    const singleGear = gearData[0]
                    setGear(singleGear)
            }
            )
        },
        [gearId]
    )

   useEffect(
    () => {
        fetch(`http://localhost:8088/gearTypes?userInstrumentsId=${gearUserObject.instrumentOptionsId}&_expand=userInstruments`)
        .then(res => res.json())
        .then((data) => {
            setDropdownItem(data)
        })
    },
    []
   )









  
  
  const handleSaveButtonClick = (event) => {
      event.preventDefault()
      

            fetch(`http://localhost:8088/userOwnedGear/${gearId}`, {
               method: "PUT",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(gear)
           })
           .then(res => res.json())
           .then(() => {
            navigate("/gearList")
           })
       
    
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
                                const copy = {...gear}
                                copy.name = evt.target.value
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select onChange={(evt) => {
                        const copy = {...gear}
                        copy.gearTypeId =parseInt(evt.target.value)
                        setGear(copy)
                    }}>
                        <option value={0}>{`${gear?.gearType?.name}`}</option>
                        {
                            dropdownItem.map((item) => 
                                <option key={`gearType--${item.id}`} value={item.id}>{item.name}</option>

                            )

                        }

                    </select>
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
                    <label htmlFor="name">Upgrade Soon?</label>
                    <input type="checkbox"
                        checked={gear.toUpgrade}
                        onChange={
                            (evt) => {
                                const copy = { ...gear }
                                copy.toUpgrade = evt.target.checked
                                setGear(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save 
            </button>
        </form>
    )
}