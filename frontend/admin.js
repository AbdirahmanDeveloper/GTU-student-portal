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
