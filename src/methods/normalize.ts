import normalize from "normalize-strings";

//Normalises strings. Returns string with accents removed, special characters converted, in all lowercase.
export default function (str: string): string {
    //Remove Accents
    str = normalize(str);
    //Replace Special Characters w/ Spaces
    str = str.replace(/[^a-zA-Z\d]/g, " ");
    str = str.trim();
    str = str.toLowerCase();
    return str;
}
