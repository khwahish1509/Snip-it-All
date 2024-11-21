//Limits the rate at which a function is executed (useful for search or resize events).

function debounce (func, delay){
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}
// now lets make it use: 
window.addEventListener(
    'resize',
    debounce(() => console.log('it has been resized!'), 300)
);