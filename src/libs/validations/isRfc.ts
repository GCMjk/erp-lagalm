const isValidRfc = (rfc: string): boolean => {

    const match = String(rfc)
        .match(
            /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
        );

    return !!match;
}

export const isRfc = (rfc: string): string | undefined => {
    return isValidRfc(rfc)
        ? undefined
        : 'El RFC no tiene un formato válido';
}