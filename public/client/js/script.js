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


// Check password
const errorPassword = document.getElementById('password');
const btnSubmitRegister = document.querySelector(".register__middle-button");

if (btnSubmitRegister) {
    btnSubmitRegister.addEventListener("click", (event) => {
        // password
        const password = document.getElementById('password').value;
        const errorPass = document.getElementById('error-pass');
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {
            event.preventDefault();
            errorPass.style.display = 'block';
        } else {
            errorPass.style.display = 'none';
        };

        // confirm password
        const confirmPass = document.querySelector("#confirmPassword");
        const errorPassConfirm = document.querySelector("#error-pass-confirm");
        if (confirmPass.value !== password) {
            event.preventDefault();
            errorPassConfirm.style.display = 'block';
        } else {
            errorPassConfirm.style.display = 'none';
        }

        // check phone
        const phoneError = document.querySelector("#phone-error");
        const phone = document.querySelector("#phoneNumber");
        const phoneValue = phone.value.trim();

        if (phoneValue === "") {
            event.preventDefault();
            phoneError.textContent = "Vui lòng nhập số điện thoại.";
            phoneError.style.display = "block";
        } else if (!/^\d+$/.test(phoneValue)) {
            event.preventDefault();
            phoneError.textContent = "Số điện thoại chỉ gồm các chữ số.";
            phoneError.style.display = 'block';
        } else if (phoneValue.length < 7 || phoneValue.length > 15) {
            event.preventDefault();
            phoneError.textContent = "Số điện thoại phải có độ dài từ 7 đến 15 ký tự.";
            phoneError.style.display = 'block';
        }
        else {
            phoneError.style.display = 'none';
        }

        // Checkbox
        var termsCheckbox = document.getElementById('termsCheckbox');
        var errorMessage = document.getElementById('error-message');

        if (!termsCheckbox.checked) {
            event.preventDefault();
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }
    });
}
// End Check password


// Eye pass
const eyeOpen = document.querySelector(".eye-pass");
const eyeClose = document.querySelector(".eye-slash-pass");
const inputPass = document.querySelector(".input-pass");

if (eyeClose) {
    eyeClose.addEventListener("click", () => {
        eyeClose.classList.add("hidden");
        eyeOpen.classList.remove("hidden");
        inputPass.setAttribute("type", "text");
    });
}

if (eyeOpen) {
    eyeOpen.addEventListener("click", () => {
        eyeClose.classList.remove("hidden");
        eyeOpen.classList.add("hidden");
        inputPass.setAttribute("type", "password");
    });
}

const eyeOpenConfirm = document.querySelector(".eye-confirm");
const eyeCloseConfirm = document.querySelector(".eye-slash-confirm");
const inputPassConfirm = document.querySelector(".eye-pass-confirm");

if (eyeCloseConfirm) {
    eyeCloseConfirm.addEventListener("click", () => {
        eyeCloseConfirm.classList.add("hidden");
        eyeOpenConfirm.classList.remove("hidden");
        inputPassConfirm.setAttribute("type", "text");
    });
}

if (eyeOpenConfirm) {
    eyeOpenConfirm.addEventListener("click", () => {
        eyeCloseConfirm.classList.remove("hidden");
        eyeOpenConfirm.classList.add("hidden");
        inputPassConfirm.setAttribute("type", "password");
    });
}

const eyeOpenLogin = document.querySelector(".eye-login");
const eyeCloseLogin = document.querySelector(".eye-slash-login");
const inputPassLogin = document.querySelector(".input-login");

if (eyeCloseLogin) {
    eyeCloseLogin.addEventListener("click", () => {
        eyeCloseLogin.classList.add("hidden");
        eyeOpenLogin.classList.remove("hidden");
        inputPassLogin.setAttribute("type", "text");
    });
}

if (eyeOpenLogin) {
    eyeOpenLogin.addEventListener("click", () => {
        eyeCloseLogin.classList.remove("hidden");
        eyeOpenLogin.classList.add("hidden");
        inputPassLogin.setAttribute("type", "password");
    });
}
// End Eye pass

// Banner
const listImages = document.querySelector(".list-images");
const imgs = document.querySelectorAll(".item-image img");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const length = imgs.length;
let current = 0;

if (listImages) {
    const handleChangeSlide = () => {
        if (current == length - 1) {
            current = 0;
            let width = imgs[0].offsetWidth;
            listImages.style.transform = `translateX(0px)`;
            document.querySelector(".active").classList.remove("active");
            document.querySelector(".index-item-" + current).classList.add("active");
        } else {
            current++;
            let width = imgs[0].offsetWidth;
            listImages.style.transform = `translateX(${width * -1 * current}px)`;
            document.querySelector(".active").classList.remove("active");
            document.querySelector(".index-item-" + current).classList.add("active");
        }
    }

    let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);

    btnRight.addEventListener("click", () => {
        clearInterval(handleEventChangeSlide);
        handleChangeSlide();
        handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
    });

    btnLeft.addEventListener("click", () => {
        clearInterval(handleEventChangeSlide);
        if (current == 0) {
            current = length - 1;
            let width = imgs[0].offsetWidth;
            listImages.style.transform = `translateX(${width * -1 * current}px)`;
            document.querySelector(".active").classList.remove("active");
            document.querySelector(".index-item-" + current).classList.add("active");
        } else {
            current--;
            let width = imgs[0].offsetWidth;
            listImages.style.transform = `translateX(${width * -1 * current}px)`;
            document.querySelector(".active").classList.remove("active");
            document.querySelector(".index-item-" + current).classList.add("active");
        };
        handleEventChangeSlide = setInterval(handleChangeSlide, 4000)
    });
}
// End banner