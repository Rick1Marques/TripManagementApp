import {Route, Routes} from "react-router-dom";
import PageTripsLists from "./components/pages/PageTripsLists.tsx";
import PageTripDetail from "./components/pages/PageTripDetail.tsx";
import PageHome from "./components/pages/PageHome.tsx";
import ItineraryContextProvider from "./store/itinerary-context.tsx";
import Map from "./components/pages/Map.tsx";

export default function App() {

    return (
        <ItineraryContextProvider>
            <Routes>
                <Route path="/my-trips" element={<PageTripsLists/>}/>
                <Route path="/my-trips/:id" element={<PageTripDetail/>}/>
                <Route path="/home" element={<PageHome/>}/>
                <Route path="/map" element={<Map/>}/>
            </Routes>
        </ItineraryContextProvider>
    )
}