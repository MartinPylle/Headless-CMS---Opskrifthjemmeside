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


// // course
// document.querySelectorAll(".course-dropdown p").forEach(item => {
//     item.addEventListener("click", () => {
//         filters.course = item.dataset.value;
//         updateUI();
//     });
// });

// // time
// document.querySelectorAll(".time-dropdown p").forEach(item => {
//     item.addEventListener("click", () => {
//         filters.time = item.dataset.value;
//         updateUI();
//     });
// });

// // dietary
// document.querySelectorAll(".dietary-dropdown p").forEach(item => {
//     item.addEventListener("click", () => {
//         filters.dietary = item.dataset.value;
//         updateUI();
//     });
// });