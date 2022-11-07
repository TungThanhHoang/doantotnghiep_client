export default function FormatDate(createdAt) {
    const date = new Date(createdAt);
    const dateOrder = date.toLocaleString("en-Us");
    return dateOrder;
}
