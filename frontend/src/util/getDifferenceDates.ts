export function getDifferenceInDaysDates(date1: Date, date2: Date) {
    const diffInMS = Math.abs(date1.getTime() - date2.getTime())
    const diffInDays = Math.round(diffInMS / (1000 * 60 * 60 * 24))
    return Math.round(diffInDays)
}

export function getFullDifferenceDates(date1: Date, date2: Date) {
    let diffInMS = Math.abs(date1.getTime() - date2.getTime());

    const months = Math.floor(diffInMS / (1000 * 60 * 60 * 24 * 30));
    diffInMS -= months * (1000 * 60 * 60 * 24 * 30);

    const days = Math.floor(diffInMS / (1000 * 60 * 60 * 24));
    diffInMS -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diffInMS / (1000 * 60 * 60));
    diffInMS -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diffInMS / (1000 * 60));
    diffInMS -= minutes * (1000 * 60);

    const seconds = Math.floor(diffInMS / 1000);

    const formattedMonths = String(months).padStart(2, '0');
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return [formattedMonths, formattedDays, formattedHours, formattedMinutes, formattedSeconds]

}