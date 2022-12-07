import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
     const [user, setUser] = useState({
        email: "",
        name: "",
        instrumentOptionsId: 0
    })

    const [dropdownItem, setDropdownItem] = useState([])


    let navigate = useNavigate()

    const registerNewUser = () => {
         fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("gear_user", JSON.stringify({
                        id: createdUser.id,
                        instrumentOptionsId: createdUser.instrumentOptionsId

                        
                    }))

                    navigate("/")
                }
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/instrumentOptions`)
            .then(res => res.json())
            .then((data) => {
                setDropdownItem(data)
            })
        },
        []
       )

    const handleRegister = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for GearHead</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.name = evt.target.value
                            setUser(copy)    
                                }
                            }      
                      type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.email = evt.target.value
                            setUser(copy)    
                                }
                            }  
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <select onChange={
                        (evt) => {
                            const copy = {...user}
                            copy.instrumentOptionsId = parseInt(evt.target.value)
                            setUser(copy)    
                                }
                            }  >
                        <option value={0}>Choose Which Best Describes You</option>
                        {
                            dropdownItem.map((item) => 
                                <option key={`gearType--${item.id}`} value={item.id}>{item.name}</option>

                            )

                        }

                    </select>
                </div>
            </fieldset>
            
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

