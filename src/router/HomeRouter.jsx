import { Navigate, Route, Routes } from "react-router-dom"
import { HomePages } from "../pages"

export const HomeRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePages />} />
        </Routes>
    )
}
