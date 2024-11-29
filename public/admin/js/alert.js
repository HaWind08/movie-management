document.addEventListener("DOMContentLoaded", () => {
    const toastAlerts = document.querySelectorAll(".toastAlert");

    toastAlerts.forEach((toastAlert) => {
        const closeBtn = toastAlert.querySelector(".close");
        const progress = toastAlert.querySelector(".progress");
        const displayTime = parseInt(toastAlert.getAttribute("data-time"));

        setTimeout(() => {
            progress.classList.add("active");
        }, 100);

        // Ẩn thông báo sau thời gian quy định
        const hideTimeout = setTimeout(() => {
            toastAlert.classList.add("alert-hidden");
            progress.classList.remove("active");
        }, displayTime);

        // Xử lý nút đóng
        closeBtn.addEventListener("click", () => {
            toastAlert.classList.add("alert-hidden"); 
            progress.classList.remove("active"); 
            clearTimeout(hideTimeout); 
        });
    });
});


