import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddGearForm = () => {
    /*
        TODO: Add the correct default properties to the initial state object
    */
    const [gear, setGear] = useState({
        userId: 0,
        name: "",
        gearTypeId: 0,
        datePurchased: "",
        pricePaid: 0,
        description: "",
        toUpgrade: false
    })
    
        const localGearUser = localStorage.getItem("gear_user")
        const gearUserObject = JSON.parse(localGearUser)
  
    const [dropdownItem, setDropdownItem] = useState([])
    const navigate = useNavigate()

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

        // TODO: Create the object to be saved to the API

        const ticketToSendToAPI = {
            userId: gearUserObject.id,
            name: gear.name,
            gearTypeId: gear.gearTypeId,
            datePurchased: gear.datePurchased,
            pricePaid: gear.pricePaid,
            description: gear.description,
            toUpgrade: gear.toUpgrade

        }

        // TODO: Perform the fetch() to POST the object to the API
        
        return fetch(`http://localhost:8088/userOwnedGear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/")
        }
        )
    }

    return (
        <form className="gearForm">
            <h2 className="gearForm__title">Add Gear</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
                        <option value={0}>{`Choose the Gear Type`}</option>
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