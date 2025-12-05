// Sample projects data - descriptions are loaded from projects.md
const projects = [
    {
        id: 1,
        title: "Advent Calendar",
        markdownKey: "Advent Calendar",
        image: "assets/advent_calendar.png",
        link: "https://crashinteracted.github.io/custom-advent-calendar/"
    },
];

let markdownContent = {};

// Initialize the page on load
document.addEventListener('DOMContentLoaded', function() {
    loadMarkdown();
    renderProjects();
    const savedPage = localStorage.getItem('currentPage') || 'home';
    showPage(savedPage);
});

// Function to load markdown content
function loadMarkdown() {
    fetch('projects.md')
        .then(response => response.text())
        .then(text => {
            parseMarkdown(text);
        })
        .catch(error => console.error('Error loading markdown:', error));
}

// Function to parse markdown into sections
function parseMarkdown(text) {
    const sections = text.split(/^# /m).filter(s => s.trim());
    
    sections.forEach(section => {
        const lines = section.split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();
        markdownContent[title] = content;
    });
}

// Function to render projects grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => showProjectDetail(project.id);
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-card-image">
            <h3>${project.title}</h3>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Function to show specific page
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Save the current page to localStorage
    localStorage.setItem('currentPage', pageName);
    
    // Update active nav button
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Function to show project detail
function showProjectDetail(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        document.getElementById('projectImage').src = project.image;
        document.getElementById('projectTitle').textContent = project.title;
        const descriptionElement = document.getElementById('projectDescription');
        const markdownText = markdownContent[project.markdownKey] || 'No description available';
        descriptionElement.innerHTML = markdownToHtml(markdownText);
        document.getElementById('projectLink').href = project.link;
        
        showPage('project-detail');
    }
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
    let html = markdown
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^\*\* (.*?)\*\*:/gm, '<strong>$1</strong>:')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\- (.*?)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[uh][tl2]|<\/[uh][tl2])/gm, (match) => match ? '<p>' : '')
        .concat('</p>');
    
    return html.replace(/<p><\/p>/g, '').replace(/<p>(<[uh])/g, '$1').replace(/(<\/[uh]>)<\/p>/g, '$1');
}


// Function to add a new project (call this to add projects)
function addProject(title, description, imageUrl, projectLink) {
    const newProject = {
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        title: title,
        description: description,
        image: imageUrl,
        link: projectLink
    };
    
    projects.push(newProject);
    renderProjects();
}
