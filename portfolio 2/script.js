let heading = document.getElementsById("heading")
let changeButton = document.getElementById("changeButton")

changeButton.addEventListener("click", function() {
    heading.textContent = "Heading Changed!";
});

let visitorName = document.getElementById("visitorName")
let message = document.getElementById("message")

visitorName.addEventListener("input",function(){
    if(visitorName.value.trim () !== ""){
        message.textContent = "Your greetings will appear here, " 
    } else
        message.textContent = "Hello," +visitorName.value + "!";

});

const projectForm = document.getElementById("projectForm");
const projectInput = document.getElementById("projectInput");
const projectList = document.getElementById("projectList");
const projectError = document.getElementById("projectList");
const projectMessage = document.getElementById("projectMessage");

let projects =[];

function createProjectItem(name){
    const li = document.createElement("li");
    const namespan = document.createElement("span");
    namespan.textContent = name;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    li.appendChild(namespan)
    li.appendChild(deleteBtn);
    projectList.appendChild(li);
}
function renderProjects(){
    projectList.innerHTML = "";
    project.forEach((name) => {
        createProjectItem
    }
)
    if(projects.length ===0){
        emptyMessage.style.display = "block"
    } else {
        emptyMessage.style.display = "none"
    }
}
function saveProjects(){
    localStorage.setItem("projects", JSON.stringify(projects));
}
function loadProject(){
    const saved = localStorage.getItem("projects");
    if(saved !== null){
        projects = JSON.parse(saved)
    }
}

projectForm.addEventListener("submit"), (event)=>{
    event.preventDefault();

    const name = projectInput.value.trim();

    if(name === ""){
        projectError.textContent = "project name cannot be empty.";
        return;
    }
}

projectForm.addEventListener("submit"), (event) => {
    projectError.textContent = "";
    projects.push(name);
    saveProjects();
    renderProjects();

    projectInput.value = "";
    projectInput.focus();
}

projectList.addEventListener("click"), (event) => {
    if(event.target.classList.contains("delete-btn")){ 
    const li = event.target.parentElement;  
    const index = Array.from(projectList.children).indexOf(li);
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
    }
}

loadProjects();
renderProjects();