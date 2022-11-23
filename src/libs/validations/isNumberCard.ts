const isValidNumberCard = (numberCard: string): boolean => {

    const match = String(numberCard)
        .match(
            /^(\d){16}$/
        );

    return !!match;
};

export const isNumberCard = (numberCard: string): string | undefined => {
    return isValidNumberCard(numberCard)
        ? undefined
        : 'El número de cuenta no tiene un formato válido';
}