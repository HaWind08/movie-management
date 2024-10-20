// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
// End Show alert

// Checkbox register
document.querySelector('form').addEventListener('submit', function (event) {
    var termsCheckbox = document.getElementById('termsCheckbox');
    var errorMessage = document.getElementById('error-message');

    if (!termsCheckbox.checked) {
        event.preventDefault();
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
});
// End Checkbox register

