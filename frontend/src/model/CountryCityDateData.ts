export type InputData = {
    country: string,
    countryIso: string,
    countryFlag: string,
    city: string,
    coordinates: { latitude: string, longitude: string }
    date: string,
}

export const emptyInputData: InputData = {
    country: "",
    countryIso: "",
    countryFlag: "",
    city: "",
    coordinates: {latitude: "", longitude: ""},
    date: ""
}