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

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }

        const buttonClose = document.querySelector(".close");
        buttonClose.classList.remove("hidden-close");
        buttonClose.addEventListener("click", () => {
            buttonClose.classList.add("hidden-close");
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
        })
    });
}
// End Upload Image

// Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            };

            window.location.href = url.href;
        });
    });
}
// End Button status

// Form search (kết hợp bộ lọc)
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        };

        window.location.href = url.href;
    });
}
// End form search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    let url = new URL(window.location.href);

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);
            window.location.href = url.href;
        });


    });
};

// End Pagination
