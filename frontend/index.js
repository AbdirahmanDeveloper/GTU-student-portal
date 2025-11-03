
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

// ***************display user info ******************>

const studentName = document.querySelectorAll("#studentName");
const regNumber = document.querySelectorAll("#regNumber");
const studentCourse = document.querySelectorAll("#studentCourse");

studentName.forEach(name => name.textContent = JSON.parse(localStorage.getItem("loggedInUser")).name);
regNumber.forEach(reg => reg.textContent = JSON.parse(localStorage.getItem("loggedInUser")).reg_number);
studentCourse.forEach(course => course.textContent = JSON.parse(localStorage.getItem("loggedInUser")).course);

document.getElementById("first-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[0];
document.getElementById("second-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[1];
document.getElementById("last-name").textContent = JSON.parse(localStorage.getItem("loggedInUser")).name.split(' ')[2];

document.getElementById("main-mobile").textContent = JSON.parse(localStorage.getItem("loggedInUser")).phone_number;
document.getElementById("alt-mobile").textContent = JSON.parse(localStorage.getItem("loggedInUser")).alt_phone_number;
document.getElementById("online-mobile").textContent = JSON.parse(localStorage.getItem("loggedInUser")).phone_number;
document.getElementById("main-email").textContent = JSON.parse(localStorage.getItem("loggedInUser")).email;
document.getElementById("alt-email").textContent = JSON.parse(localStorage.getItem("loggedInUser")).email;
document.getElementById("online-email").textContent = JSON.parse(localStorage.getItem("loggedInUser")).email;


// ************* fetch timetable **********************
async function fetchTimetable(){
  try{
    const response = await fetch('http://localhost:5000/api/timetable');
    if(!response.ok){
      throw new Error('failed to fetch timetable');
    }

    const data = await response.json();
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.unit_code}</td>
      <td>${item.subject_name}</td>
      <td>${item.start_time}</td>
      <td>${item.end_time}</td>
      <td>${item.venue}</td>
      <td>${item.lecturer_name}</td>
      `;
      tableBody.appendChild(row);
    })
  } catch(error){
    console.error(error);
    alert("error fetching data");
  }
}
fetchTimetable();

// ************* fetch results **********************

async function fetchResults() {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const reg_number = user?.reg_number;

    if (!reg_number) {
      alert("No logged-in user found. Please log in first.");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/results?reg_number=${encodeURIComponent(reg_number)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch results");
    }

    const data = await response.json();

    const resultsTableBody = document.getElementById("resultsTableBody");
    resultsTableBody.innerHTML = "";

    data.results.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.unit_code}</td>
        <td>${item.unit_name}</td>
        <td>${item.academic_hours}</td>
        <td>${item.marks}</td>
        <td>${item.grade}</td>
      `;
      resultsTableBody.appendChild(row);
    });

  } catch (error) {
    console.error(error);
    alert("Error fetching results");
  }
}
fetchResults();

// ************* fetch fees **********************

async function fetchFees() {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const reg_number = user?.reg_number;

   

    const response = await fetch(`http://localhost:5000/api/fees?reg_number=${encodeURIComponent(reg_number)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch fees");
    }

    const data = await response.json();

    const feesTableBody = document.getElementById("feesTableBody");
    feesTableBody.innerHTML = "";

    data.fees.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.date.split('T')[0]}</td>
        <td>${item.description}</td>
        <td>${item.credits}</td>
        <td>${item.debits}</td>
        <td>${item.balance}</td>
      `;
      feesTableBody.appendChild(row);
    });

  } catch (error) {
    console.error(error);
    alert("Error fetching fees");
  }
}

fetchFees();


// *********** course registration *****************

const courseForm = document.getElementById("courseForm");
const courseTablebody = document.getElementById("courseTableBody");

function registerCourses(event) {
  event.preventDefault();

  const rows = courseForm.querySelectorAll("tr");

  rows.forEach(row => {
    const unitCode = row.querySelector(".unit-code")?.value;
    const group = row.querySelector(".group")?.value;
    const examType = row.querySelector(".examType")?.value;

    // Skip empty rows
    if (!unitCode) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${unitCode}</td>
      <td>Unit Name Placeholder</td>
      <td>${examType}</td>
      <td>${group}</td>
      <td>Lecturer Name Placeholder</td>
    `;
    courseTablebody.appendChild(tr);
  });

  courseForm.reset();
}

courseForm.addEventListener('submit', registerCourses);
