export default function DeliveryFee(distance, subTotal) {
    if (distance <= 10 && subTotal >= 300000) {
        return 0
    } else if (distance <= 10 && subTotal < 300000) {
        return 20000
    } else if (distance > 10 && distance <= 15) {
        return 30000
    } else if (distance > 10 && distance <= 15) {
        return 40000
    } else {
        return 50000
    }
}
