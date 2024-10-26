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


// Eye login
const eyeOpen = document.querySelector(".eye-loginAdmin");
const eyeClose = document.querySelector(".eye-slash-loginAdmin");
const inputPassAdmin = document.querySelector(".input-pass-admin");

if (eyeClose) {
    eyeClose.addEventListener("click", () => {
        eyeClose.classList.add("hidden");
        eyeOpen.classList.remove("hidden");
        inputPassAdmin.setAttribute("type", "text");
    });
}

if (eyeOpen) {
    eyeOpen.addEventListener("click", () => {
        eyeClose.classList.remove("hidden");
        eyeOpen.classList.add("hidden");
        inputPassAdmin.setAttribute("type", "password");
    });
}
// End Eye login
