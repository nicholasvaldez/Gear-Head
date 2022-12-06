import { Outlet, Route, Routes } from "react-router-dom"
import { GearList } from "../gear/GearList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>GearHead</h1>
                    <div>Track Your Passion</div>

                    <Outlet />
                </>
            }>
				<Route path="gearList" element={ <GearList/> } />

                

             </Route>
        </Routes>
    )
}


