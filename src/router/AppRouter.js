import { Route, Routes } from "react-router-dom"
import { Login } from "../auth"
import { Navbar } from "../ui"
import { HomeRouter } from "./HomeRouter"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

    
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/*" element={
                    <PrivateRoute>
                        <HomeRouter />
                    </PrivateRoute>
                } />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    )
}
