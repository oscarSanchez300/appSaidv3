import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/components/Login"
import { HomePages } from "../pages/HomePages"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePages />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </>
    )
}
