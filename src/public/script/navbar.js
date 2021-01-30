const navbarBtnMobile = document.getElementById("navbar__btn--mobile");
navbarBtnMobile.addEventListener("click", function () {
        this.classList.toggle("active");
        document.getElementById("navbar__list").classList.toggle("active");
});
