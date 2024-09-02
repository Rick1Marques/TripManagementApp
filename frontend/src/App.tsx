import {Route, Routes} from "react-router-dom";
import PageTripsLists from "./components/pages/PageTripsLists.tsx";
import PageTripDetail from "./components/pages/PageTripDetail.tsx";

export default function App() {

  return (
    <Routes>
      <Route path="/my-trips" element={<PageTripsLists/>}/>
      <Route path="/my-trips/:id" element={<PageTripDetail/>}/>
    </Routes>
  )
}