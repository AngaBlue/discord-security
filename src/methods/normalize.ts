import normalizeStrings from 'normalize-strings';

/**
 * Normalizes strings. Returns string with accents removed, special characters converted, in all lowercase.
 * @param {string} str
 * @returns {string} Normalized string
 */
function normalize(str: string): string {
    // Remove Accents
    let out = normalizeStrings(str);
    // Replace Special Characters w/ Spaces
    out = out.replace(/[^a-zA-Z\d]/g, ' ');
    out = out.trim();
    out = out.toLowerCase();
    return out;
}

export default normalize;
