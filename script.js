
/* Funções de data e hora*/
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(); 
}
  
function showDateTime() {
    const banner = document.querySelector('nav');
    const dateTimeElem = document.createElement('div');
    dateTimeElem.id = 'dateTime';
    dateTimeElem.style.textAlign = 'top';
    dateTimeElem.style.marginBottom = '1rem';
    dateTimeElem.style.fontWeight = 'bold';
    dateTimeElem.style.fontSize = '1.6rem';
    dateTimeElem.style.color = 'var(--color-1)';
    dateTimeElem.textContent = `${getCurrentDateTime()}`;
    banner.appendChild(dateTimeElem);
}


window.addEventListener('DOMContentLoaded', () => {
    showDateTime();
});
