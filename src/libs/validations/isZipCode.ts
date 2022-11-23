const isValidZipCode = (zipCode: string): boolean => {

    const match = String(zipCode)
        .match(
            /^[0-9]{5}/
        );

    return !!match;
};

export const isZipCode = (zipCode: string): string | undefined => {
    return isValidZipCode(zipCode)
        ? undefined
        : 'El codigo postal no tiene un formato válido';
}