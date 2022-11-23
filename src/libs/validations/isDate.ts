const isValidDate = (date: string): boolean => {

    const match = String(date)
        .match(
            /([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})/
        );

    return !!match;
}

export const isDate = (date: string): string | undefined => {
    return isValidDate(date)
        ? undefined
        : 'La fecha no tiene un formato válido';
}