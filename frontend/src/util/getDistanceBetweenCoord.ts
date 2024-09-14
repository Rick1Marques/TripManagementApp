function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const RADIUS_EARTH = 6371;
    const deltLat = toRadians(lat2 - lat1);
    const deltLong = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const a = Math.sin(deltLat / 2) * Math.sin(deltLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltLong / 2) * Math.sin(deltLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_EARTH * c;

}