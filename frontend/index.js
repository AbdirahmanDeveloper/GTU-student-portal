// ***************** navbar logic  ****************
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
};

// *********       chatbot logic      **********
const chatbotSection = document.querySelector('.chatbot-section');
const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.open-btn button')

openBtn.addEventListener('click', () => {
    chatbotSection.classList.add("active");
    openBtn.style.display = "none";
})

closeBtn.addEventListener("click", ()=>{
    chatbotSection.classList.remove("active");
    openBtn.style.display = "flex";
})

// **********  logout handle ***************



const closeNavBtn = document.querySelector(".close-nav");
const sideBar = document.querySelector(".side-bar");
function hideNavBtn(){
    if(window.matchMedia("(min-width:1200px").matches){
        closeNavBtn.style.display = "none";
        openNavBtn.style.display = "none";
    }else{
        closeBtn.style.display = "flex";
        openNavBtn.style.display = "flex";
    }
}
function hideNav(){
    sideBar.classList.add("hide-sidebar");
    openNavBtn.style.display = "display";
}
closeNavBtn.addEventListener("click",hideNav)
function btnTxtChange(){
    if(window.matchMedia("(max-width:1200px)").matches){
        openBtn.innerHTML = "CHATBOT";
        closeBtn.innerHTML = "X"
    }
}
const openNavBtn = document.querySelector(".open-nav");
function openNav(){
    sideBar.classList.remove("hide-sidebar");
}
openNavBtn.addEventListener("click", openNav)
btnTxtChange();
hideNavBtn();