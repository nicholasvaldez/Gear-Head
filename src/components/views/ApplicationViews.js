import { Outlet, Route, Routes } from "react-router-dom"
import { GearDetails } from "../gear/GearDetails"
import { GearForm } from "../gear/GearForm"
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
                <Route path="gearList/:gearId" element={ <GearDetails /> } />
                <Route path="gearList/:gearId/edit" element={ <GearForm /> } />

                

             </Route>
        </Routes>
    )
}


