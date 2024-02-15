// // let user_id = localStorage.getItem('user_id') as string
// // const token = localStorage.getItem('token') as string

// // let promise3 = new Promise((resolve, reject)=>{
// //     fetch(`http://localhost:4100/trips/customer/${user_id}`,{
// //         headers:{
// //             'Accept': 'application/json',
// //             'Content-type': 'application/json',
// //             'token': token
// //         }, 
// //         method: "GET"
// //     }).then(res=>{
// //         resolve(res.json())
// //     }).catch(err=>{
// //         reject(err)
// //     })
// // }).then(data=>{
// //     console.log(data);
    
// // })
// interface Project{
//     id: number;
//     projectName: string;
//     projectDescription: string;
//     endDate: string;
//     registeredUser: string;
//     email: string;
// }

// let projects: Project[] =  localStorage.getItem("Projects") ? JSON.parse(localStorage.getItem('Projects') as string) : [] ;


// // Function to display projects on the sidebar
// function displayProjectsList() {
//     const projectListElement = document.getElementById('project') as HTMLUListElement;
//     projectListElement.innerHTML = ''; 
//     console.log(`Project email: ${JSON.stringify(projects)}`);
//     projects.forEach(project => {
//         const listItem = document.createElement('li');
//         listItem.textContent = project.projectName;
//         listItem.classList.add('lists', 'project-item');
//         listItem.addEventListener('click', () => displayProjectDetails(project));
//         projectListElement.appendChild(listItem);
//     });
    
// }

// // Function to display project details when a project is clicked
// function displayProjectDetails(project:Project) {
//     const projectDetailsElement = document.getElementById('boards') as HTMLDivElement;
//     projectDetailsElement.innerHTML = `
//         <h3>${project.projectName}</h3>
//         <p>${project.projectDescription}</p>
//         // <p>End Date: ${project.endDate}</p>
//         <p>Registered User: ${project.registeredUser}</p>
//         <button onclick="markProjectComplete(${project.id})">Complete</button>
//     `;
// }

// // Function to mark a project as complete
// function markProjectComplete(projectId:number) {
//     const projectIndex = Projects.findIndex(p => p.id === projectId);
//     if (projectIndex >= 0) {
        
//         console.log(`Project with ID ${projectId} marked as complete.`);
        
//         Projects.splice(projectIndex, 1); 
//         localStorage.setItem('Projects', JSON.stringify(Projects));
//         displayProjectsList();
//     }
// }

// // Display the project list when the page loads
// document.addEventListener('DOMContentLoaded', displayProjectsList);

// displayProjectsList()
