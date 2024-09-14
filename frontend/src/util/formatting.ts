export function getDate(dateTimeStr: string) {
    const dateTime = new Date(dateTimeStr);

    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const year = String(dateTime.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`
}

export function getTime(dateTimeStr: string) {
    const dateTime = new Date(dateTimeStr);

    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`
}

export function toCamelCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getDaysOfTheWeek(inputDate: string) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(inputDate);
    return daysOfWeek[date.getDay()];
}

