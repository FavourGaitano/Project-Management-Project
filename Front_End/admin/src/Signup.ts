const signupForm = document.getElementById("signupForm") as HTMLFormElement

const user_name = document.getElementById("name") as HTMLInputElement
const user_email = document.getElementById("email") as HTMLInputElement
const user_specialization_area = document.getElementById("specialization_area") as HTMLInputElement
const user_Password = document.getElementById("password") as HTMLInputElement

let successmsg = document.querySelector('.success-msg') as HTMLParagraphElement
successmsg.style.display='none'

signupForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    let name = user_name.value.trim()
    let email = user_email.value.trim()
    let specialization_area = user_specialization_area.value.trim()
    let Password = user_Password.value.trim()

    let user = name !== '' && email !== '' && specialization_area !== '' && Password !== ''

    if(user){        
        let promise = new Promise <{error:string, message:string}>((resolve, reject)=>{
            fetch('http://localhost:3001/users', {
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "role": "user",
                    "specialization_area": specialization_area,
                    "password": Password
                })
            }).then((res=>res.json())).then(res=>{
                console.log(res);
                successmsg.textContent = res.message
                successmsg.style.display = 'flex'
                
                setTimeout(() => {
                    successmsg.style.display = 'none'
                    navigateToLogin()
                }, 3000);

                

                resolve(res)
            }).catch(error=>{
                console.log(error);
                
            })
        })

        function navigateToLogin(){
            window.location.href = '../Login/Login.html'
        }
    }

})