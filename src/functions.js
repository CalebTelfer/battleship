export function numberToLetter(n) {
    if (n >= 0 && n < 26) {
      return String.fromCharCode(97 + n); // 97 is 'a'
    }
}