
// ********** Logout **********
const signoutBtn = document.getElementById("signout");
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

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
const chatbotSection = document.getElementById("chatbot-section");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

openBtn.addEventListener("click", () =>{
  chatbotSection.classList.add("active");
  openBtn.style.display = "none";
});
closeBtn.addEventListener("click", () =>{
  chatbotSection.classList.remove("active");
  openBtn.style.display = "block";
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
  openNavBtn.style.display = "none"
}

closeNavBtn.addEventListener("click", hideNav);
openNavBtn.addEventListener("click", openNav);
hideNavBtn();


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
function gradeToPoints(grade) {
  switch (grade) {
    case "A": return 5;
    case "B+": return 4.5;
    case "B": return 4;
    case "C+": return 3.5;
    case "C": return 3;
    case "D": return 2;
    case "F": return 0;
    default: return 0;
  }
}


async function fetchResultsAndGPA() {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const reg_number = user?.reg_number;

    const response = await fetch(`http://localhost:5000/api/results?reg_number=${encodeURIComponent(reg_number)}`);
    const data = await response.json();

    const resultsTableBody = document.getElementById("resultsTableBody");
    resultsTableBody.innerHTML = "";

    let totalPoints = 0;
    let totalHours = 0;

    data.results.forEach(item => {
      const hours = parseInt(item.academic_hours);
      const points = gradeToPoints(item.grade);

      totalPoints += points * hours;
      totalHours += hours;

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

    const gpa = (totalPoints / totalHours).toFixed(2);

    document.getElementById("target-gpa").innerHTML = 5;

    const gpaBar = document.querySelector("#gpaBar span");
    let gpaPercentage = (gpa / 5) * 100;
    if (gpaPercentage > 100) gpaPercentage = 100;
    gpaBar.style.width = gpaPercentage + "%";

    const gpaPercentageCount = document.getElementById("gpa-percentage");
    if(!gpaPercentage){
      gpaPercentage.innerHTML = ""
    } else
      {
      gpaPercentageCount.innerHTML =`Conguratulations you're  ${Math.round(gpaPercentage)}% towards your goal`
    }

  } catch (error) {
    console.error(error);
    alert("Error fetching results");
  }
}

fetchResultsAndGPA();


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

    let totalCredits = 0;
let totalDebits = 0;
let totalBalance = 0;

data.fees.forEach(item => {
  totalCredits += Number(item.credits);
  totalDebits += Number(item.debits);
  totalBalance += Number(item.balance);
});

if (data.fees.length > 0) {
  const balanceAmount = document.getElementById("balance");
  const paidAmount = document.getElementById("paid");
  const totaAmount = document.getElementById("total");
  const feesBar = document.querySelector("#feesBar span");
  const percentageEl = document.getElementById("fees-percentage");

  paidAmount.innerHTML = totalCredits.toLocaleString();
  totaAmount.innerHTML = `Total ${totalDebits.toLocaleString()}`;
  balanceAmount.innerHTML = totalBalance.toLocaleString();

  let percentage = (totalCredits / totalDebits) * 100;
  if (percentage > 100) percentage = 100;

  feesBar.style.width = percentage + "%";
  percentageEl.innerHTML = Math.round(percentage) + "%";

  if (totalBalance > 0) {
    document.getElementById("fees-minicard-desc").innerHTML = "<strong>Payment overdue:</strong> please clear your fees balance before the deadline"
    document.getElementById("fees-minicard").style.background = "#fac2c2";
    document.getElementById("fees-minicard-desc").style.color = "red"
}
 
}
  } catch (error) {
    console.error(error);
    alert("Error fetching fees");
  }
}

fetchFees();


// *********** course registration *****************

const courseForm = document.getElementById("courseForm");
const courseTableBody = document.getElementById("courseTableBody");

function showMessage(msg) {
  alert(msg);
}

async function registerCourses(event) {
  event.preventDefault();

  const rows = courseForm.querySelectorAll("tr");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const reg_number = loggedInUser?.reg_number;

  if (!reg_number) {
    showMessage("You must be logged in to register courses.");
    return;
  }

  for (const row of rows) {
    const unitCodeInput = row.querySelector(".unit-code");
    const groupSelect = row.querySelector(".group");
    const examTypeSelect = row.querySelector(".examType");

    if (!unitCodeInput) continue;

    const unitCode = unitCodeInput.value.trim();
    const group = groupSelect.value;
    const examType = examTypeSelect.value;

    if (!unitCode) continue;

    try {
      const response = await fetch("http://localhost:5000/api/register-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reg_number,
          unit_code: unitCode,
          group,
          exam_type: examType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Error registering course");
        continue;
      }


      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.registered.unit_code}</td>
        <td>${data.registered.unit_name}</td>
        <td>${data.registered.exam_type}</td>
        <td>${data.registered.group}</td>
        <td>${data.registered.lecturer_name}</td>
      `;
      courseTableBody.appendChild(tr);

    } catch (err) {
      console.error("Error registering course:", err);
      showMessage("Network error while registering course");
    }
  }

  courseForm.reset();
}

courseForm.addEventListener("submit", registerCourses);


// *********** request section *****************
document.getElementById("requestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const requestType = document.getElementById("request").value;
  const message = document.getElementById("text-area").value;

  if (!requestType || !message.trim()) {
    alert("Please select a request type and write your message.");
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  try {
    const response = await fetch("http://localhost:5000/api/request/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        requestType, 
        message,
        studentName: loggedInUser.name,      
        regNumber: loggedInUser.reg_number  
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert(" Request sent successfully!");
      document.getElementById("text-area").value = "";
    } else {
      alert(" Failed to send request. Try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(" Something went wrong. Check your connection or server.");
  }
});

