
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

const feesForm = document.getElementById("fees-insert-form");
const feesRegNumberInput = document.getElementById("fees-reg-number");
const feesDateInput = document.getElementById("credited-date");
const feesDescription = document.getElementById("description");
const debitsAmount = document.getElementById("debits-amount");
const creditedAmount =  document.getElementById("credited-amount");
const balanceAmount =  document.getElementById("balance-amount");

feesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentFeesData = {
        reg_number: feesRegNumberInput.value,
        date: feesDateInput.value,
        description: feesDescription.value,
        debits: debitsAmount.value,
        credits: creditedAmount.value,
        balance: balanceAmount.value,
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
})
async function fetchTimeTable(){

    try{
        const response = await fetch('http://localhost:5000/api/timetable');

        if(!response.ok){
            throw new Error("failed to fetch timetables")
        }

        const data = await response.json();
        const tableBody = document.getElementById("timetableTAbleBody");

        data.forEach(item => {
            const row = document.createElement("tr"); 
            row.innerHTML = `
                <td>${item.unit_code}</td>
                <td>${item.unit_name}</td>
                <td>${item.start_time}</td>
                <td>${item.end_time}</td>
                <td>${item.venue}</td>
                <td>${item.lecturer}</td>
            `;
            tableBody.appendChild(row); 
        });
        


    } catch(error){
        console.error(error)
    }



}
fetchTimeTable()

const addUnit = document.getElementById("addUnit");
const unitCode = document.getElementById("unitCode");
const unitName = document.getElementById("unitName");
const startingTime = document.getElementById("from");
const endTime = document.getElementById("to");
const venue = document.getElementById("venue");
const lecturer = document.getElementById("lecturer");
const examDate = document.getElementById("examDate")

addUnit.addEventListener("submit", async (e) => {

    e.preventDefault();
    const unitDetails = {
        unit_code: unitCode.value,
        unit_name: unitName.value,
        lecturer: lecturer.value,
        start_time: startingTime.value,
        end_time: endTime.value,
        venue: venue.value,
        exam_date: examDate.value,
    }
    
    try{
        const response = await fetch('http://localhost:5000/api/insert-unit', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(unitDetails)
        });

        const data = await response.json()

        if(response.ok){
            alert("unit inserted sucseesfully")
        }else{
            alert("Error:" + data.message)
        }
    }catch(error){
        console.error(error);
        alert("Error: " + error.message);
    }
    
})

const removeUnit = document.getElementById("removeUnit");
const removeUnitode = document.getElementById("removeUnitCode");

removeUnit.addEventListener("submit", async(e) => {
    e.preventDefault();

    const removeUnitDetails = {
        unit_code: removeUnitode.value
    };

    try{
        const response = await fetch('http://localhost:5000/api/remove-unit', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(removeUnitDetails)
        })
    
        const data = await response.json()
    
        if(response.ok){
            alert("unit removed succesfully");
        }else{
            alert("Error:" + data.message)
        }
    } catch(error){
        console.error(error);
        alert("Errtor:" + error.message)
    }
   
})


