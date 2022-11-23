const isValidTime = (time: string): boolean => {

    const match = String(time)
        .match(
            /(([01]\d)|(2[0-3])):([0-5]\d)/
        );

    return !!match;
}

export const isTime = (time: string): string | undefined => {
    return isValidTime(time)
        ? undefined
        : 'La hora no tiene un formato válido';
}