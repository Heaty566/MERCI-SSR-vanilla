const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentInput = document.getElementById("comment");

form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
                name: nameInput.value,
                email: emailInput.value,
                comment: commentInput.value,
        };

        Object.keys(formData).map((item) => {
                const errorMsg = document.getElementById(`${item}:error`);
                errorMsg.innerHTML = "";
        });
        const msg = document.getElementById("msg");
        msg.innerHTML = "";

        axios.post(env.SERVER_URL + "/comment", { ...formData })
                .then((data) => {
                        const msg = document.getElementById("msg");
                        msg.innerHTML = "Thank for your feedback, We will contact you later. ";
                        Object.keys(formData).map((item) => {
                                const errorMsg = document.getElementById(`${item}`);
                                errorMsg.value = "";
                        });
                })
                .catch((error) => {
                        const data = error.response.data;

                        Object.keys(data.details).map((item) => {
                                const errorMsg = document.getElementById(`${item}:error`);
                                errorMsg.innerHTML = item + " " + data.details[item];
                        });
                });
});
