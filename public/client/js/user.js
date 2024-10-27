// Logout comfirm
const buttonLogout = document.querySelector(".button-logout");
if (buttonLogout) {
    const formLogout = document.querySelector("#form-logout");
    const path = formLogout.getAttribute("data-path");

    buttonLogout.addEventListener("click", (event) => {
        event.preventDefault();

        const isConfirm = confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (isConfirm) {
            formLogout.action = path;
            formLogout.submit();
        }
    });
}
// End Logout comfirm