
document.addEventListener("DOMContentLoaded", () => {
    const toastAlerts = document.querySelectorAll(".toastAlert");

    toastAlerts.forEach((toastAlert) => {
        const closeBtn = toastAlert.querySelector(".close");
        const progress = toastAlert.querySelector(".progress");
        const displayTime = parseInt(toastAlert.getAttribute("data-time"));

        progress.classList.add("active");

        const time1 = setTimeout(() => {
            toastAlert.classList.add("alert-hidden");
        }, displayTime);

        const time2 = setTimeout(() => {
            progress.classList.remove("active");
        }, displayTime + 300);

        closeBtn.addEventListener("click", () => {
            toastAlert.classList.add("alert-hidden");
            progress.classList.remove("active");

            clearTimeout(time1);
            clearTimeout(time2);
        });
    });
});



