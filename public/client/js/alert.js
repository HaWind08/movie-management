
document.addEventListener("DOMContentLoaded", () => {
    const toastAlerts = document.querySelectorAll(".toastAlert");

    toastAlerts.forEach((toastAlert) => {
        const closeBtn = toastAlert.querySelector(".close");
        const displayTime = parseInt(toastAlert.getAttribute("data-time"));

        const time1 = setTimeout(() => {
            toastAlert.classList.add("alert-hidden");
        }, displayTime);

        closeBtn.addEventListener("click", () => {
            toastAlert.classList.add("alert-hidden");
            clearTimeout(time1);
        });
    });
});






