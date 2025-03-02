document.getElementById('loginButton').addEventListener('click', function() {
    // Dummy credentials for demonstration purposes
    const demoUsername = 'user';
    const demoPassword = 'password123';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the entered credentials match the dummy credentials
    if (username === demoUsername && password === demoPassword) {
        // Store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        
        // Redirect to homepage
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
});
