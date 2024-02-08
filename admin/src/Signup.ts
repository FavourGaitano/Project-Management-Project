document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    // Ensure signupForm is not null before proceeding
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
           
            const form = e.target as HTMLFormElement;
    
            // Get the data from the form
            const email = form.email.value;
            const password = form.password.value; 
    
            // Try-catch block for safely parsing the 'users' data
            let users;
            try {
                users = JSON.parse(localStorage.getItem('users') ?? '[]');
            } catch {
                users = [];
            }
    
            // Add the new user data to the array and save it back to local storage
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
    
            // Redirect to login page
            window.location.href = '../../FrontEnd/Login/Login.html'; 
        });
    }
});
