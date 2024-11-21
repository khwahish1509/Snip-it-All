//A quick way to check if the user is on a mobile device.

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

console.log(isMobile ? 'Mobile device' : 'Desktop device');