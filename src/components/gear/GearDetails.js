import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GearForm } from "./GearForm"
import "./Gears.css"
export const GearDetails = () => {
    const {gearId} = useParams()
    const [gear, setGear] = useState({})

    const navigate = useNavigate()

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

    
    return (
        <>
            <section className="gearDeatils__info">
                <header className="gear__header">{gear.name}</header> 
                <div className="gear__category">{gear?.gearType?.name}</div>
                <div>{gear.datePurchased}</div>
                <div>${gear.pricePaid}</div>
                <div>{gear.description}</div>
            </section>
            <fieldset>
                <div className="gearDetails__check">
                    <label htmlFor="name">Upgrade soon?</label>
                    <input type="checkbox"
                        defaultChecked={gear.toUpgrade} 
                        onChange={
                            (evt) => {
                                const copy = { ...gear }
                                copy.toUpgrade = evt.target.checked
                                setGear(copy)

                                
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={() => navigate("edit")}>Edit</button>
            <button>Delete</button>

        </>
    )
    
}