export default function generateClientNumber() {
    if ( localStorage.getItem('clientNumber') ) {
        return localStorage.getItem('clientNumber');
    } else {
        const clientNumber = Math.floor(Math.random() * 1000000000);
        localStorage.setItem('clientNumber', clientNumber.toString());
        return clientNumber;
    }
}