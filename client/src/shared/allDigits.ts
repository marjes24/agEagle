/**
 * Validatas if a given string is all digits
 * @param s 
 */
export const allDigits = (s: string) => {
    for (let char of s) {
        if (isNaN(parseInt(char))) return false;
    }
    return true;
}