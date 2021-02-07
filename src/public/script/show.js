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

        axios.post(env.SERVER_URL + `/add/${this.value}`, {
                color: color.value,
                size: size.value,
        })
                .catch(() => {
                        window.location.assign("/auth/login");
                })
                .finally(() => {
                        const bagCount = document.getElementById("bag-count");

                        axios.get(env.SERVER_URL + `/count`).then(({ data }) => {
                                if (data.total) {
                                        bagCount.innerHTML = data.total;
                                        bagCount.style.display = "block";
                                }
                        });
                });
});
