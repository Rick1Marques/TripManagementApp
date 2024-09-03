export function getDifferenceInDays(date1: Date, date2: Date){
    const diffInMS = Math.abs(date1.getTime() - date2.getTime())
    const diffInDays = diffInMS / (1000*60*60*24)

    return Math.round(diffInDays) + 1
}