// ********** Navbar logic **********
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll(".content-section");

function showPage(pageId, event){
  event.preventDefault();
  sections.forEach(section => section.classList.remove("active"));
  const target = document.getElementById(pageId);
  if(target) target.classList.add("active");

  navLinks.forEach(link => link.classList.remove("active"));
  event.target.classList.add("active");
}

// ********** Chatbot logic **********
const chatbotSection = document.querySelector('.chatbot-section');
const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.open-btn button');

openBtn.addEventListener('click', () => {
  chatbotSection.classList.add("active");
  openBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  chatbotSection.classList.remove("active");
  openBtn.style.display = "flex";
});

// ********** Sidebar logic **********
const closeNavBtn = document.querySelector(".close-nav");
const openNavBtn = document.querySelector(".open-nav");
const sideBar = document.querySelector(".side-bar");

function hideNavBtn(){
  if(window.matchMedia("(min-width:1200px)").matches){
    closeNavBtn.style.display = "none";
    openNavBtn.style.display = "none";
  } else {
    closeNavBtn.style.display = "flex";
    openNavBtn.style.display = "flex";
  }
}

function hideNav(){
  sideBar.classList.add("hide-sidebar");
  openNavBtn.style.display = "flex";
}

function openNav(){
  sideBar.classList.remove("hide-sidebar");
}

closeNavBtn.addEventListener("click", hideNav);
openNavBtn.addEventListener("click", openNav);

function btnTxtChange(){
  if(window.matchMedia("(max-width:1200px)").matches){
    openBtn.innerHTML = "CHATBOT";
    closeBtn.innerHTML = "X";
  }
}

btnTxtChange();
hideNavBtn();

// ********** Check login **********
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  // If no user logged in, redirect to login
  window.location.href = "login.html";
} else {
  // Fetch and display student info
  fetchStudentInfo(loggedInUser.reg_number);
}

// ********** Fetch student info **********
async function fetchStudentInfo(reg_number) {
  try {
    const response = await fetch(`http://localhost:5000/student/${reg_number}`);
    const data = await response.json();

    if (data.success) {
      const s = data.student;

      document.getElementById("address").value = s.address || "";
      document.getElementById("post_code").value = s.post_code || "";
      document.getElementById("city").value = s.city || "";
      document.getElementById("country").value = s.country || "";
      document.getElementById("home_county").value = s.home_county || "";
      document.getElementById("sub_county").value = s.sub_county || "";
      document.getElementById("main_mobile").value = s.main_mobile || "";
      document.getElementById("alt_mobile").value = s.alt_mobile || "";
      document.getElementById("online_mobile").value = s.online_mobile || "";
      document.getElementById("alt_online_mobile").value = s.alt_online_mobile || "";
      document.getElementById("main_email").value = s.main_email || "";
      document.getElementById("alt_email").value = s.alt_email || "";
      document.getElementById("online_email").value = s.online_email || "";
      document.getElementById("alt_online_email").value = s.alt_online_email || "";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Error fetching student info:", err);
  }
}

// ********** Logout **********
const signoutBtn = document.getElementById("signout");
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
