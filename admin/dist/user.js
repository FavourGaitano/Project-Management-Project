"use strict";
let projects = localStorage.getItem("Projects") ? JSON.parse(localStorage.getItem('Projects')) : [];
// Function to display projects on the sidebar
function displayProjectsList() {
    const projectListElement = document.getElementById('project');
    projectListElement.innerHTML = '';
    console.log(`Project email: ${JSON.stringify(projects)}`);
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.projectName;
        listItem.classList.add('lists', 'project-item');
        listItem.addEventListener('click', () => displayProjectDetails(project));
        projectListElement.appendChild(listItem);
    });
}
// Function to display project details when a project is clicked
function displayProjectDetails(project) {
    const projectDetailsElement = document.getElementById('boards');
    projectDetailsElement.innerHTML = `
        <h3>${project.projectName}</h3>
        <p>${project.projectDescription}</p>
        // <p>End Date: ${project.endDate}</p>
        <p>Registered User: ${project.registeredUser}</p>
        <button onclick="markProjectComplete(${project.id})">Complete</button>
    `;
}
// Function to mark a project as complete
function markProjectComplete(projectId) {
    const projectIndex = Projects.findIndex(p => p.id === projectId);
    if (projectIndex >= 0) {
        console.log(`Project with ID ${projectId} marked as complete.`);
        Projects.splice(projectIndex, 1);
        localStorage.setItem('Projects', JSON.stringify(Projects));
        displayProjectsList();
    }
}
// Display the project list when the page loads
document.addEventListener('DOMContentLoaded', displayProjectsList);
displayProjectsList();
