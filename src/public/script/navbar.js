const navbarBtnMobile = document.getElementById("navbar__btn--mobile");
navbarBtnMobile.addEventListener("click", function () {
        this.classList.toggle("active");
        document.getElementById("navbar__list").classList.toggle("active");
});

const bagCount = document.getElementById("bag-count");

axios.get(env.SERVER_URL + `/count`).then(({ data }) => {
        if (data.total) {
                bagCount.innerHTML = data.total;
                bagCount.style.display = "block";
        }
});
