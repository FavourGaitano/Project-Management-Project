document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form') as HTMLFormElement;
    const addform = document.querySelector('#addform') as HTMLFormElement;
    const editform = document.querySelector('#editform') as HTMLFormElement;
    const addbtn = document.querySelector('#addbtn') as HTMLButtonElement;
    const backbtn = document.querySelector('#backbtn') as HTMLButtonElement;
    const editBackBtn = document.querySelector('#editBackBtn') as HTMLButtonElement;
    

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

     addform.addEventListener('submit', async (event) => {
        event.preventDefault();

        const currentDate = new Date().toISOString().split('T')[0];

        console.log('Project Name:', (document.querySelector('#projectName') as HTMLInputElement).value);
        console.log('Project Description:', (document.querySelector('#projectDescription') as HTMLInputElement).value);
        console.log('End Date:', (document.querySelector('#endDate') as HTMLInputElement).value);


        const newProject = {
          
            projectname: (document.querySelector('#projectName') as HTMLInputElement).value,
            description: (document.querySelector('#projectDescription') as HTMLInputElement).value,
            createdate: currentDate,
            enddate: (document.querySelector('#endDate') as HTMLInputElement).value,

            
        };
        console.log(newProject);

       
        await instance.addProject(newProject);


       
        addform.reset();
        (document.querySelector('#form') as HTMLDivElement).style.display = 'none';
    });

   
});


// Utility function for API requests
const fetchApi = async (url: string, method: string, body: any = null) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if (token) {
        headers.append('token', token);
    }

    const requestOptions: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Project Interface
interface Project {
    project_id: string;
    projectname: string;
    projectDescription: string;
    endDate: string;
    registeredUser: string;
    email: string;
    isDeleted?: number; 
}

// ProjectActions class
class ProjectActions {

    

    private baseUrl: string = 'http://localhost:3001/projects';

    async fetchProjects() {
        const response = await fetchApi(this.baseUrl, 'GET');
        console.log(response);
        if (response && response.projects && Array.isArray(response.projects.recordsets[0])) {
            return response.projects.recordsets[0] as Project[];
        } else {
            console.error('Invalid response structure:', response);
            return [];
        }
    }

    async displayProjects() {

        
        
        const projects = (await this.fetchProjects()).filter(project => !project.isDeleted);
        const projectList = document.querySelector('#project') as HTMLElement;

        if (projectList) {
            projectList.innerHTML = '';
            projects.forEach((project: any) => { 
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
        } else {
            console.error('Project list not found');
        }
    }

    async addProject(newProjectData: { [key: string]: string }) {
        try {
            const response = await fetchApi(this.baseUrl, 'POST', newProjectData);

            
            if (response && response.message === 'Project created successfully') {
              
                if (response.project) {
                    this.appendProjectToList(response.project);
                }
                this.displayProjects(); 
            } else {
                console.error('Project creation failed:', response);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

    async deleteProject(projectId: string): Promise<void>{
        try {
            
            const response = await fetchApi(`http://localhost:3001/projects/${projectId}`, 'DELETE');
    
            if (response && response.success) {
               
                await this.displayProjects();
                window.location.reload();

            } else {
                console.error('Failed to delete project:', response);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    private Projects: Project[] = [];

    async updateProject(projectId: string): Promise<void>{

        

        const projects = await this.fetchProjects();
        const project = projects.find(p => p.project_id === projectId);
        if (project) {
            // Populate the edit form fields
            (document.querySelector('#editProjectName') as HTMLInputElement).value = project.projectname;
            (document.querySelector('#editProjectDescription') as HTMLInputElement).value = project.projectDescription;
            (document.querySelector('#editEndDate') as HTMLInputElement).value = project.endDate;
            (document.querySelector('#editRegisteredUser') as HTMLInputElement).value = project.registeredUser;
            (document.querySelector('#editEmail') as HTMLInputElement).value = project.email;
            (document.getElementById('editProjectId') as HTMLInputElement).value = projectId.toString();
            
            

            const editform = document.querySelector('#editform') as HTMLFormElement;
            editform.style.display = 'block';
        }

        console.log(project);
    }


    async sendUpdateToBackend(projectId: string, projectData: Project): Promise<void> {
        try {
            const response = await fetchApi(`http://localhost:3001/projects/${projectId}`, 'PUT', projectData);
            if (response && response.project) {
                
                this.displayProjects();
            } else {
                console.error('Project update failed:', response);
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }

    


    
    
    removeProjectFromList(projectId: string) {
        const projectList = document.querySelector('#project') as HTMLElement;
        const projectToDelete = projectList.querySelector(`[data-project-id="${projectId}"]`) as HTMLElement;
        if (projectToDelete) {
            projectList.removeChild(projectToDelete);
        }
    }

    


    appendProjectToList(projectData: { [key: string]: string }) {
        const projectList = document.querySelector('#project') as HTMLElement;
        const projectListItem = document.createElement('li');
        projectListItem.classList.add('lists', 'buttons');
        projectListItem.textContent = projectData.projectname; 

        
        projectList.appendChild(projectListItem);
    }
    


    displayProjectDetails(project: any) { 
        const body = document.querySelector('#body') as HTMLDivElement;
        const h3 = document.querySelector('#h3') as HTMLHeadingElement;
        const p = document.querySelector('#p') as HTMLParagraphElement;
        const boards = document.querySelector('#boards') as HTMLDivElement;

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

const projectList = document.querySelector('#project') as HTMLElement;
    projectList.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('delete-button')) {
            const projectId = target.getAttribute('data-project-id');
            if (projectId) {
                instance.deleteProject(projectId);
            }
        }
    });


    const updateForm = document.querySelector('#updateForm') as HTMLFormElement;


    updateForm.addEventListener('submit', async function(e: Event):Promise<void>  {
        e.preventDefault();
    
        const projectId = (document.getElementById('editProjectId') as HTMLInputElement).value;
        const updatedProjectData: Project = {
            projectname: (document.getElementById('editProjectName') as HTMLInputElement).value.trim(),
            projectDescription: (document.getElementById('editProjectDescription') as HTMLInputElement).value.trim(),
            endDate: (document.getElementById('editEndDate') as HTMLInputElement).value,
            registeredUser: (document.getElementById('editRegisteredUser') as HTMLSelectElement).value,
            email: (document.getElementById('editEmail') as HTMLInputElement).value,
            project_id: projectId

        };
    
        
        await instance.sendUpdateToBackend(projectId, updatedProjectData);
    
       
        updateForm.reset();

        const editform = document.querySelector('#editform') as HTMLFormElement;
        editform.style.display = 'none';
    });

