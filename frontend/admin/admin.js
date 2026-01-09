// ********** Sidebar logic **********
const navBar = document.querySelector("nav");
const navigationBtn = document.querySelector(".navigation-btn");
navigationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  navBar.classList.add("active")
})
document.addEventListener("click", (e) => {
    if (!navBar.contains(e.target) && !navigationBtn.contains(e.target)) {
        navBar.classList.remove("active");
    }
});

const navLinks = document.querySelectorAll("nav .nav-item");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href").substring(1); 
        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(target).classList.add("active");

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ********** dropdwon logic **********
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    const toggle = drop.querySelector("a");
    const menu = drop.querySelector(".dropdown-menu");

    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        if (menu) {
            menu.classList.toggle("active");
        }
    });
});

const studentForm = document.querySelector(".new-student-form");
const studentImg = document.getElementById("imageInput");

studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const studentData = {
            first_name: document.getElementById("first-name").value,
            second_name: document.getElementById("second-name").value,
            last_name: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            phone_number: document.getElementById("mobile-no").value,
            alt_phone_number: document.getElementById("alt-mobile").value,
            national_id: document.getElementById("national-id").value,
            course: document.getElementById("course").value
          };
          
          const response = await fetch("http://localhost:5000/api/students", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
          });
          

        const result = await response.json();

        if(response.ok){
            alert("Student registered successfully");
            studentForm.reset();
        } else {
            alert("Error: " + result.message);
        }

    } catch(error){
        console.error(error);
        alert("Failed to register student.");
    }
});



const feesForm = document.getElementById("fees-insert-form");
const feesRegNumberInput = document.getElementById("fees-reg-number");
const feesDescription = document.getElementById("description");
const creditedAmount =  document.getElementById("credited-amount");

feesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentFeesData = {
        reg_number: feesRegNumberInput.value,
        description: feesDescription.value,
        credits: creditedAmount.value,
    }

    try {
        const response = await fetch ("http://localhost:5000/api/insert-fees", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(studentFeesData)
        });

        const data = await response.json();
        if(response.ok){
            alert("fees inserted succesfully");
            feesForm.reset();
        } else {
            alert("Error:" + data.message);
        }
    } catch(error){
        console.error(error);
        alert("failed to insert")
    }
});

async function fetchTotalFees() {
  try {
    const progressFill = document.querySelector(".progress-fill");
    const response = await fetch("http://localhost:5000/api/insert-fees/total-fees");
    const data = await response.json();

    if (response.ok) {
      document.querySelectorAll("#totalFees").forEach(item => {
        item.textContent = data.totalDebits;  
      })
      document.getElementById("paid-amount").textContent = data.totalCredits
      document.getElementById("balance-amount").textContent = data.totalBalance
      const paidPercentage = data.totalDebits ? (data.totalCredits / data.totalDebits) * 100 : 0;
      progressFill.style.width = `${paidPercentage}%`;

      document.getElementById("percentage").textContent = `${paidPercentage.toFixed(1)}%`;



    } else {
      console.error("Error fetching total fees:");
    }
  } catch (error) {
    console.error(error);
  }
}

fetchTotalFees();


document.getElementById("resultsForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const unitDetails = {
        reg_number: document.getElementById("reg-number").value,
        unit_code: document.getElementById("unit-code").value,
        unit_name: document.getElementById("unit-name").value,
        academic_hours: document.getElementById("academic-hours").value,
        marks: document.getElementById("marks").value,
        grade: document.getElementById("grade").value,
    };

    try{
        const response = await fetch("http://localhost:5000/api/insert-results",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(unitDetails)
    });

    const data = await response.json();

    if(response.ok){
        alert(data.message);
    }
    }catch(error){
        console.error(error);
    }
});

async function fetchRequests(){

    try{
        const tableBody = document.getElementById("request-tBody");
        const response = await fetch("http://localhost:5000/api/update-requests");

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message)
        }

        tableBody.innerHTML = "";

        data.request.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.reg_number}</td>
                 <td>${item.request}</td>
                <td>${item.request_type}</td>
                <td>
                    <input type="text"
                    class="remark-input"
                    data-request-id="${item.id}"
                    value="${item.remark ?? ""}">
                </td>
            `

            tableBody.appendChild(row);
        })

    }catch{

    }
}

fetchRequests();

document.getElementById("request-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    try {
      const remarkInputs = document.querySelectorAll(".remark-input");
  
      const remarks = [];
  
      remarkInputs.forEach(input => {
        remarks.push({
          id: input.dataset.requestId,
          remark: input.value.trim()
        });
      });
  
      const response = await fetch("http://localhost:5000/api/update-requests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ remarks })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }
  
      alert(data.message || "Remarks updated successfully");
  
      fetchRequests();
  
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update remarks");
    }
  });
  

  async function fetchCourse() {
    try {
      const tableBody = document.getElementById("courses-tBody");
  
      const response = await fetch("http://localhost:5000/api/courses");
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch courses");
      }
  
      tableBody.innerHTML = "";
  
      if (!Array.isArray(data.courses)) {
        throw new Error("Invalid courses data");
      }
  
      data.courses.forEach(course => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${course.course_code}</td>
          <td>${course.course_title}</td>
        `;
  
        tableBody.appendChild(row);
      });
  
    } catch (error) {
      console.error("Fetch courses error:", error);
    }
  }
  
  fetchCourse();
  async function fetchTotalCourses() {
    try {
      const response = await fetch("http://localhost:5000/api/courses/total-courses");
      const data = await response.json();
  
      if (response.ok) {
        document.getElementById("totalCourses").textContent = data.totalCourses;
      } else {
        console.error("Error fetching total courses:", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchTotalCourses();

  async function fetchTimeTable() {

    try{
      const res = await fetch("http://localhost:5000/api/timetables");
  
      const data = await res.json();
  
      const tableBody = document.getElementById("timetableTAbleBody");
  
      tableBody.innerHTML = ""
  
      data.timetable.forEach(item => {
  
      const formatedExamDate = item.exam_date ? new Date(item.exam_date).toLocaleDateString(): "_";
  
      const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${item.unit_code}</td>
          <td>${item.unit_name}</td>
          <td>${item.lecturer}</td>
          <td>${item.start_time}</td>
          <td>${item.end_time}</td>
          <td>${item.venue}</td>
          <td>${formatedExamDate}</td>
        `
  
        tableBody.appendChild(row);
      });
      
    }catch{
  
    }
    
  }
  fetchTimeTable();

  document.getElementById("removeUnit").addEventListener("submit", async(e) => {
    e.preventDefault();

    const unitCode = document.getElementById("remove-unit-code").value;

    try{
      const response = await fetch("http://localhost:5000/api/timetables/delete",{
        method:"DELETE",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({unit_code:unitCode})
    });

    const data = await response.json();

    if(response.ok){
      alert(data.message);
    }
    e.target.reset();

    }catch(error){
      console.error(error);
    }
  });

  document.getElementById("addUnit").addEventListener("submit", async(e) => {
    e.preventDefault();

    try{
      const unitCode = document.getElementById("add-unit-code").value;
      const lecturer = document.getElementById("lecturer").value;
      const startTime = document.getElementById("start-time").value;
      const endTime = document.getElementById("end-time").value;
      const venue = document.getElementById("venue").value;
      const examDate = document.getElementById("exam-date").value;

      const unitDetails ={
        unit_code:unitCode,
        lecturer:lecturer,
        start_time:startTime,
        end_time:endTime,
       venue:venue,
       exam_date:examDate
      }
      const response = await fetch("http://localhost:5000/api/timetables/insert",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(unitDetails)
    });

    const data = await response.json();

    if(response.ok){
      alert(data.message)
    }else{
      alert(data.message)
    }

    e.target.reset();
    }catch(error){
      console.error(error);
    }
  })
  

  async function listStudents() {
    try{
        const response = await fetch("http://localhost:5000/api/students/list-students");
        const tableBody = document.getElementById("studentsTBody");

        const data = await response.json();

        if(response.ok){
            console.log(data.message);
        }

        tableBody.innerHTML = "";

        data.students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.first_name} ${student.second_name} ${student.last_name}</td>
                <td>${student.reg_number}</td>
                <td>${student.email}</td>
                <td>${student.phone_number}</td>
                <td>${student.course}</td>
            `

            tableBody.appendChild(row);
        })
    }catch(error){
        console.error(error);
        
    }
  }
  listStudents();
  async function fetchTotalStudents() {
    try {
      const response = await fetch("http://localhost:5000/api/students/total-students");
      const data = await response.json();
  
      if (response.ok) {
        document.getElementById("totalStudents").textContent = data.totalStudents;
      } else {
        console.error("Error fetching total students:", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchTotalStudents();
  