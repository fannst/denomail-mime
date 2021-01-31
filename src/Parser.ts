export interface ParseHeadersResponseType {
    [key:string]: string
};

export class Parser {
    /**
     * Parses a single header into key:value pair
     * @param raw the raw header
     */
    public static parseHeader = (raw: string): [string, string] => {
        const splitted: string[] = raw.split(':');

        return [
            splitted[0].trim().toLocaleLowerCase(),
            splitted[1].replace(/\s+/g, ' ').trim()
        ];
    };

    public static parseHeaders = (raw_lines: string[]): ParseHeadersResponseType => {
        let headers: ParseHeadersResponseType = {};

        let joined_line: string = '';

        for (let i = 0; i < raw_lines.length; ++i)
        {
            joined_line += raw_lines[i].replace(/\t+/g, ' ').replace(/\s+/g, ' ').trim();
            if (raw_lines[i + 1][0] === ' ' || raw_lines[i + 1][0] === '\t') {
                continue;
            }

            let [ key, value ] = Parser.parseHeader(joined_line);
            headers[key] = value;

            joined_line = '';
        }

        return headers;
    };

}
