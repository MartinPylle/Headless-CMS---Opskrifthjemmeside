// Course button
document.querySelector(".course-button").addEventListener("click", () => {
    document.querySelector(".course-dropdown").classList.toggle("active");
});

// Time button
document.querySelector(".time-button").addEventListener("click", () => {
    document.querySelector(".time-dropdown").classList.toggle("active");
});

// Dietary button
document.querySelector(".dietary-button").addEventListener("click", () => {
    document.querySelector(".dietary-dropdown").classList.toggle("active");
});
