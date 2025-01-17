document.addEventListener("DOMContentLoaded", function () {

    const form1 = document.querySelector(".regis-form1");
    const form2 = document.getElementById("regis-form2");
    const form3 = document.getElementById("regis-form3");

    const nextBtn1 = document.getElementById("next-btn-1");
    const prevBtn2 = document.getElementById("prev-btn-2");
    const nextBtn2 = document.getElementById("next-btn-2");
    const prevBtn3 = document.getElementById("prev-btn-3");


    function showForm(formToShow) {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "none";

        formToShow.style.display = "block";
    }

    nextBtn1.addEventListener("click", function () {
        showForm(form2);
    });

    prevBtn2.addEventListener("click", function () {
        showForm(form1);
    });

    nextBtn2.addEventListener("click", function () {
        showForm(form3);
    });

    prevBtn3.addEventListener("click", function () {
        showForm(form2);
    });
});
