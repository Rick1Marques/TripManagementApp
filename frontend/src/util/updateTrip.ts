import axios from "axios";
import {Trip} from "../model/Trip.ts";

export async function updateTrip(trip: Trip) {
    const loggedUserId = localStorage.getItem("loggedUserId")
    try {
        const response = await axios.put(`/api/user/${loggedUserId}/trips`, trip)
        console.log("Trip edited with success!", response.data)
    } catch (err) {
        console.log(err)
    }
}