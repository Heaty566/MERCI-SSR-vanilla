const colorInput = document.getElementById("colorInput");
colorInput.style.color = colorInput.value;

colorInput.addEventListener("change", function (event) {
        colorInput.style.color = colorInput.value;
});
