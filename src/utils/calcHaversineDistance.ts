function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export default function calcHaversineDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
): number {
    const earthRadiusKm = 6371;

    // Converte para rad
    const lat1Rad = toRadians(lat1);
    const lng1Rad = toRadians(lng1);
    const lat2Rad = toRadians(lat2);
    const lng2Rad = toRadians(lng2);

    // Diferença entre coords
    const difLat = lat2Rad - lat1Rad;
    const difLon = lng2Rad - lng1Rad;

    // Fórmula de Haversine
    const a =
        Math.sin(difLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(difLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância em km das 2 coords recebidas
    const distance = earthRadiusKm * c;

    return +distance.toFixed(2);
}
