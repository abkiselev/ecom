export const convertDate = (data) => {
    const date = new Date(data);
    return date.toLocaleString();
}