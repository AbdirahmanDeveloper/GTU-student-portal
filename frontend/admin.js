const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll(".content-section");
function showPage(pageId, event){
    event.preventDefault();
    sections.forEach(section => section.classList.remove("active"));

    const target = document.getElementById(pageId);

    if(target){
        target.classList.add("active");
    }
    navLinks.forEach(link => link.classList.remove("active"));
    event.target.classList.add("active");
}
navLinks.forEach(link => {
    link.addEventListener("click", event =>{
        const pageId = link.getAttribute("href").replace("#", "");
        showPage(pageId,event);
    });
});
const sideBar = document.querySelector("header");
const openNavBtn = document.querySelector(".open-nav");
const closeNavBtn = document.querySelector(".close-nav");

closeNavBtn.addEventListener("click", ()=>{
    sideBar.classList.add("hide-sidebar");
    openNavBtn.style.display = "block"
});

openNavBtn.addEventListener("click", ()=>{
    sideBar.classList.remove("hide-sidebar");
    openNavBtn.style.display = "none"
});


function hideNavBtn(){
    if(window.matchMedia("(min-width:1200px)").matches){
        openNavBtn.style.display = "none";
        closeNavBtn.style.display = "none";
    }else{
        openNavBtn.style.display = "block";
        closeNavBtn.style.display = "block";
    }
}
hideNavBtn();

const studentForm = document.querySelector(".new-student-form");
const firstNameInput = document.getElementById("first-name");
const secondNameInput = document.getElementById("second-name");
const lastNameInput = document.getElementById("last-name");
const regNumberInput = document.getElementById("reg-number");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile-no");
const altMobileInput = document.getElementById("alt-mobile");
const courseInput = document.getElementById("course");
const nationalIdInput = document.getElementById("national-id");

studentForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const studentData = {
        reg_number: regNumberInput.value,
        first_name: firstNameInput.value,
        second_name: secondNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        mobile: mobileInput.value,
        alt_mobile: altMobileInput.value,
        national_id: nationalIdInput.value,
        course: courseInput.value,
    }

    try{
        const response = await fetch("http://localhost:5000/api/students", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        if(response.ok){
            alert("student registred succesfully");
            studentForm.reset();
        }else{
            alert("Error:" + result.message)
        }
    }catch(error){
        console.error(error);
        alert("Failed to register student.");
    }
})
