import { BrowserRouter, Route, Routes } from "react-router";
import Splash from "../views/Splash";
import AppLayout from "../components/AppLayout";
import Home from "../views/Home";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Splash />} />
                <Route element={<AppLayout />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}