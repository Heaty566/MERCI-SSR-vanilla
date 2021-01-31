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

        fetch(env.SERVER_URL + "/comment", {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(formData),
        })
                .then((data) => data.json())
                .then((error) => {
                        if (error.status === 400) {
                                Object.keys(error.details).map((item) => {
                                        const errorMsg = document.getElementById(`${item}:error`);
                                        errorMsg.innerHTML = item + " " + error.details[item];
                                });
                        } else if (error.status === 200) {
                                const msg = document.getElementById("msg");
                                msg.innerHTML = "Thank for your feedback, We will contact you later. ";
                                Object.keys(formData).map((item) => {
                                        const errorMsg = document.getElementById(`${item}`);
                                        errorMsg.value = "";
                                });
                        }
                });
});
