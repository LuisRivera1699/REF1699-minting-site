import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mint from "../pages/Mint";
import Refer from "../pages/Refer";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PrivateRoute><Mint/></PrivateRoute>}/>
                <Route path='/refer' element={<PrivateRoute><Refer/></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;