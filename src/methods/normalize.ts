import normalizeStrings from "normalize-strings";

/**
 * Normalizes strings. Returns string with accents removed, special characters converted, in all lowercase.
 * @param {string} str
 * @returns {string} Normalized string
 */
function normalize(str: string): string {
    //Remove Accents
    str = normalizeStrings(str);
    //Replace Special Characters w/ Spaces
    str = str.replace(/[^a-zA-Z\d]/g, " ");
    str = str.trim();
    str = str.toLowerCase();
    return str;
}

export default normalize;
