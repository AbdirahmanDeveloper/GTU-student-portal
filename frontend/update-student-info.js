const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll(".content-section");

function showPage(pageId ,event){
    event.preventDefault();

    sections.forEach(section => section.classList.remove("active"));

    const target = document.getElementById(pageId);

    if(target){
        target.classList.add("active");
    }

    navLinks.forEach(link => link.classList.remove("active"));

    event.target.classList.add("active");
}