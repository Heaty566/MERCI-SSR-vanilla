const deleteBtn = document.getElementsByClassName("checkout__delete");
const btnCheckout = document.getElementById("btn-checkout");
const btnQuit = document.getElementById("info-quit");
for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn.item(i).addEventListener("click", function (event) {
                event.preventDefault();
                fetch(env.SERVER_URL + `/remove/${this.value}`, {
                        method: "post",
                }).finally(() => {
                        window.location.reload();
                });
        });
}

btnCheckout.addEventListener("click", function (event) {
        event.preventDefault();
        const infoForm = document.getElementById("info-form");

        infoForm.style.display = "grid";
});
btnQuit.addEventListener("click", function (event) {
        event.preventDefault();
        const infoForm = document.getElementById("info-form");
        infoForm.style.display = "none";
});
