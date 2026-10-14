let heading = document.getElementById("heading")
let changeButton = document.getElementById("changeButton")

changeButton.addEventListener("click", function() {
    heading.textContent = "Heading Changed!";
});

let visitorName = document.getElementById("visitorName")
let message = document.getElementById("message")

visitorName.addEventListener("input", function(){
    const name = visitorName.value.trim();
    if(name !== ""){
        message.textContent = "Hello, " + name + "!";
    } else {
        message.textContent = "Your greetings will appear here";
    }
});
let themeButton = document.getElementById("themeButton");   
themeButton.addEventListener("click", function() {  
    document.body.classList.toggle("dark-mode");
}); 

const projectForm = document.getElementById("projectForm");
const projectInput = document.getElementById("projectInput");
const projectList = document.getElementById("projectList");
const projectError = document.getElementById("projectError");
const emptyMessage = document.getElementById("emptyMessage");

let projects = [];

function createProjectItem(name) {
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(nameSpan);
    li.appendChild(deleteBtn);
    projectList.appendChild(li);
}

function renderProjects() {
    projectList.innerHTML = "";
    projects.forEach((name) => {
        createProjectItem(name);
    });

    if (projects.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const saved = localStorage.getItem("projects");
    if (saved !== null) {
        projects = JSON.parse(saved);
    }
}

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = projectInput.value.trim();

    if (name === "") {
        projectError.textContent = "project name cannot be empty.";
        return;
    }

    projectError.textContent = "";
    projects.push(name);
    saveProjects();
    renderProjects();

    projectInput.value = "";
    projectInput.focus();
});

projectList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const li = event.target.parentElement;
        const index = Array.from(projectList.children).indexOf(li);
        projects.splice(index, 1);
        saveProjects();
        renderProjects();
    }
});

loadProjects();
renderProjects();