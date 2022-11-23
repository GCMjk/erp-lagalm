const isValidPhone = (phone: string): boolean => {

    const match = String(phone)
        .match(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
        );

    return !!match;
}

export const isPhone = (phone: string): string | undefined => {
    return isValidPhone(phone)
        ? undefined
        : 'El número telefonico no tiene un formato válido';
}