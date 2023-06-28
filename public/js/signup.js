const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#name').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  console.log('email', email, 'password', password, 'name', name , 'username', username);
    if (name && username && email && password  ) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ name,username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

const loginForm = document.querySelector('#submitbtn');
loginForm.addEventListener('click', loginFormHandler);