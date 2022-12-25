export default function ShortenAddress(address) {
    return `${address.slice(0,5)}...${address.slice(address.length - 4)}`;
}