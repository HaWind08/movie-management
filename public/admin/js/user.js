// Logout confirm
const buttonLogoutAdmin = document.querySelector(".button-logout-admin");
if (buttonLogoutAdmin) {
    const formLogout = document.querySelector("#form-logout");
    const path = formLogout.getAttribute("data-path");

    buttonLogoutAdmin.addEventListener("click", (event) => {
        event.preventDefault();

        const isConfirm = confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (isConfirm) {
            formLogout.action = path;
            formLogout.submit();
        }
    })
}

// End Logout confirm