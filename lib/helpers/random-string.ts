export default function randomString(length: number = 10): string {
    let output = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');

    for (let i = 0; i < length; i++) {
        output += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    }

    return output;
}