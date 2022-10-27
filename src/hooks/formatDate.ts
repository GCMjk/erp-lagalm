export const formatDate = (ISO: string) => {
    const date = new Date(ISO);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`
}