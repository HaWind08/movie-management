$(document).ready(function () {
    $(".theater-li__time-li").click(function () {
        $(".select").show(500);
        $(".choose-corn").show(500);
        $(".bill").show(500);
    });
});


// Form theater and time
const times = document.querySelectorAll('.theater-li__time-li');
if (times.length > 0) {
    times.forEach(time => {
        time.addEventListener('click', () => {
            times.forEach(t => t.classList.remove('active'));
            time.classList.add('active');

            const theater = time.dataset.theater; //data-[theater - address - timeSub]
            const address = time.dataset.address;
            const timeSub = time.textContent || time.innerText;

            document.getElementById('theaterInput').value = theater;
            document.getElementById('addressInput').value = address;
            document.getElementById('timeInput').value = timeSub;
            document.querySelector(".bill__addr-combo").innerHTML = address;
        });
    });
};
// End form theater and time


// chair
const formTicket = document.querySelector("#form-ticket");
const adultInput = document.querySelector('input[name="adult_quantity"]');
const childInput = document.querySelector('input[name="child_quantity"]');

const getTotalTickets = () => {
    const adultTickets = parseInt(adultInput.value) || 0;
    const childTickets = parseInt(childInput.value) || 0;
    if (adultTickets) {
        document.getElementById("adult_name").value = 'Người lớn'
    }

    if (childTickets) {
        document.getElementById("child_name").value = 'Trẻ em'
    }
    return adultTickets + childTickets;
};

if (formTicket) {
    const chairs = formTicket.querySelectorAll('input[type="checkbox"]');
    const bookButton = formTicket.querySelector('.bill__right-btn button');
    console.log(bookButton);
    

    const bookButtonState = () => {
        const selectedChairs = document.querySelectorAll(".select-chair__li-chair.active");
        
        if(selectedChairs.length > 0) {
            bookButton.disabled = false;
        } else {
            bookButton.disabled = true;
        }
    };

    chairs.forEach(chair => {
        chair.addEventListener('click', (e) => {
            const totalTickets = getTotalTickets();
            const selectedChairs = document.querySelectorAll(".select-chair__li-chair.active");
            if (totalTickets === 0) {
                alert("Vui lòng chọn vé trước khi chọn ghế!");
                e.preventDefault();
                return;
            };

            if (totalTickets > 16) {
                alert("Vui lòng chọn tối đa 16 ghế!");
                e.preventDefault();
                return;
            };

            if (!chair.classList.contains('active') && selectedChairs.length >= totalTickets) {
                alert("Bạn đã chọn đủ số ghế theo số vé!");
                e.preventDefault();
                return;
            };

            if (chair.checked) {
                chair.parentElement.classList.add('active'); // `parentElement` là thẻ `label`
            } else {
                chair.parentElement.classList.remove('active');
            };

            bookButtonState();
        });
    });

    const resetSelectedChairs = () => {
        chairs.forEach(chair => {
            chair.checked = false; // Bỏ chọn
            chair.parentElement.classList.remove('active');
        });

        bookButtonState();
    };

    adultInput.addEventListener('input', () => {
        const totalTickets = getTotalTickets();
        if (totalTickets > 16) {
            alert("Vui lòng chọn tối đa 16 ghế!");
            adultInput.value = 16 - parseInt(childInput.value) || 0;
        }
        resetSelectedChairs();
    });
    childInput.addEventListener('input', () => {
        const totalTickets = getTotalTickets();
        if (totalTickets > 16) {
            alert("Vui lòng chọn tối đa 16 ghế!");
            childInput.value = 16 - parseInt(adultInput.value) || 0;
        }
        resetSelectedChairs();
    });

    bookButtonState();
};
// End chair


// Thay đổi số lượng -> Tổng tiền
if (formTicket) {
    const inputAdultQuantity = document.querySelector('input[name="adult_quantity"]');
    const inputChildQuantity = document.querySelector('input[name="child_quantity"]');
    const adultPrice = document.querySelector(".adult__price");
    const childPrice = document.querySelector(".child__price");
    const bill = document.querySelector(".bill__pright-pr");
    const popcorns = document.querySelectorAll('input[name="popcorn_quantity"]');

    const priceAdult = parseInt(adultPrice.getAttribute("price"));
    const priceChild = parseInt(childPrice.getAttribute("price"));

    function calTotal() {
        const adultQuantity = parseInt(inputAdultQuantity.value) || 0;
        const childQuantity = parseInt(inputChildQuantity.value) || 0;

        let totalPopcorn = 0;
        popcorns.forEach(popcorn => {
            const quantity = parseInt(popcorn.value) || 0;
            const price = parseInt(popcorn.getAttribute('data-price'));
            totalPopcorn += quantity * price;
        });

        const totalPrice = (adultQuantity * priceAdult + childQuantity * priceChild + totalPopcorn);
        bill.innerHTML = `${totalPrice} VNĐ`;
        document.querySelector("#totalPrice").value = totalPrice; //send to backend
    }

    if (popcorns.length > 0) {
        popcorns.forEach(popcorn => {
            popcorn.addEventListener('change', () => {
                const max = popcorn.getAttribute("max");
                const currentValue = popcorn.value || 0;
                if (currentValue >= max) {
                    alert(`Bạn đã chọn số lượng bắp nước tối đa!`);
                    popcorn.value = max;
                };

                calTotal();
            });
        });
    };

    inputAdultQuantity.addEventListener('change', calTotal);
    inputChildQuantity.addEventListener('change', calTotal);
}
// End Thay đổi số lượng -> Tổng tiền




