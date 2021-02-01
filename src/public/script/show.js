const colorInput = document.getElementById("colorInput");
colorInput.style.color = colorInput.value;

colorInput.addEventListener("change", function (event) {
        colorInput.style.color = colorInput.value;
});

const addToBag = document.getElementById("add-to-bag");

addToBag.addEventListener("click", function (event) {
        event.preventDefault();
        const color = document.getElementById("colorInput");
        const size = document.getElementById("size");

        fetch(env.SERVER_URL + `/add/${this.value}`, {
                method: "post",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                        color: color.value,
                        size: size.value,
                }),
        })
                .then((data) => data.json())
                .then((data) => {})
                .catch(() => {
                        window.location.assign("/auth/login");
                })
                .finally(() => {
                        const bagCount = document.getElementById("bag-count");

                        fetch(env.SERVER_URL + `/count`)
                                .then((data) => data.json())
                                .then((data) => {
                                        if (data.total) {
                                                bagCount.innerHTML = data.total;
                                                bagCount.style.display = "block";
                                        }
                                });
                });
});
