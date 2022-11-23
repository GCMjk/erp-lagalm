const isValidPrice = (price: string): boolean => {

    const match = String(price)
        .match(
            /.[0-9]{2}$/
        );

    return !!match;
}

export const isPrice = (price: string): string | undefined => {
    return isValidPrice(price)
        ? undefined
        : 'El salario no tiene un formato válido';
}