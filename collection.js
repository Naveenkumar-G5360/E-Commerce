document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll(".promo-button");

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Show the custom popup
            document.getElementById("popup").classList.add("show");
            setTimeout(() => {
                document.getElementById("popup").classList.remove("show");
            }, 2000); // Hide popup after 2 seconds
        });
    });
});
