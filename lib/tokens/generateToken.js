//It works in client side


export function generateToken(length = 32) {
    if (length < 1) {
        throw new Error("Token length must be greater than 0");
    }
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

