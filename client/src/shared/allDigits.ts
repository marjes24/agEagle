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

/**
 * Checks for integer text inputs
 * @param s 
 */
export const validIntegerInput = (s: string) => {
    // Check if empty or if negative
    const firstChar = s.charAt(0);
    if (firstChar == "")
        return true;
    if (allDigits(firstChar) === false && firstChar !== "-")
        return false;

    return allDigits(s.substr(1));
}