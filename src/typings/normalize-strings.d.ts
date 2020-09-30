declare module "normalize-strings" {
    /**
     * Returns a normalized string by converting common UTF-8 encoded characters to their respective ANSI counterparts
     * @param input The string to be normalized
     * @param charmap A map of character codes to character equivalents that should be substituted when normalizing
     * @returns Normalized string
     */
    export default (input: string, charmap?: Record<number, string>) => string;
}
