export default function Promotion( promotion ) {
    return  ( 100 - parseInt(promotion.split(" ").pop())) / 100;
}
