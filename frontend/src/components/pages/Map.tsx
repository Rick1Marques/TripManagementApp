import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import {getDate} from "../../util/formatting.ts";

type MarkerData = {
    city: string,
    coordinates: [number, number],
    popUp: string
}

export default function Map() {
    const [trips] = useFetchTrips()

    if (!trips) {
        return <h1>Loading....</h1>
    }

    const allDestinations = trips.flatMap(trip => trip.destinations)

    const mapMarkers = allDestinations.reduce((acc, destination) => {
        if (!acc.some(markerData => markerData.city === destination.city)) {
            acc.push({
                city: destination.city,
                coordinates: [+destination.coordinates.latitude, +destination.coordinates.longitude],
                popUp: getDate(destination.date)
            })
        }
        return acc
    }, [] as MarkerData[])

    return (
        <MapContainer center={[52.52, 13.42]} zoom={11}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapMarkers.map(marker =>
                <Marker key={marker.city} position={marker.coordinates}>
                    <Popup>
                        {marker.city}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    )
}