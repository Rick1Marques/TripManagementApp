export function getOrdinalSuffix(n: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;

    if (v >= 11 && v <= 13) {
        return n + suffixes[0]; // "th" for 11, 12, 13
    }

    return n + (suffixes[n % 10] || suffixes[0]);
}
