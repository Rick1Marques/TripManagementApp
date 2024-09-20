import {Route, Routes} from "react-router-dom";
import PageTripsLists from "./components/pages/PageTripsLists.tsx";
import PageTripDetail from "./components/pages/PageTripDetail.tsx";
import PageHome from "./components/pages/PageHome.tsx";
import ItineraryContextProvider from "./store/itinerary-context.tsx";
import PageMap from "./components/pages/PageMap.tsx";
import LoginPage from "./components/auth/LoginPage.tsx";
import RegisterPage from "./components/auth/RegisterPage.tsx";

export default function App() {

    return (
            <ItineraryContextProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/my-trips" element={<PageTripsLists/>}/>
                    <Route path="/my-trips/:id" element={<PageTripDetail/>}/>
                    <Route path="/home" element={<PageHome/>}/>
                    <Route path="/map" element={<PageMap/>}/>
                </Routes>
            </ItineraryContextProvider>
    )
}