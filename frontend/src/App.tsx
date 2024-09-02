import {Route, Routes} from "react-router-dom";
import PageTripsLists from "./components/pages/PageTripsLists.tsx";

export default function App() {

  return (
    <Routes>
      <Route path="/myTrips" element={<PageTripsLists/>}/>
    </Routes>
  )
}