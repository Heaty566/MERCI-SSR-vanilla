const navbarBtnMobile = document.getElementById("navbar__btn--mobile");
navbarBtnMobile.addEventListener("click", function () {
        this.classList.toggle("active");
        document.getElementById("navbar__list").classList.toggle("active");
});
const sortFilter = document.getElementById("sort");
sortFilter.addEventListener("change", function () {
        window.location.assign(`${window.location.origin}/store?${this.value}`);
        console.log(`${window.location.origin}/store?${this.value}`);
});
