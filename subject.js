const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');

document.getElementById("subject-title").innerText = `${subject} Resources`;

function renderResources() {
    const notesContent = document.getElementById("notes-content");
    const questionBanksContent = document.getElementById("Question-Banks-content");
    const unitPapersContent = document.getElementById("unit-papers-content");
    const semesterPapersContent = document.getElementById("semester-papers-content");

    notesContent.innerHTML = ""; 
    questionBanksContent.innerHTML = ""; 
    unitPapersContent.innerHTML = ""; 
    semesterPapersContent.innerHTML = ""; 

    let resources = JSON.parse(localStorage.getItem('resources')) || {};
    const subjectResources = resources[subject];
    var filepath;
    if(subject=="Chemistry"){
        filepath="assets/Chemistry Unit-4.pdf";
    }
    else if(subject=="BXE"){
        filepath="assets/BXE%20Unit-1.pdf";
    }
    else if(subject=="Advance C Programmimg"){
        filepath="C:/CEP Project/assets/Module -3 Pointers in C.pdf";
    } 
    else if(subject=="Mechanics"){
        filepath="c:/Users/Purva/Downloads/Mechanics -1.pdf";
    }
    else if(subject=="BEE"){
        filepath="assets/BXE%20Unit-1.pdf";
    }
    else if(subject=="Physics"){
        filepath="assets/Physics Unit-1.pdf";
    }
    else if(subject=="Mathematics"){
        filepath="assets/Mathematics  Unit-1 Question bank.pdf";
    }

    if (subjectResources) {
        function createResourceItem(resource, type) {
            const resourceItem = document.createElement("div");
            resourceItem.className = "resource-item";

            // Create a download link using Base64 data
            //<a href="${resource.fileData}" download="${resource.title}" class="download-link">Download</a>
            resourceItem.innerHTML = `
                <h3> ${resource.title} </h3>
                <h3>${subject}</h3>
                <a href="${filepath}" download="${resource.title}">Download</a>
                <button class="delete-button" onclick="deleteResource('${subject}', '${type}', '${resource.title}')">Delete</button>
            `;
            return resourceItem;
        }

        if (subjectResources.Notes && subjectResources.Notes.length > 0) {
            subjectResources.Notes.forEach(resource => {
                notesContent.appendChild(createResourceItem(resource, 'Notes'));
            });
        } else {
            notesContent.innerHTML = "<p>No notes available for this subject yet.</p>";
        }

        if (subjectResources['Question Banks'] && subjectResources['Question Banks'].length > 0) {
            subjectResources['Question Banks'].forEach(resource => {
                questionBanksContent.appendChild(createResourceItem(resource, 'Question Banks'));
            });
        } else {
            questionBanksContent.innerHTML = "<p>No Question Banks available for this subject yet.</p>";
        }

        if (subjectResources['Unit Papers'] && subjectResources['Unit Papers'].length > 0) {
            subjectResources['Unit Papers'].forEach(resource => {
                unitPapersContent.appendChild(createResourceItem(resource, 'Unit Papers'));
            });
        } else {
            unitPapersContent.innerHTML = "<p>No unit papers available for this subject yet.</p>";
        }

        if (subjectResources['Semester Papers'] && subjectResources['Semester Papers'].length > 0) {
            subjectResources['Semester Papers'].forEach(resource => {
                semesterPapersContent.appendChild(createResourceItem(resource, 'Semester Papers'));
            });
        } else {
            semesterPapersContent.innerHTML = "<p>No semester papers available for this subject yet.</p>";
        }
    } else {
        notesContent.innerHTML = "<p>No resources available for this subject.</p>";
    }
}

function deleteResource(subject, type, title) {
    const resources = JSON.parse(localStorage.getItem('resources'));

    if (resources[subject] && resources[subject][type]) {
        resources[subject][type] = resources[subject][type].filter(resource => resource.title !== title);

        if (resources[subject][type].length === 0) {
            delete resources[subject][type];
        }

        if (Object.keys(resources[subject]).length === 0) {
            delete resources[subject];
        }
    }

    localStorage.setItem('resources', JSON.stringify(resources));
    renderResources();
}

// Initial rendering of resources
renderResources();