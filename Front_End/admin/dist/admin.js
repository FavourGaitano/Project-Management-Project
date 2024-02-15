"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const addform = document.querySelector('#addform');
    const editform = document.querySelector('#editform');
    const addbtn = document.querySelector('#addbtn');
    const backbtn = document.querySelector('#backbtn');
    const editBackBtn = document.querySelector('#editBackBtn');
    // Toggle add project form
    addbtn.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
    backbtn.addEventListener('click', () => {
        form.style.display = 'none';
    });
    editBackBtn.addEventListener('click', () => {
        editform.style.display = 'none';
    });
    addform.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        console.log('Project Name:', document.querySelector('#projectName').value);
        console.log('Project Description:', document.querySelector('#projectDescription').value);
        console.log('End Date:', document.querySelector('#endDate').value);
        const newProject = {
            projectname: document.querySelector('#projectName').value,
            description: document.querySelector('#projectDescription').value,
            createdate: currentDate,
            enddate: document.querySelector('#endDate').value,
        };
        console.log(newProject);
        yield instance.addProject(newProject);
        addform.reset();
        document.querySelector('#form').style.display = 'none';
    }));
});
// Utility function for API requests
const fetchApi = (url, method, body = null) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if (token) {
        headers.append('token', token);
    }
    const requestOptions = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    };
    try {
        const response = yield fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return yield response.json();
    }
    catch (error) {
        console.error('Error:', error);
    }
});
// ProjectActions class
class ProjectActions {
    constructor() {
        this.baseUrl = 'http://localhost:3001/projects';
        this.Projects = [];
    }
    fetchProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchApi(this.baseUrl, 'GET');
            console.log(response);
            if (response && response.projects && Array.isArray(response.projects.recordsets[0])) {
                return response.projects.recordsets[0];
            }
            else {
                console.error('Invalid response structure:', response);
                return [];
            }
        });
    }
    displayProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = (yield this.fetchProjects()).filter(project => !project.isDeleted);
            const projectList = document.querySelector('#project');
            if (projectList) {
                projectList.innerHTML = '';
                projects.forEach((project) => {
                    if (!project.isDeleted) {
                        let projectListItem = document.createElement('li');
                        projectListItem.classList.add('lists', 'buttons');
                        projectListItem.textContent = project.projectname;
                        projectListItem.addEventListener('click', () => {
                            this.displayProjectDetails(project);
                        });
                        projectList.appendChild(projectListItem);
                    }
                });
            }
            else {
                console.error('Project list not found');
            }
        });
    }
    addProject(newProjectData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetchApi(this.baseUrl, 'POST', newProjectData);
                if (response && response.message === 'Project created successfully') {
                    if (response.project) {
                        this.appendProjectToList(response.project);
                    }
                    this.displayProjects();
                }
                else {
                    console.error('Project creation failed:', response);
                }
            }
            catch (error) {
                console.error('Error creating project:', error);
            }
        });
    }
    deleteProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetchApi(`http://localhost:3001/projects/${projectId}`, 'DELETE');
                if (response && response.success) {
                    yield this.displayProjects();
                    window.location.reload();
                }
                else {
                    console.error('Failed to delete project:', response);
                }
            }
            catch (error) {
                console.error('Error deleting project:', error);
            }
        });
    }
    updateProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.fetchProjects();
            const project = projects.find(p => p.project_id === projectId);
            if (project) {
                // Populate the edit form fields
                document.querySelector('#editProjectName').value = project.projectname;
                document.querySelector('#editProjectDescription').value = project.projectDescription;
                document.querySelector('#editEndDate').value = project.endDate;
                document.querySelector('#editRegisteredUser').value = project.registeredUser;
                document.querySelector('#editEmail').value = project.email;
                document.getElementById('editProjectId').value = projectId.toString();
                const editform = document.querySelector('#editform');
                editform.style.display = 'block';
            }
            console.log(project);
        });
    }
    sendUpdateToBackend(projectId, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetchApi(`http://localhost:3001/projects/${projectId}`, 'PUT', projectData);
                if (response && response.project) {
                    this.displayProjects();
                }
                else {
                    console.error('Project update failed:', response);
                }
            }
            catch (error) {
                console.error('Error updating project:', error);
            }
        });
    }
    removeProjectFromList(projectId) {
        const projectList = document.querySelector('#project');
        const projectToDelete = projectList.querySelector(`[data-project-id="${projectId}"]`);
        if (projectToDelete) {
            projectList.removeChild(projectToDelete);
        }
    }
    appendProjectToList(projectData) {
        const projectList = document.querySelector('#project');
        const projectListItem = document.createElement('li');
        projectListItem.classList.add('lists', 'buttons');
        projectListItem.textContent = projectData.projectname;
        projectList.appendChild(projectListItem);
    }
    displayProjectDetails(project) {
        const body = document.querySelector('#body');
        const h3 = document.querySelector('#h3');
        const p = document.querySelector('#p');
        const boards = document.querySelector('#boards');
        h3.textContent = project.projectname;
        p.textContent = `Created on: ${new Date(project.createdate).toLocaleDateString()}`;
        boards.innerHTML = '';
        const milestonesDiv = document.createElement('div');
        milestonesDiv.innerHTML = `
            <h4 class="milestones">Milestones</h4>
            <p class="desc">${project.description}</p>
            <p class="end">End Date: ${new Date(project.enddate).toLocaleDateString()}</p>   
            <p class="register">Registered User: ${project.user_id}</p>
            <div class="projectIcons">
                <button onclick="instance.updateProject('${project.project_id}')" class="edit-button" data-project-id="${project.project_id}">Edit</button>
                <button onclick="instance.deleteProject('${project.project_id}')" class="delete-button" data-project-id="${project.project_id}">Delete</button>
            </div>
        `;
        boards.appendChild(milestonesDiv);
        body.style.display = 'block';
    }
}
const instance = new ProjectActions();
instance.displayProjects();
const projectList = document.querySelector('#project');
projectList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete-button')) {
        const projectId = target.getAttribute('data-project-id');
        if (projectId) {
            instance.deleteProject(projectId);
        }
    }
});
const updateForm = document.querySelector('#updateForm');
updateForm.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const projectId = document.getElementById('editProjectId').value;
        const updatedProjectData = {
            projectname: document.getElementById('editProjectName').value.trim(),
            projectDescription: document.getElementById('editProjectDescription').value.trim(),
            endDate: document.getElementById('editEndDate').value,
            registeredUser: document.getElementById('editRegisteredUser').value,
            email: document.getElementById('editEmail').value,
            project_id: projectId
        };
        yield instance.sendUpdateToBackend(projectId, updatedProjectData);
        updateForm.reset();
        const editform = document.querySelector('#editform');
        editform.style.display = 'none';
    });
});
