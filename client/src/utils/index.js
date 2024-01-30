export function decodeValue(value) {
    if(typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch(error) {
            console.log('(decodeValue) not_parse_value');
        }
    }

    return value;
}

export function encodeValue(value) {
    if(typeof value === 'string') {
        return value;
    }
    return JSON.stringify(value)
}