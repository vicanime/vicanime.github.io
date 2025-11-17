// Mock data for demonstration
const users = [
    { username: 'student1', password: 'pass', role: 'student' },
    { username: 'instructor1', password: 'pass', role: 'instructor' },
    { username: 'admin1', password: 'pass', role: 'admin' },
    { username: 'coordinator1', password: 'pass', role: 'coordinator' }
];

const courses = [
    { id: 1, name: 'Introduction to Programming', instructor: 'Dr. Smith' },
    { id: 2, name: 'Data Structures', instructor: 'Prof. Johnson' },
    { id: 3, name: 'Web Development', instructor: 'Ms. Davis' }
];

const modules = [
    { id: 1, courseId: 1, title: 'Variables and Data Types', content: 'Content for Variables and Data Types' },
    { id: 2, courseId: 1, title: 'Control Structures', content: 'Content for Control Structures' },
    { id: 3, courseId: 2, title: 'Arrays and Lists', content: 'Content for Arrays and Lists' }
];

const submissions = [
    { id: 1, studentId: 1, moduleId: 1, grade: 'A', feedback: 'Excellent work!' },
    { id: 2, studentId: 1, moduleId: 2, grade: 'B+', feedback: 'Good job, but can improve.' }
];

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        loadDashboard(user.role);
    } else {
        alert('Invalid credentials');
    }
});

// Load dashboard based on role
function loadDashboard(role) {
    let dashboardHTML = '';

    switch (role) {
        case 'student':
            dashboardHTML = generateStudentDashboard();
            break;
        case 'instructor':
            dashboardHTML = generateInstructorDashboard();
            break;
        case 'admin':
            dashboardHTML = generateAdminDashboard();
            break;
        case 'coordinator':
            dashboardHTML = generateCoordinatorDashboard();
            break;
    }

    document.body.innerHTML = dashboardHTML;
    initializeDashboard();
}

// Generate Student Dashboard
function generateStudentDashboard() {
    return `
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Student Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('courses')">My Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('modules')">Modules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('submissions')">My Submissions</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('grades')">Grades</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome, Student!</h2>
                <p>Select an option from the sidebar to get started.</p>
            </div>
        </div>
    `;
}

// Generate Instructor Dashboard
function generateInstructorDashboard() {
    return `
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Instructor Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('courses')">My Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('modules')">Manage Modules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('submissions')">Evaluate Submissions</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('announcements')">Announcements</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome, Instructor!</h2>
                <p>Select an option from the sidebar to get started.</p>
            </div>
        </div>
    `;
}

// Generate Admin Dashboard
function generateAdminDashboard() {
    return `
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Admin Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('users')">Manage Users</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('courses')">Manage Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('reports')">Generate Reports</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome, Administrator!</h2>
                <p>Select an option from the sidebar to get started.</p>
            </div>
        </div>
    `;
}

// Generate Coordinator Dashboard
function generateCoordinatorDashboard() {
    return `
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Coordinator Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('progress')">Review Progress</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('approvals')">Approve Requirements</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('reports')">View Reports</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome, Program Coordinator!</h2>
                <p>Select an option from the sidebar to get started.</p>
            </div>
        </div>
    `;
}

// Show different sections
function showSection(section) {
    const content = document.getElementById('mainContent');
    let html = '';

    switch (section) {
        case 'courses':
            html = `
                <h2>My Courses</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Instructor</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${courses.map(course => `
                                <tr>
                                    <td>${course.id}</td>
                                    <td>${course.name}</td>
                                    <td>${course.instructor}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'modules':
            html = `
                <h2>Modules</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Module ID</th>
                                <th>Title</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${modules.map(module => {
                                const course = courses.find(c => c.id === module.courseId);
                                return `
                                    <tr>
                                        <td>${module.id}</td>
                                        <td>${module.title}</td>
                                        <td>${course ? course.name : 'N/A'}</td>
                                        <td><button class="btn btn-primary btn-sm" onclick="viewModule(${module.id})">View</button></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'submissions':
            html = `
                <h2>My Submissions</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Submission ID</th>
                                <th>Module</th>
                                <th>Grade</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${submissions.map(submission => {
                                const module = modules.find(m => m.id === submission.moduleId);
                                return `
                                    <tr>
                                        <td>${submission.id}</td>
                                        <td>${module ? module.title : 'N/A'}</td>
                                        <td>${submission.grade}</td>
                                        <td>${submission.feedback}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'grades':
            html = `
                <h2>My Grades</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Module</th>
                                <th>Grade</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${submissions.map(submission => {
                                const module = modules.find(m => m.id === submission.moduleId);
                                const course = courses.find(c => c.id === module.courseId);
                                return `
                                    <tr>
                                        <td>${course ? course.name : 'N/A'}</td>
                                        <td>${module ? module.title : 'N/A'}</td>
                                        <td>${submission.grade}</td>
                                        <td>${submission.feedback}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'users':
            html = `
                <h2>Manage Users</h2>
                <button class="btn btn-primary mb-3" onclick="addUser()">Add User</button>
                <div class="mb-3">
                    <label for="filterUsers" class="form-label">Filter Users by Role:</label>
                    <select class="form-select" id="filterUsers" onchange="filterUsers()">
                        <option value="all">All</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="coordinator">Coordinator</option>
                    </select>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            ${users.map(user => `
                                <tr>
                                    <td>${user.username}</td>
                                    <td>${user.role}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm" onclick="editUser('${user.username}')">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.username}')">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'reports':
            html = `
                <h2>Generate Reports</h2>
                <button class="btn btn-primary mb-3" onclick="generateReport('user')">User Report</button>
                <button class="btn btn-primary mb-3" onclick="generateReport('course')">Course Report</button>
                <button class="btn btn-primary mb-3" onclick="generateReport('submission')">Submission Report</button>
                <div id="reportContent"></div>
            `;
            break;
        case 'progress':
            html = `
                <h2>Review Student Progress</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Progress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Student 1</td>
                                <td>Introduction to Programming</td>
                                <td>75%</td>
                                <td><button class="btn btn-info btn-sm" onclick="viewProgress(1)">View Details</button></td>
                            </tr>
                            <tr>
                                <td>Student 2</td>
                                <td>Data Structures</td>
                                <td>60%</td>
                                <td><button class="btn btn-info btn-sm" onclick="viewProgress(2)">View Details</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'approvals':
            html = `
                <h2>Approve Requirements</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Requirement</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Student 1</td>
                                <td>Final Project</td>
                                <td>Pending</td>
                                <td>
                                    <button class="btn btn-success btn-sm" onclick="approveRequirement(1)">Approve</button>
                                    <button class="btn btn-danger btn-sm" onclick="rejectRequirement(1)">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Student 2</td>
                                <td>Portfolio</td>
                                <td>Pending</td>
                                <td>
                                    <button class="btn btn-success btn-sm" onclick="approveRequirement(2)">Approve</button>
                                    <button class="btn btn-danger btn-sm" onclick="rejectRequirement(2)">Reject</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
    }

    content.innerHTML = html;
}

// Initialize dashboard
function initializeDashboard() {
    // Add any initialization code here
}

// View module content
function viewModule(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
        alert(`Module: ${module.title}\n\nContent: ${module.content}`);
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Placeholder functions for admin actions
function addUser() {
    alert('Add User functionality would be implemented here');
}

function editUser(username) {
    alert(`Edit User: ${username}`);
}

function deleteUser(username) {
    alert(`Delete User: ${username}`);
}

function generateReport(type) {
    const reportContent = document.getElementById('reportContent');
    let content = '';

    switch (type) {
        case 'user':
            content = `<h3>User Report</h3><p>Total Users: ${users.length}</p>`;
            break;
        case 'course':
            content = `<h3>Course Report</h3><p>Total Courses: ${courses.length}</p>`;
            break;
        case 'submission':
            content = `<h3>Submission Report</h3><p>Total Submissions: ${submissions.length}</p>`;
            break;
    }

    reportContent.innerHTML = content;
}

// Filter users function
function filterUsers() {
    const filterBy = document.getElementById('filterUsers').value;
    const filteredUsers = filterBy === 'all' ? users : users.filter(user => user.role === filterBy);

    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser('${user.username}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.username}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Placeholder functions for coordinator actions
function viewProgress(studentId) {
    alert(`View Progress for Student ${studentId}`);
}

function approveRequirement(requirementId) {
    alert(`Approved Requirement ${requirementId}`);
}

function rejectRequirement(requirementId) {
    alert(`Rejected Requirement ${requirementId}`);
}

// Check if user is already logged in
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        loadDashboard(user.role);
    }
};
