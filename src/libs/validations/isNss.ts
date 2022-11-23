const isValidNss = (nss: string): boolean => {

    const match = String(nss)
        .match(
            /^(\d{2})(\d{2})(\d{2})\d{5}$/
        );

    return !!match;
};

export const isNss = (nss: string): string | undefined => {
    return isValidNss(nss)
        ? undefined
        : 'El NSS no tiene un formato válido';
}