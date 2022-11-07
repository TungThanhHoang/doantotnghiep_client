export default function CalculatorDuration(seconds) {
    let days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);
    let hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    let minutes = Math.floor(seconds / (60));
    seconds -= minutes * (60);
    return hours >= 1 ? hours + "giờ:" + minutes + "phút" : minutes + " " +"phút";
}
