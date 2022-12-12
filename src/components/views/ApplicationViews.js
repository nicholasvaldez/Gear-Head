import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { Outlet, Route, Routes } from "react-router-dom"
import { AddGearForm } from "../gear/AddGearForm"
import { GearDetails } from "../gear/GearDetails"
import { GearForm } from "../gear/GearForm"
import { GearList } from "../gear/GearList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                <Stack alignItems="center">
                    <h1>GearHead</h1>
                    <Typography>Track Your Passion</Typography>
                </Stack>
                    <GearList />
                    <Outlet />
                </>
            }>
            </Route> //!Putting the closed route tag here, means everything in the "/" path wont render on the following routes
                {/* <Route path="gearList" element={ <GearList/> } /> */}
                <Route path="gearList/:gearId" element={ <GearDetails /> } />

                <Route path="gearList/:gearId/edit" element={ <GearForm /> } />
                <Route path="gearList/add" element={ <AddGearForm /> } />

                

             {/* </Route> */} //! When you put the closed tag here, every route will inherit "/"
        </Routes>
    )
}


