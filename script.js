document.getElementById('uploadButton').addEventListener('click', function() {
    // Get the form data
    const resourceName = document.getElementById('resourceName').value;
    const resourceFile = document.getElementById('resourceFile').files[0];
    const subject = document.getElementById('subject').value;
    const resourceType = document.getElementById('resourceType').value;

    // Check if a file is selected
    if (!resourceFile) {
        alert('Please choose a file to upload.');
        return;
    }

    // Create a URL for the file to download
    const fileURL = URL.createObjectURL(resourceFile);

    // Create the resource object
    const resource = {
        title: resourceName,
        link: fileURL
    };

    // Get existing resources from localStorage or initialize an empty object
    const resources = JSON.parse(localStorage.getItem('resources')) || {};
    
    // Initialize the subject in resources if it doesn't exist
    if (!resources[subject]) {
        resources[subject] = {};
    }

    // Initialize the resource type array if it doesn't exist
    if (!resources[subject][resourceType]) {
        resources[subject][resourceType] = [];
    }

    // Add the new resource to the correct type
    resources[subject][resourceType].push(resource);

    // Save the updated resources back to localStorage
    localStorage.setItem('resources', JSON.stringify(resources));

    // Redirect to the subject page after a delay
    setTimeout(() => {
        alert('File uploaded successfully!'); // Simulate upload success
        window.location.href = 'subject.html?subject=' + encodeURIComponent(subject); // Redirect to subject.html
    }, 1000); // Simulate a 1-second upload time
});