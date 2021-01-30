let searchValue = "/store";

let sort = "";
let search = "";

const sortFilter = document.getElementById("sort");
sortFilter.addEventListener("change", function () {
        sort = this.value;
});

const searchFilter = document.getElementById("search");

searchFilter.addEventListener("keyup", function () {
        search = this.value;
});

const filter = document.getElementById("filter");

filter.addEventListener("submit", function (event) {
        event.preventDefault();

        window.location.assign(`${window.location.origin}/store?name=${search}&${sort}`);
});
let callApi = false;
window.addEventListener("scroll", function (event) {
        if (this.screen.height - this.scrollY < 300 && !callApi) {
                callApi = !callApi;

                fetch(`${env.SERVER_URL}/more${window.location.search}`)
                        .then((data) => data.json())
                        .then((data) => {
                                const htmlData = data.map((item) => {
                                        return `<a class="item__wrapper" href="#">
                                                        <div class="item--top">
                                                                <img src="/asset/images/heart.svg" alt="love" />
                                                        </div>
                                                        <img class="item__img" src="${item.imageUrl} " alt="${item.name} " />
                                                        <h2 class="item__name">${item.name}</h2>
                                                        <p class="item__price">${item.price}</p>
                                                </a>`;
                                });
                                const store = document.getElementById("store");
                                store.innerHTML += htmlData.join("");
                        });
        }
});
