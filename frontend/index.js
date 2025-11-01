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

// ********** Logout **********
const signoutBtn = document.getElementById("signout");
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html";
  }
});

const studentName = document.querySelectorAll("#studentName");
const regNumber = document.querySelectorAll("#regNumber");
const studentCourse = document.querySelectorAll("#studentCourse");

studentName.forEach(name => name.textContent = JSON.parse(localStorage.getItem("loggedInUser")).name);
regNumber.forEach(reg => reg.textContent = JSON.parse(localStorage.getItem("loggedInUser")).reg_number);
studentCourse.forEach(course => course.textContent = JSON.parse(localStorage.getItem("loggedInUser")).course);

document.getElementById("first-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[0];
document.getElementById("second-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[1];
document.getElementById("last-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[2];

document.getElementById("main-mobile").textContent

// *********** Fetch and display fees **********
const feesTableBody = document.getElementById("feesTable tbody");

async function fetchFees(){
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) return;

  const reg_number = loggedInUser.reg_number;
  try {
    const response = await fetch(`http://localhost:5000/api/fees/fees/${reg_number}`);

    if (!response.ok) throw new Error('failed to fetch fees');

    const data = await response.json();
    const fees = data.fees;

    feesTableBody.innerHTML = '';

    fees.forEach(fee => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${fee.description}</td>
        <td>${fee.debits}</td>
        <td>${fee.credits}</td>
        <td>${fee.balance}</td>
        <td>${new Date(fee.date).toLocaleDateString()}</td>
      `;

      feesTableBody.appendChild(row);
    });

  }catch (error) {
    console.error('Error fetching fees:', error);
    feesTableBody.innerHTML = '<tr><td colspan="5">Error loading fees.</td></tr>';
  }
}