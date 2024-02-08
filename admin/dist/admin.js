"use strict";
//Select by ID
let form = document.querySelector('#form');
let addform = document.querySelector('#addform');
let editform = document.querySelector('#editform');
let updateForm = document.querySelector('#updateForm');
let addbtn = document.querySelector('#addbtn');
let backbtn = document.querySelector('#backbtn');
let editButton = document.querySelector('#editButton');
let deleteButton = document.querySelector('#deleteButton');
let projectName = document.querySelector('#projectName');
let projectDescription = document.querySelector('#projectDescription');
let endDate = document.querySelector('#endDate');
let registeredUser = document.querySelector('#registeredUser');
let email = document.querySelector('#email');
//registered user index
let currentIndex;
// document.addEventListener('DOMContentLoaded', function() {})
let editBackBtn = document.querySelector('#editBackBtn');
console.log(editBackBtn);
editBackBtn.addEventListener('click', (() => {
    editform.style.display = 'none';
}));
addbtn.addEventListener('click', (() => {
    if (form.style.display === 'none') {
        form.style.display = 'block';
    }
    else {
        form.style.display = 'none';
    }
}));
backbtn.addEventListener('click', (() => {
    form.style.display = 'none';
}));
let Projects = localStorage.getItem("Projects") ? JSON.parse(localStorage.getItem('Projects')) : [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectIdInput = document.querySelector('#projectId');
    const isUpdating = projectIdInput.value !== '';
    const projectId = isUpdating ? parseInt(projectIdInput.value, 10) : Projects.length + 1;
    let ProjectDetails = {
        id: projectId,
        projectName: projectName.value.trim(),
        projectDescription: projectDescription.value.trim(),
        endDate: endDate.value.trim(),
        registeredUser: registeredUser.value.trim(),
        email: email.value.trim()
    };
    if (isUpdating) {
        const projectIndex = Projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            Projects[projectIndex] = ProjectDetails;
        }
    }
    else {
        Projects.push(ProjectDetails);
    }
    localStorage.setItem('Projects', JSON.stringify(Projects));
    Projects = JSON.parse(localStorage.getItem('Projects'));
    instance.displayProjects();
    projectName.value = '';
    projectDescription.value = '';
    endDate.value = '';
    registeredUser.value = '';
    email.value = '';
    addform.reset();
    editform.style.display = 'none';
    form.style.display = 'none';
    projectIdInput.value = '';
});
class ProjectActions {
    displayProjects() {
        const projectList = document.querySelector('#project');
        if (projectList) {
            projectList.innerHTML = '';
            Projects.forEach((project, index) => {
                let projectListItem = document.createElement('li');
                projectListItem.classList.add('lists', 'buttons');
                projectListItem.textContent = project.projectName;
                projectListItem.addEventListener('click', () => {
                    this.displayProjectDetails(project);
                });
                projectList.appendChild(projectListItem);
            });
        }
        else {
            console.log('Project list not found');
        }
    }
    displayProjectDetails(project) {
        const body = document.querySelector('#body');
        const h3 = document.querySelector('#h3');
        const p = document.querySelector('#p');
        const boards = document.querySelector('#boards');
        const creationDate = new Date().toLocaleDateString();
        h3.textContent = project.projectName;
        p.textContent = `Created on: ${creationDate}`;
        boards.innerHTML = '';
        const milestonesDiv = document.createElement('div');
        milestonesDiv.innerHTML = `
            <h4 class="milestones">Milestones</h4>
            <p class="desc">${project.projectDescription}</p>
            <p class ="end">End Date: ${project.endDate}</p>   
            <p class ="register">Registered User: ${project.registeredUser}</p>
                <div class="projectIcons">
                    <button onclick="instance.updateProject(${project.id})" class="edit-button" data-project-id="${project.id}"></button>
                    <button onclick="instance.deleteProject(${project.id})" class="delete-button" data-project-id="${project.id}"></button>
                </div>

            `;
        boards.appendChild(milestonesDiv);
        console.log(boards);
        // Add event listener for edit and delete buttons
        boards.addEventListener('click', (event) => {
            var _a;
            const target = event.target;
            if (target.classList.contains('edit-button')) {
                const projectId = target.getAttribute('data-project-id');
                if (projectId) {
                    editform.style.display = 'block';
                    editform.scrollIntoView({ behavior: 'smooth' });
                    // instance.updateProject(parseInt(projectId, 10));
                    (_a = document.querySelector('#editProjectId')) === null || _a === void 0 ? void 0 : _a.setAttribute('value', projectId);
                    this.updateProject(parseInt(projectId, 10));
                }
            }
            else if (target.classList.contains('delete-button')) {
                const projectId = target.getAttribute('data-project-id');
                if (projectId) {
                    instance.deleteProject(parseInt(projectId, 10));
                }
            }
        });
        body.style.display = 'block';
    }
    deleteProject(projectId) {
        const index = Projects.findIndex(p => p.id === projectId);
        if (index !== -1)
            Projects.splice(index, 1);
        localStorage.setItem('Projects', JSON.stringify(Projects));
        this.displayProjects();
    }
    updateProject(projectId) {
        const project = Projects.find(p => p.id === projectId);
        if (project) {
            document.querySelector('#editProjectName').value = project.projectName;
            document.querySelector('#editProjectDescription').value = project.projectDescription;
            document.querySelector('#editEndDate').value = project.endDate;
            document.querySelector('#editRegisteredUser').value = project.registeredUser;
            document.querySelector('#editEmail').value = project.email;
            document.getElementById('editProjectId').value = projectId.toString();
        }
        editform.style.display = 'block';
    }
}
let instance = new ProjectActions();
instance.displayProjects();
// Add event listener for edit form submission
updateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const projectId = parseInt(document.getElementById('editProjectId').value, 10);
    const projectIndex = Projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        Projects[projectIndex] = {
            id: projectId,
            projectName: document.getElementById('editProjectName').value.trim(),
            projectDescription: document.getElementById('editProjectDescription').value.trim(),
            endDate: document.getElementById('editEndDate').value,
            registeredUser: document.getElementById('editRegisteredUser').value,
            email: document.getElementById('editEmail').value
        };
        localStorage.setItem('Projects', JSON.stringify(Projects));
        instance.displayProjects();
        updateForm.reset();
        editform.style.display = 'none';
    }
});
