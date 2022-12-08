import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gearList">Your Gear</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gearList">Sold Gear</Link>
            </li><li className="navbar__item active">
                <Link className="navbar__link" to="/gearList">Wishlist</Link>
            </li>
            {
                localStorage.getItem("gear_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("gear_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

