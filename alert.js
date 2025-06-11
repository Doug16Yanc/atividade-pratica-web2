const overlay = document.getElementById('custom-alert');
const okBtn = document.getElementById('alert-ok');

function showAlert() {
    overlay.style.display = 'flex';
}

okBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
        showAlert();
});
