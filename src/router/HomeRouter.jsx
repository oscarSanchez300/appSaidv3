import { Navigate, Route, Routes } from "react-router-dom"
import { HomePages } from "../pages"
import { StoreIndex } from "../sections/store/StoreIndex"
import { SecurityIndex } from "../sections/security/SecurityIndex"
import { Products } from "../sections/store/Inventory/Products"
import { IndexCatalogs } from "../sections/store/catalogs/IndexCatalogs"
import { Index as IndexType } from "../sections/store/catalogs/type/Index"
import { Index as IndexSubtype } from "../sections/store/catalogs/subtype/Index"
import { Index as IndexBrand } from "../sections/store/catalogs/brand/Index"
import { Index as IndexModel } from "../sections/store/catalogs/model/Index"
import { Index as IndexStatus } from "../sections/store/catalogs/status/Index"
import { Index as IndexSpot } from "../sections/store/catalogs/spot/Index"
import { Index as IndexAisle } from "../sections/store/catalogs/aisle/Index"
import { Index as IndexSection } from "../sections/store/catalogs/section/Index"
import { Index as IndexLocation } from "../sections/store/catalogs/location/Index"
import { Index as IndexCedis } from "../sections/store/catalogs/cedis/Index"
import { Index as IndexTypeLocation } from "../sections/store/catalogs/typeLocation/Index"
import { Index as IndexReqOrd } from '../sections/store/catalogs/reqOrd/Index'



export const HomeRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePages />} />
            <Route path="/wh" element={<StoreIndex />} />
            <Route path="/sec" element={<SecurityIndex />} />
            <Route path="/store/products" element={<Products />} />
            <Route path="/store/catalogs" element={<IndexCatalogs />} />
            <Route path="/store/catalogs/type" element={<IndexType />} />
            <Route path="/store/catalogs/subtype" element={<IndexSubtype />} />
            <Route path="/store/catalogs/brand" element={<IndexBrand />} />
            <Route path="/store/catalogs/model" element={<IndexModel />} />
            <Route path="/store/catalogs/status" element={<IndexStatus />} />
            <Route path="/store/catalogs/spot" element={<IndexSpot />} />
            <Route path="/store/catalogs/aisle" element={<IndexAisle />} />
            <Route path="/store/catalogs/section" element={<IndexSection />} />
            <Route path="/store/catalogs/location" element={<IndexLocation />} />
            <Route path="/store/catalogs/cedis" element={<IndexCedis />} />
            <Route path="/store/catalogs/typeLocation" element={<IndexTypeLocation />} />
            <Route path="/store/catalogs/reqOrd" element={<IndexReqOrd />} />
        </Routes>
    )
}
