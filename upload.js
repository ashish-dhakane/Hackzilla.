document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const resourceType = document.getElementById('resource-type').value;
    const fileUpload = document.getElementById('file-upload').files[0];

    if (!subject || !resourceType || !fileUpload) {
        alert('Please fill in all fields');
        return;
    }

    // Create a resource object
    const resource = {
        title: fileUpload.name,
        link: URL.createObjectURL(fileUpload), // This should correctly create a downloadable link
        type: resourceType
    };

    // Store the resource in local storage
    let resources = JSON.parse(localStorage.getItem('resources')) || {};
    if (!resources[subject]) {
        resources[subject] = {
            Notes: [],
            'Question Banks': [],
            'Unit Papers': [],
            'Semester Papers': []
        };
    }
    resources[subject][resourceType].push(resource);
    localStorage.setItem('resources', JSON.stringify(resources));

    document.getElementById('upload-message').innerText = 'Resource uploaded successfully!';
    document.getElementById('upload-form').reset();
});