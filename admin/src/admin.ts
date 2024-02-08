

    //Select by ID
    let form = document.querySelector('#form') as HTMLDivElement;
    let addform = document.querySelector('#addform') as HTMLFormElement;
    let editform = document.querySelector('#editform') as HTMLDivElement;
    let updateForm = document.querySelector('#updateForm') as HTMLFormElement;
    let addbtn = document.querySelector('#addbtn') as HTMLButtonElement;
    let backbtn = document.querySelector('#backbtn') as HTMLButtonElement;
    let editButton = document.querySelector('#editButton') as HTMLButtonElement;
    let deleteButton = document.querySelector('#deleteButton') as HTMLButtonElement;

    let projectName = document.querySelector('#projectName') as HTMLInputElement;
    let projectDescription = document.querySelector('#projectDescription') as HTMLInputElement;
    let endDate = document.querySelector('#endDate') as HTMLInputElement;
    let registeredUser = document.querySelector('#registeredUser') as HTMLInputElement;
    let email = document.querySelector('#email') as HTMLInputElement;



    //registered user index
    let currentIndex: number;

    // document.addEventListener('DOMContentLoaded', function() {})
        let editBackBtn = document.querySelector('#editBackBtn') as HTMLButtonElement;
        console.log(editBackBtn);
        editBackBtn.addEventListener('click', (() => {
            editform.style.display = 'none';
        }));

        addbtn.addEventListener('click', (() => { 

            if (form.style.display === 'none') {
                form.style.display = 'block';
            } else{
                form.style.display = 'none';
            }
        }))

        backbtn.addEventListener('click', (() => { 
            form.style.display = 'none';
        }))
    


        interface Project{
            id: number;
            projectName: string;
            projectDescription: string;
            endDate: string;
            registeredUser: string;
            email: string;
        }



        let Projects: Project[] =  localStorage.getItem("Projects") ? JSON.parse(localStorage.getItem('Projects') as string) : [] ;

           
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            
            
            const projectIdInput = document.querySelector('#projectId') as HTMLInputElement;
            const isUpdating = projectIdInput.value !== '';
            const projectId = isUpdating ? parseInt(projectIdInput.value, 10) : Projects.length + 1;



        

                let ProjectDetails ={
                    id: projectId,
                    projectName: projectName.value.trim(),
                    projectDescription: projectDescription.value.trim(),
                    endDate: endDate.value.trim(),
                    registeredUser: registeredUser.value.trim(),
                    email: email.value.trim()

                    
                }

                if (isUpdating){
                    const projectIndex = Projects.findIndex(p => p.id === projectId);
                    if (projectIndex !== -1) {
                        Projects[projectIndex] = ProjectDetails;
                    }

                } else {
                    Projects.push(ProjectDetails);
                }

                localStorage.setItem('Projects', JSON.stringify(Projects));
                Projects = JSON.parse(localStorage.getItem('Projects') as string);  
                instance.displayProjects()

                projectName.value = '';
                projectDescription.value = '';
                endDate.value = '';
                registeredUser.value = '';
                email.value = '';

                addform.reset();


                editform.style.display = 'none'; 
                form.style.display = 'none'; 
                projectIdInput.value = ''; 


            
        })
        

    class ProjectActions{

        displayProjects(){

            const projectList = document.querySelector('#project');

                if (projectList){

                    projectList.innerHTML = '';

                    Projects.forEach((project: Project, index:number) => {

                    let projectListItem = document.createElement('li');
                    projectListItem.classList.add('lists', 'buttons');

                    projectListItem.textContent = project.projectName;

                    projectListItem.addEventListener('click', () => {
                        this.displayProjectDetails(project);
                    });


                    projectList.appendChild(projectListItem);

                    })
                } else {
                    console.log('Project list not found');
                }

            

        }

        displayProjectDetails(project: Project){

            const body= document.querySelector('#body')as HTMLDivElement;
            const h3 = document.querySelector('#h3')as HTMLHeadingElement;
            const p = document.querySelector('#p')as HTMLParagraphElement;
            const boards = document.querySelector('#boards')as HTMLDivElement;

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
            const target = event.target as HTMLElement;

            if (target.classList.contains('edit-button')) {
                const projectId = target.getAttribute('data-project-id');
                if (projectId) {
                    editform.style.display = 'block';

                    editform.scrollIntoView({ behavior: 'smooth' });
                    // instance.updateProject(parseInt(projectId, 10));

                    document.querySelector('#editProjectId')?.setAttribute('value', projectId);

                    this.updateProject(parseInt(projectId, 10));
                }

            } else if (target.classList.contains('delete-button')) {
                const projectId = target.getAttribute('data-project-id');
                if (projectId) {
                    instance.deleteProject(parseInt(projectId, 10));
                }
            }
        });
                

            body.style.display = 'block';

        }

        deleteProject(projectId: number) {
            const index = Projects.findIndex(p => p.id === projectId);
            if (index !== -1)
            Projects.splice(index, 1);
            localStorage.setItem('Projects', JSON.stringify(Projects));
            this.displayProjects();
            
        
        }

        updateProject(projectId:number){
            const project = Projects.find(p => p.id === projectId)
            if (project) {
                

                (document.querySelector('#editProjectName') as HTMLInputElement).value = project.projectName;
                (document.querySelector('#editProjectDescription') as HTMLInputElement).value = project.projectDescription;
                (document.querySelector('#editEndDate') as HTMLInputElement).value = project.endDate;
                (document.querySelector('#editRegisteredUser') as HTMLInputElement).value = project.registeredUser;
                (document.querySelector('#editEmail') as HTMLInputElement).value = project.email;
                (document.getElementById('editProjectId') as HTMLInputElement).value = projectId.toString();

            }
                
                

            
            editform.style.display = 'block';

        }

        
        
        


    }



    let instance = new ProjectActions()

    instance.displayProjects()

    // Add event listener for edit form submission
    updateForm.addEventListener('submit', function(e: Event): void {
        e.preventDefault();

        const projectId = parseInt((document.getElementById('editProjectId') as HTMLInputElement).value, 10);
        const projectIndex = Projects.findIndex(p => p.id === projectId);

        if (projectIndex !== -1) {
            Projects[projectIndex] = {
                id: projectId,
                projectName: (document.getElementById('editProjectName') as HTMLInputElement).value.trim(),
                projectDescription: (document.getElementById('editProjectDescription') as HTMLInputElement).value.trim(),
                endDate: (document.getElementById('editEndDate') as HTMLInputElement).value,
                registeredUser: (document.getElementById('editRegisteredUser') as HTMLSelectElement).value,
                email: (document.getElementById('editEmail') as HTMLInputElement).value
            };

            localStorage.setItem('Projects', JSON.stringify(Projects));
            instance.displayProjects();
            updateForm.reset();
            editform.style.display = 'none';
            
        }
    });

