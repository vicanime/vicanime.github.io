// Load users from localStorage or use default mock data
let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, username: 'student1', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000).toISOString(), status: 'active' }, // 1 day ago
    { id: 2, username: 'instructor1', password: 'pass', role: 'instructor', lastLogin: new Date(Date.now() - 172800000).toISOString(), status: 'active' }, // 2 days ago
    { id: 3, username: 'admin1', password: 'pass', role: 'admin', lastLogin: new Date(Date.now() - 2592000000).toISOString(), status: 'active' }, // 30 days ago
    { id: 4, username: 'coordinator1', password: 'pass', role: 'coordinator', lastLogin: new Date(Date.now() - 5184000000).toISOString(), status: 'pending' }, // 60 days ago
    { id: 5, username: 'student2', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 3600000).toISOString(), status: 'active' }, // 1 hour ago
    { id: 6, username: 'instructor2', password: 'pass', role: 'instructor', lastLogin: new Date(Date.now() - 604800000).toISOString(), status: 'active' }, // 7 days ago
    { id: 7, username: 'student3', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 45).toISOString(), status: 'inactive' }, // 45 days ago
    { id: 8, username: 'admin2', password: 'pass', role: 'admin', lastLogin: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'active' }, // 10 days ago
    { id: 9, username: 'student4', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'active' },
    { id: 10, username: 'student5', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'active' },
    { id: 11, username: 'student6', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'active' },
    { id: 12, username: 'student7', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(), status: 'active' },
    { id: 13, username: 'student8', password: 'pass', role: 'student', lastLogin: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'active' },
    { id: 14, username: 'instructor3', password: 'pass', role: 'instructor', lastLogin: new Date(Date.now() - 86400000 * 1).toISOString(), status: 'active' },
    { id: 15, username: 'instructor4', password: 'pass', role: 'instructor', lastLogin: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'active' },
    { id: 16, username: 'coordinator2', password: 'pass', role: 'coordinator', lastLogin: new Date(Date.now() - 86400000 * 20).toISOString(), status: 'active' },
    { id: 17, username: 'admin3', password: 'pass', role: 'admin', lastLogin: new Date(Date.now() - 86400000 * 15).toISOString(), status: 'active' },
    { id: 18, username: 'cashier1', password: 'pass', role: 'cashier', lastLogin: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'active' }
];

// Load users from localStorage or use default mock data
// Login form HTML constant to reduce duplication
const loginFormHTML = `
    <form id="loginForm">
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" required>
        </div>
        <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select class="form-select" id="role">
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Administrator</option>
                <option value="coordinator">Program Coordinator</option>
                <option value="cashier">Cashier</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <p class="text-center mt-3">Don't have an account? <a href="#" onclick="showRegisterForm()">Register here</a></p>
`;

const programs = ['BSIT', 'BSA', 'BSCS', 'BSCE', 'BSBA', 'BSN', 'BSAE', 'BSME', 'BSEE', 'BSCHE', 'BSPSY', 'BSMATH', 'BSECON', 'BSHIST', 'BSART'];

let courses = JSON.parse(localStorage.getItem('courses')) || [
    { id: 'F1', subject: 'ITE 302', description: 'Introduction to Programming', instructor: 'instructor1', schedule: 'Mon-Wed 10:00 AM - 11:30 AM', program: 'BSIT' },
    { id: 'D2', subject: 'ITE 303', description: 'Data Structures', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 2:00 PM - 3:30 PM', program: 'BSIT' },
    { id: 'W3', subject: 'ITE 304', description: 'Web Development', instructor: 'Ms. Davis', schedule: 'Fri 9:00 AM - 12:00 PM', program: 'BSIT' },
    { id: 'C4', subject: 'ITE 305', description: 'Database Management', instructor: 'Dr. Smith', schedule: 'Wed-Fri 1:00 PM - 2:30 PM', program: 'BSCS' },
    { id: 'C5', subject: 'ITE 306', description: 'Software Engineering', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 3:00 PM - 4:30 PM', program: 'BSCE' },
    { id: 'C6', subject: 'ITE 307', description: 'Network Security', instructor: 'Ms. Davis', schedule: 'Tue-Thu 9:00 AM - 10:30 AM', program: 'BSIT' },
    { id: 'C7', subject: 'ITE 308', description: 'Mobile App Development', instructor: 'Dr. Smith', schedule: 'Fri 1:00 PM - 4:00 PM', program: 'BSBA' },
    { id: 'C8', subject: 'ITE 309', description: 'Artificial Intelligence', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 10:00 AM - 11:30 AM', program: 'BSN' },
    { id: 'C9', subject: 'ITE 310', description: 'Cloud Computing', instructor: 'Ms. Davis', schedule: 'Tue-Thu 2:00 PM - 3:30 PM', program: 'BSAE' },
    { id: 'C10', subject: 'ITE 311', description: 'Machine Learning', instructor: 'Dr. Smith', schedule: 'Wed-Fri 9:00 AM - 10:30 AM', program: 'BSME' },
    { id: 'C11', subject: 'ITE 312', description: 'Cybersecurity', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 1:00 PM - 2:30 PM', program: 'BSEE' },
    { id: 'C12', subject: 'ITE 313', description: 'Data Analytics', instructor: 'Ms. Davis', schedule: 'Tue-Thu 3:00 PM - 4:30 PM', program: 'BSCHE' },
    { id: 'C13', subject: 'ITE 314', description: 'Blockchain Technology', instructor: 'Dr. Smith', schedule: 'Fri 9:00 AM - 12:00 PM', program: 'BSPSY' },
    { id: 'C14', subject: 'ITE 315', description: 'Internet of Things', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 2:00 PM - 3:30 PM', program: 'BSMATH' },
    { id: 'C15', subject: 'ITE 316', description: 'Game Development', instructor: 'Ms. Davis', schedule: 'Tue-Thu 10:00 AM - 11:30 AM', program: 'BSECON' },
    { id: 'C16', subject: 'ITE 317', description: 'Digital Marketing', instructor: 'Dr. Smith', schedule: 'Wed-Fri 1:00 PM - 2:30 PM', program: 'BSHIST' },
    { id: 'C17', subject: 'ITE 318', description: 'E-commerce', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 3:00 PM - 4:30 PM', program: 'BSART' },
    { id: 'C18', subject: 'ITE 319', description: 'Human-Computer Interaction', instructor: 'Ms. Davis', schedule: 'Tue-Thu 9:00 AM - 10:30 AM', program: 'BSIT' },
    { id: 'C19', subject: 'ITE 320', description: 'Big Data', instructor: 'Dr. Smith', schedule: 'Fri 1:00 PM - 4:00 PM', program: 'BSCS' },
    { id: 'C20', subject: 'ITE 321', description: 'DevOps', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 10:00 AM - 11:30 AM', program: 'BSCE' },
    { id: 'C21', subject: 'ITE 322', description: 'Embedded Systems', instructor: 'Ms. Davis', schedule: 'Tue-Thu 2:00 PM - 3:30 PM', program: 'BSBA' },
    { id: 'C22', subject: 'ITE 323', description: 'Virtual Reality', instructor: 'Dr. Smith', schedule: 'Wed-Fri 9:00 AM - 10:30 AM', program: 'BSN' },
    { id: 'C23', subject: 'ITE 324', description: 'Augmented Reality', instructor: 'Prof. Johnson', schedule: 'Mon-Wed 1:00 PM - 2:30 PM', program: 'BSAE' },
    { id: 'C24', subject: 'ITE 325', description: 'Advanced Database Systems', instructor: 'Dr. Smith', schedule: 'Mon-Wed 2:00 PM - 3:30 PM', program: 'BSCS' },
    { id: 'C25', subject: 'ITE 326', description: 'Advanced Software Engineering', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 1:00 PM - 2:30 PM', program: 'BSCE' },
    { id: 'C26', subject: 'ITE 327', description: 'Business Intelligence', instructor: 'Ms. Davis', schedule: 'Fri 10:00 AM - 1:00 PM', program: 'BSBA' },
    { id: 'C27', subject: 'ITE 328', description: 'Neural Networks', instructor: 'Dr. Smith', schedule: 'Mon-Wed 11:00 AM - 12:30 PM', program: 'BSN' },
    { id: 'C28', subject: 'ITE 329', description: 'Robotics', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 3:00 PM - 4:30 PM', program: 'BSAE' },
    { id: 'C29', subject: 'ITE 330', description: 'Mechatronics', instructor: 'Ms. Davis', schedule: 'Wed-Fri 10:00 AM - 11:30 AM', program: 'BSME' },
    { id: 'C30', subject: 'ITE 331', description: 'CAD/CAM', instructor: 'Dr. Smith', schedule: 'Mon-Wed 4:00 PM - 5:30 PM', program: 'BSME' },
    { id: 'C31', subject: 'ITE 332', description: 'Power Systems', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 11:00 AM - 12:30 PM', program: 'BSEE' },
    { id: 'C32', subject: 'ITE 333', description: 'Control Systems', instructor: 'Ms. Davis', schedule: 'Fri 2:00 PM - 5:00 PM', program: 'BSEE' },
    { id: 'C33', subject: 'ITE 334', description: 'Process Control', instructor: 'Dr. Smith', schedule: 'Mon-Wed 1:00 PM - 2:30 PM', program: 'BSCHE' },
    { id: 'C34', subject: 'ITE 335', description: 'Chemical Engineering Thermodynamics', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 4:00 PM - 5:30 PM', program: 'BSCHE' },
    { id: 'C35', subject: 'ITE 336', description: 'Cognitive Psychology', instructor: 'Ms. Davis', schedule: 'Wed-Fri 11:00 AM - 12:30 PM', program: 'BSPSY' },
    { id: 'C36', subject: 'ITE 337', description: 'Behavioral Neuroscience', instructor: 'Dr. Smith', schedule: 'Mon-Wed 3:00 PM - 4:30 PM', program: 'BSPSY' },
    { id: 'C37', subject: 'ITE 338', description: 'Abstract Algebra', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 10:00 AM - 11:30 AM', program: 'BSMATH' },
    { id: 'C38', subject: 'ITE 339', description: 'Real Analysis', instructor: 'Ms. Davis', schedule: 'Fri 9:00 AM - 12:00 PM', program: 'BSMATH' },
    { id: 'C39', subject: 'ITE 340', description: 'Macroeconomics', instructor: 'Dr. Smith', schedule: 'Mon-Wed 2:00 PM - 3:30 PM', program: 'BSECON' },
    { id: 'C40', subject: 'ITE 341', description: 'Econometrics', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 1:00 PM - 2:30 PM', program: 'BSECON' },
    { id: 'C41', subject: 'ITE 342', description: 'World History', instructor: 'Ms. Davis', schedule: 'Wed-Fri 10:00 AM - 11:30 AM', program: 'BSHIST' },
    { id: 'C42', subject: 'ITE 343', description: 'Philippine History', instructor: 'Dr. Smith', schedule: 'Mon-Wed 4:00 PM - 5:30 PM', program: 'BSHIST' },
    { id: 'C43', subject: 'ITE 344', description: 'Digital Art', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 11:00 AM - 12:30 PM', program: 'BSART' },
    { id: 'C44', subject: 'ITE 345', description: 'Art History', instructor: 'Ms. Davis', schedule: 'Fri 1:00 PM - 4:00 PM', program: 'BSART' },
    { id: 'C45', subject: 'ITE 346', description: 'Financial Accounting', instructor: 'Dr. Smith', schedule: 'Mon-Wed 9:00 AM - 10:30 AM', program: 'BSA' },
    { id: 'C46', subject: 'ITE 347', description: 'Managerial Accounting', instructor: 'Prof. Johnson', schedule: 'Tue-Thu 1:00 PM - 2:30 PM', program: 'BSA' },
    { id: 'C47', subject: 'ITE 348', description: 'Auditing Principles', instructor: 'Ms. Davis', schedule: 'Wed-Fri 10:00 AM - 11:30 AM', program: 'BSA' }
];

const modules = [
    { id: 1, courseId: 'F1', title: 'Variables and Data Types', content: 'Content for Variables and Data Types' },
    { id: 2, courseId: 'F1', title: 'Control Structures', content: 'Content for Control Structures' },
    { id: 3, courseId: 'D2', title: 'Arrays and Lists', content: 'Content for Arrays and Lists' }
];

const submissions = [
    { id: 1, studentId: 1, moduleId: 1, grade: "90/100", feedback: 'Excellent work!' },
    { id: 2, studentId: 1, moduleId: 2, grade: "85/90", feedback: 'Good job, but can improve.' },
    { id: 3, studentId: 2, moduleId: 3, grade: "78/100", feedback: 'Needs more detail.' },
    { id: 4, studentId: 5, moduleId: 1, grade: "92/100", feedback: 'Well done.' },
    { id: 5, studentId: 9, moduleId: 2, grade: "88/90", feedback: 'Solid effort.' },
    { id: 6, studentId: 10, moduleId: 3, grade: "75/100", feedback: 'Review the basics.' },
    { id: 7, studentId: 11, moduleId: 1, grade: "95/100", feedback: 'Outstanding!' },
    { id: 8, studentId: 12, moduleId: 2, grade: "82/90", feedback: 'Good, but check calculations.' },
    { id: 9, studentId: 13, moduleId: 3, grade: "70/100", feedback: 'More practice needed.' },
    { id: 10, studentId: 1, moduleId: 3, grade: "87/100", feedback: 'Nice progress.' }
];

const enrollments = [
    { studentId: 1, courseId: 'F1' }, // student1 enrolled in Introduction to Programming
    { studentId: 1, courseId: 'D2' }, // student1 enrolled in Data Structures
    { studentId: 2, courseId: 'D2' }  // student2 enrolled in Data Structures
];

const fees = [
    { id: 1, courseId: 'F1', amount: 500, description: 'Enrollment Fee for ITE 302' },
    { id: 2, courseId: 'D2', amount: 600, description: 'Enrollment Fee for ITE 303' },
    { id: 3, courseId: 'W3', amount: 550, description: 'Enrollment Fee for ITE 304' }
];

let announcements = JSON.parse(localStorage.getItem('announcements')) || [
    { id: 1, courseId: 'F1', title: 'Welcome to Programming', message: 'Welcome to the Introduction to Programming course! Please review the syllabus.', date: new Date().toISOString() },
    { id: 2, courseId: 'D2', title: 'Data Structures Update', message: 'New module on Arrays and Lists has been added. Check it out!', date: new Date().toISOString() },
    { id: 3, courseId: 'F1', title: 'Assignment Due', message: 'The first assignment is due next week. Submit via the portal.', date: new Date().toISOString() },
    { id: 4, courseId: 'F1', title: 'Midterm Exam Reminder', message: 'Midterm exam is scheduled for next Friday. Study chapters 1-5.', date: new Date().toISOString() },
    { id: 5, courseId: 'D2', title: 'Project Submission', message: 'Group project proposals are due by end of the week.', date: new Date().toISOString() },
    { id: 6, courseId: 'W3', title: 'Web Dev Workshop', message: 'Join us for a hands-on workshop on HTML and CSS this weekend.', date: new Date().toISOString() }
];

// Dummy data for cashier features
let payments = JSON.parse(localStorage.getItem('payments')) || [
    { id: 1, studentId: 1, studentName: 'student1', amount: 500, date: '2023-10-01', method: 'Gcash', status: 'Completed' },
    { id: 2, studentId: 2, studentName: 'student2', amount: 600, date: '2023-10-02', method: 'Landbank', status: 'Completed' },
    { id: 3, studentId: 5, studentName: 'student3', amount: 550, date: '2023-10-03', method: 'Paypal', status: 'Pending' },
    { id: 4, studentId: 9, studentName: 'student4', amount: 450, date: '2023-10-04', method: 'Credit Card', status: 'Completed' },
    { id: 5, studentId: 10, studentName: 'student5', amount: 700, date: '2023-10-05', method: 'Gcash', status: 'Completed' }
];

let outstandingBalances = JSON.parse(localStorage.getItem('outstandingBalances')) || [
    { studentId: 1, studentName: 'student1', balance: 4673, dueDate: '2023-11-01' },
    { studentId: 2, studentName: 'student2', balance: 4573, dueDate: '2023-11-01' },
    { studentId: 5, studentName: 'student3', balance: 4623, dueDate: '2023-11-01' },
    { studentId: 9, studentName: 'student4', balance: 4723, dueDate: '2023-11-01' },
    { studentId: 10, studentName: 'student5', balance: 4473, dueDate: '2023-11-01' }
];

let receipts = JSON.parse(localStorage.getItem('receipts')) || [
    { id: 1, paymentId: 1, receiptNumber: 'RCP-001', generatedDate: '2023-10-01' },
    { id: 2, paymentId: 2, receiptNumber: 'RCP-002', generatedDate: '2023-10-02' },
    { id: 3, paymentId: 4, receiptNumber: 'RCP-003', generatedDate: '2023-10-04' },
    { id: 4, paymentId: 5, receiptNumber: 'RCP-004', generatedDate: '2023-10-05' }
];

let feeAdjustments = JSON.parse(localStorage.getItem('feeAdjustments')) || [
    { id: 1, studentId: 1, studentName: 'student1', adjustmentType: 'Discount', amount: 100, reason: 'Early Payment', date: '2023-09-15' },
    { id: 2, studentId: 2, studentName: 'student2', adjustmentType: 'Penalty', amount: 50, reason: 'Late Payment', date: '2023-09-20' },
    { id: 3, studentId: 5, studentName: 'student3', adjustmentType: 'Waiver', amount: 200, reason: 'Scholarship', date: '2023-09-10' }
];

let financialReports = {
    totalRevenue: 2250,
    totalOutstanding: 23065,
    monthlyRevenue: [
        { month: 'September', amount: 1200 },
        { month: 'October', amount: 1050 }
    ],
    paymentMethods: [
        { method: 'Gcash', count: 2, amount: 1200 },
        { method: 'Landbank', count: 1, amount: 600 },
        { method: 'Paypal', count: 1, amount: 550 },
        { method: 'Credit Card', count: 1, amount: 450 }
    ]
};

// Password strength validation function
function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
}

// Login handler function
function loginHandler(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    console.log('Login attempt:', { username, password, role });
    console.log('Users array:', users);

    // Allow cashiers to bypass role selection
    const user = users.find(u => u.username === username && u.password === password && (u.role === role || (role === '' && u.role === 'cashier')));

    if (user && user.status === 'active') {
        localStorage.setItem('currentUser', JSON.stringify(user));
        loadDashboard(user.role);
    } else if (user && user.status === 'pending') {
        alert('Your account is pending approval. Please contact an administrator.');
    } else if (user && user.status === 'inactive') {
        alert('Your account is inactive. Please contact an administrator.');
    } else {
        alert('Invalid credentials');
    }
}



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
        case 'cashier':
            dashboardHTML = generateCashierDashboard();
            break;
    }

    document.body.innerHTML = dashboardHTML;
    initializeDashboard();
}

// Generate Student Dashboard
function generateStudentDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const enrolledCourses = enrollments.filter(e => e.studentId === currentUser.id).length;
    const studentSubmissions = submissions.filter(s => s.studentId === currentUser.id);
    const recentGrades = studentSubmissions.slice(-3); // Last 3 submissions
    const pendingSubmissions = studentSubmissions.filter(s => !s.grade || s.grade === 'N/A').length;

    return `
        <div class="university-header dashboard-university-header">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">MOUNTAIN PROVINCE STATE UNIVERSITY</h5>
            </div>
            <p>POBLACION, BONTOC, MOUNTAIN PROVINCE, 2616 PHILIPPINES</p>
        </div>
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Student Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('courses')">My Subject</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('modules')">Modules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('submissions')">My Submitted output</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('grades')">View Grade</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('payments')">Pay Fees</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('announcements')">Announcements</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome back, ${currentUser.username}!</h2>
                <p>We're excited to see you continuing your learning journey at Mountain Province State University. Here's a quick overview of your academic progress:</p>

                <!-- Quick Stats -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Enrolled Courses</h5>
                                <p class="card-text display-4">${enrolledCourses}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Recent Grades</h5>
                                <p class="card-text display-4">${recentGrades.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Pending Submissions</h5>
                                <p class="card-text display-4">${pendingSubmissions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Announcements -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Recent Announcements</h5>
                    </div>
                    <div class="card-body">
                        ${announcements.filter(a => enrollments.some(e => e.studentId === currentUser.id && e.courseId === a.courseId)).slice(-3).map(ann => `
                            <div class="mb-2">
                                <strong>${ann.title}</strong> - ${courses.find(c => c.id === ann.courseId)?.subject || 'Unknown'}
                                <small class="text-muted">${new Date(ann.date).toLocaleDateString()}</small>
                            </div>
                        `).join('') || '<p>No recent announcements.</p>'}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <button class="btn btn-primary me-2" onclick="showSection('courses')">View My Courses</button>
                        <button class="btn btn-secondary me-2" onclick="showSection('grades')">Check Grades</button>
                        <button class="btn btn-info" onclick="showSection('announcements')">Read Announcements</button>
                    </div>
                </div>

                <p class="mt-3">Remember, consistent effort leads to success. Keep up the great work and don't hesitate to reach out to your instructors if you need help!</p>
            </div>
        </div>
    `;
}

// Generate Instructor Dashboard
function generateInstructorDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const assignedCourses = courses.filter(c => c.instructor === currentUser.username);
    const totalStudents = enrollments.filter(e => assignedCourses.some(c => c.id === e.courseId)).length;
    const instructorModules = modules.filter(m => assignedCourses.some(c => c.id === m.courseId));
    const pendingSubmissions = submissions.filter(s => instructorModules.some(m => m.id === s.moduleId)).length;
    const recentAnnouncements = announcements.filter(a => assignedCourses.some(c => c.id === a.courseId)).slice(-5);

    return `
        <div class="university-header dashboard-university-header">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">MOUNTAIN PROVINCE STATE UNIVERSITY</h5>
            </div>
            <p>POBLACION, BONTOC, MOUNTAIN PROVINCE, 2616 PHILIPPINES</p>
        </div>
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Instructor Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('courses')">My Subject</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('modules')">Manage Modules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('submissions')">Evaluate Submissions</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('announcements')">Announcements</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome, ${currentUser.username}!</h2>
                <p>Empower your students through innovative teaching. Here's your dashboard overview:</p>

                <!-- Quick Stats -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Courses Assigned</h5>
                                <p class="card-text display-4">${assignedCourses.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Students Enrolled</h5>
                                <p class="card-text display-4">${totalStudents}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Pending Evaluations</h5>
                                <p class="card-text display-4">${pendingSubmissions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Announcements -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Recent Announcements</h5>
                    </div>
                    <div class="card-body">
                        ${recentAnnouncements.length > 0 ? recentAnnouncements.map(ann => `
                            <div class="mb-2">
                                <strong>${ann.title}</strong> - ${courses.find(c => c.id === ann.courseId)?.subject || 'Unknown'}
                                <small class="text-muted">${new Date(ann.date).toLocaleDateString()}</small>
                            </div>
                        `).join('') : '<p>No recent announcements.</p>'}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <button class="btn btn-primary me-2" onclick="showSection('courses')">View My Courses</button>
                        <button class="btn btn-secondary me-2" onclick="showSection('submissions')">Evaluate Submissions</button>
                        <button class="btn btn-info" onclick="showSection('announcements')">Post Announcement</button>
                    </div>
                </div>

                <p class="mt-3">Remember, your dedication shapes the future of our students. Let's make learning engaging and impactful!</p>
            </div>
        </div>
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
            <div id="announcementToast" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                <div class="d-flex">
                    <div class="toast-body">
                        Announcement posted successfully!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    `;
}

// Generate Admin Dashboard
function generateAdminDashboard() {
    // Calculate user statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const inactiveUsers = users.filter(u => u.status === 'inactive').length;

    // Get recent registrations (last 5, assuming sorted by id descending)
    const recentUsers = users.slice(-5).reverse();

    // Get pending users for quick approval
    const pendingList = users.filter(u => u.status === 'pending');

    return `
        <div class="university-header dashboard-university-header">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">MOUNTAIN PROVINCE STATE UNIVERSITY</h5>
            </div>
            <p>POBLACION, BONTOC, MOUNTAIN PROVINCE, 2616 PHILIPPINES</p>
        </div>
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
                <p>Here's a quick overview of the system. Select an option from the sidebar to manage specific areas.</p>

                <!-- User Statistics Overview -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total Users</h5>
                                <p class="card-text display-4">${totalUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Active Users</h5>
                                <p class="card-text display-4 text-success">${activeUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Pending Approvals</h5>
                                <p class="card-text display-4 text-warning">${pendingUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Inactive Users</h5>
                                <p class="card-text display-4 text-danger">${inactiveUsers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pending Approvals Section -->
                ${pendingUsers > 0 ? `
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Pending User Approvals</h5>
                    </div>
                    <div class="card-body">
                        <p>These users are waiting for approval to access the system.</p>
                        <ul class="list-group">
                            ${pendingList.map(user => `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    ${user.username} (${user.role})
                                    <button class="btn btn-success btn-sm" onclick="approveUser('${user.username}')">Approve</button>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                ` : '<div class="alert alert-success">No pending approvals at this time.</div>'}

                <!-- Recent Registrations -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Recent Registrations</h5>
                    </div>
                    <div class="card-body">
                        <p>Latest user registrations in the system.</p>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${recentUsers.map(user => `
                                    <tr>
                                        <td>${user.username}</td>
                                        <td>${user.role}</td>
                                        <td>${user.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <p>Use these shortcuts for common administrative tasks.</p>
                        <button class="btn btn-primary me-2" onclick="showSection('users')">Manage Users</button>
                        <button class="btn btn-secondary me-2" onclick="showSection('courses')">Manage Courses</button>
                        <button class="btn btn-info" onclick="showSection('reports')">View Reports</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Coordinator Dashboard
function generateCoordinatorDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalInstructors = users.filter(u => u.role === 'instructor').length;
    const pendingApprovals = users.filter(u => u.status === 'pending').length;

    // Recent enrollments (last 5)
    const recentEnrollments = enrollments.slice(-5).reverse();

    // Recent announcements (last 3)
    const recentAnnouncements = announcements.slice(-3).reverse();

    return `
        <div class="university-header dashboard-university-header">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">MOUNTAIN PROVINCE STATE UNIVERSITY</h5>
            </div>
            <p>POBLACION, BONTOC, MOUNTAIN PROVINCE, 2616 PHILIPPINES</p>
        </div>
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
                <h2>Welcome back, ${currentUser.username}!</h2>
                <p>As a Program Coordinator, you play a pivotal role in overseeing academic progress, ensuring quality education, and facilitating smooth program operations at Mountain Province State University. Here's a snapshot of key metrics and recent activities to help you stay on top of things:</p>

                <!-- Quick Stats -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total Students</h5>
                                <p class="card-text display-4">${totalStudents}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total Instructors</h5>
                                <p class="card-text display-4">${totalInstructors}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Pending Approvals</h5>
                                <p class="card-text display-4 text-warning">${pendingApprovals}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Recent Enrollments</h5>
                            </div>
                            <div class="card-body">
                                ${recentEnrollments.length > 0 ? recentEnrollments.map(enrollment => {
                                    const student = users.find(u => u.id === enrollment.studentId);
                                    const course = courses.find(c => c.id === enrollment.courseId);
                                    return `<p><strong>${student ? student.username : 'Unknown'}</strong> enrolled in ${course ? course.subject : 'Unknown Course'}</p>`;
                                }).join('') : '<p>No recent enrollments.</p>'}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Recent Announcements</h5>
                            </div>
                            <div class="card-body">
                                ${recentAnnouncements.length > 0 ? recentAnnouncements.map(ann => {
                                    const course = courses.find(c => c.id === ann.courseId);
                                    return `<p><strong>${ann.title}</strong> - ${course ? course.subject : 'Unknown'} <small class="text-muted">${new Date(ann.date).toLocaleDateString()}</small></p>`;
                                }).join('') : '<p>No recent announcements.</p>'}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <p>Jump into key tasks to keep the program running smoothly.</p>
                        <button class="btn btn-primary me-2" onclick="showSection('progress')">Review Student Progress</button>
                        <button class="btn btn-secondary me-2" onclick="showSection('approvals')">Approve Requirements</button>
                        <button class="btn btn-info" onclick="showSection('reports')">View Reports</button>
                    </div>
                </div>

                <p class="mt-3">Your oversight ensures our students receive the best possible education. Let's continue to foster an environment of excellence and growth!</p>
            </div>
        </div>
    `;
}

// Generate Cashier Dashboard
function generateCashierDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const totalPayments = payments.length;
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalOutstanding = outstandingBalances.reduce((sum, b) => sum + b.balance, 0);
    const recentPayments = payments.slice(-3).reverse(); // Last 3 payments

    return `
        <div class="university-header dashboard-university-header">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">MOUNTAIN PROVINCE STATE UNIVERSITY</h5>
            </div>
            <p>POBLACION, BONTOC, MOUNTAIN PROVINCE, 2616 PHILIPPINES</p>
        </div>
        <div class="dashboard d-flex">
            <nav class="sidebar col-md-2 p-3">
                <h4 class="text-center mb-4">Cashier Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('payments')">Manage Payments</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('outstandingBalances')">Outstanding Balances</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('receipts')">Receipts</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('feeAdjustments')">Fee Adjustments</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('financialReports')">Financial Reports</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="showSection('fees')">View Fees</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
            <div class="content col-md-10" id="mainContent">
                <h2>Welcome back, ${currentUser.username}!</h2>
                <p>As the financial backbone of Mountain Province State University, your role ensures smooth operations and student success. Here's a snapshot of our financial health:</p>

                <!-- Quick Stats -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total Payments</h5>
                                <p class="card-text display-4">${totalPayments}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total Revenue</h5>
                                <p class="card-text display-4">₱${totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Outstanding Balances</h5>
                                <p class="card-text display-4">₱${totalOutstanding.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Payments -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Recent Payments</h5>
                    </div>
                    <div class="card-body">
                        <p>Latest transactions processed in the system.</p>
                        ${recentPayments.length > 0 ? `
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${recentPayments.map(payment => `
                                    <tr>
                                        <td>${payment.studentName}</td>
                                        <td>₱${payment.amount}</td>
                                        <td>${payment.date}</td>
                                        <td>${payment.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        ` : '<p>No recent payments.</p>'}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <p>Common tasks to keep our finances flowing smoothly.</p>
                        <button class="btn btn-primary me-2" onclick="showSection('payments')">Process New Payment</button>
                        <button class="btn btn-secondary me-2" onclick="showSection('outstandingBalances')">Check Balances</button>
                        <button class="btn btn-info" onclick="showSection('financialReports')">View Reports</button>
                    </div>
                </div>

                <p class="mt-3">Your attention to detail and efficiency help our students focus on their education. Let's keep the momentum going!</p>
            </div>
        </div>
    `;
}

// Show different sections
function showSection(section) {
    const content = document.getElementById('mainContent');
    let html = '';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    switch (section) {
        case 'courses':
            const title = currentUser.role === 'admin' ? 'BSIT Course' : 'My Subject';
            if (currentUser.role === 'admin') {
                html = `
                    <h2>${title}</h2>
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Add New Course</h5>
                            <form id="addCourseForm">
                                <div class="mb-3">
                                    <label for="courseCode" class="form-label">Code</label>
                                    <input type="text" class="form-control" id="courseCode" required>
                                </div>
                                <div class="mb-3">
                                    <label for="courseSubject" class="form-label">Subject</label>
                                    <input type="text" class="form-control" id="courseSubject" required>
                                </div>
                                <div class="mb-3">
                                    <label for="courseDescription" class="form-label">Description</label>
                                    <input type="text" class="form-control" id="courseDescription" required>
                                </div>
                                <div class="mb-3">
                                    <label for="courseInstructor" class="form-label">Instructor</label>
                                    <select class="form-select" id="courseInstructor" required>
                                        <option value="">Select Instructor</option>
                                        ${users.filter(u => u.role === 'instructor').map(instructor => `<option value="${instructor.username}">${instructor.username}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="courseSchedule" class="form-label">Schedule</label>
                                    <input type="text" class="form-control" id="courseSchedule" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Add Course</button>
                            </form>
                        </div>
                    </div>
                    <h3>All Courses</h3>
                    <div class="mb-3">
                        <label for="filterCourses" class="form-label">Filter Courses by Program:</label>
                        <select class="form-select" id="filterCourses" onchange="filterCourses()">
                            <option value="all">All</option>
                            ${programs.map(program => `<option value="${program}">${program}</option>`).join('')}
                        </select>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Subject</th>
                                    <th>Description</th>
                                    <th>Instructor</th>
                                    <th>Schedule</th>
                                </tr>
                            </thead>
                            <tbody id="coursesTableBody">
                                ${courses.map(course => `
                                    <tr>
                                        <td>${course.id}</td>
                                        <td>${course.subject}</td>
                                        <td>${course.description}</td>
                                        <td>${course.instructor}</td>
                                        <td>${course.schedule}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                let filteredCourses;
                if (currentUser.role === 'student') {
                    filteredCourses = courses.filter(c => enrollments.some(e => e.studentId === currentUser.id && e.courseId === c.id));
                } else if (currentUser.role === 'instructor') {
                    filteredCourses = courses.filter(c => c.instructor === currentUser.username);
                } else {
                    filteredCourses = courses;
                }
                html = `
                    <h2>${title}</h2>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Subject</th>
                                    <th>Description</th>
                                    <th>Instructor</th>
                                    <th>Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredCourses.map(course => `
                                    <tr>
                                        <td>${course.id}</td>
                                        <td>${course.subject}</td>
                                        <td>${course.description}</td>
                                        <td>${course.instructor}</td>
                                        <td>${course.schedule}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
            break;
case 'modules':
            html = `
                <h2>Modules</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
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
                                        <td>${module.title}</td>
                                        <td>${course ? course.subject : 'N/A'}</td>
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
            if (currentUser.role === 'instructor') {
                // Instructor view: Evaluate student submissions
                const instructorCourses = courses.filter(c => c.instructor === currentUser.username);
                const instructorModules = modules.filter(m => instructorCourses.some(c => c.id === m.courseId));
                const instructorSubmissions = submissions.filter(s => instructorModules.some(m => m.id === s.moduleId));

                html = `
                    <h2>Evaluate Submissions</h2>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Subject</th>
                                    <th>Module</th>
                                    <th>Current Grade</th>
                                    <th>Feedback</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${instructorSubmissions.map(submission => {
                                    const module = modules.find(m => m.id === submission.moduleId);
                                    const course = module ? courses.find(c => c.id === module.courseId) : null;
                                    const student = users.find(u => u.id === submission.studentId);
                                    return `
                                        <tr>
                                            <td>${student ? student.username : 'N/A'}</td>
                                            <td>${course ? course.subject : 'N/A'}</td>
                                            <td>${module ? module.title : 'N/A'}</td>
                                            <td>${submission.grade}</td>
                                            <td>${submission.feedback}</td>
                                            <td>
                                                <button class="btn btn-primary btn-sm" onclick="gradeSubmission(${submission.id})">Grade</button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                // Student view: My Submitted output
                html = `
                    <h2>My Submitted output</h2>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Module</th>
                                    <th>Score</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${submissions.filter(s => s.studentId === currentUser.id).map(submission => {
                                    const module = modules.find(m => m.id === submission.moduleId);
                                    const course = module ? courses.find(c => c.id === module.courseId) : null;
                                    return `
                                        <tr>
                                            <td>${course ? course.subject : 'N/A'}</td>
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
            }
            break;
        case 'grades':
            const studentEnrollments = enrollments.filter(e => e.studentId === currentUser.id);
            const grouped = {};
            studentEnrollments.forEach(e => {
                const course = courses.find(c => c.id === e.courseId);
                const subs = submissions.filter(s => s.studentId === currentUser.id && modules.find(m => m.id === s.moduleId).courseId === e.courseId);
                grouped[e.courseId] = { course, submissions: subs };
            });
            html = `
                <h2>My Grades</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Grade</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.values(grouped).map(group => {
                                const course = group.course;
                                const subs = group.submissions;
                                const grades = subs.length > 0 ? subs.map(s => s.grade).join(', ') : 'N/A';
                                const remarks = subs.length > 0 && subs.every(s => s.grade) ? 'complete' : 'incomplete';
                                return `
                                    <tr>
                                        <td>${course.subject}</td>
                                        <td>${course.description}</td>
                                        <td>${grades}</td>
                                        <td>${remarks}</td>
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
                        <option value="cashier">Cashier</option>
                    </select>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            ${users.map(user => `
                                <tr>
                                    <td>${user.username}</td>
                                    <td>${user.role}</td>
                                    <td>${user.status}</td>
                                    <td>
                                        ${user.status === 'pending' ? `<button class="btn btn-success btn-sm" onclick="approveUser('${user.username}')">Approve</button>` : ''}
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
        case 'payments':
            if (currentUser.role === 'cashier') {
                html = `
                    <h2>Manage Payments</h2>
                    <button class="btn btn-primary mb-3" onclick="addPayment()">Add New Payment</button>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${payments.map(payment => `
                                    <tr>
                                        <td>${payment.studentName}</td>
                                        <td>₱${payment.amount}</td>
                                        <td>${payment.date}</td>
                                        <td>${payment.method}</td>
                                        <td>${payment.status}</td>
                                        <td>
                                            <button class="btn btn-warning btn-sm" onclick="editPayment(${payment.id})">Edit</button>
                                            <button class="btn btn-danger btn-sm" onclick="deletePayment(${payment.id})">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                html = `
                    <h2>ASSESSMENT OF FEES</h2>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="table-dark">
                                <tr>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="3"><strong>Tuition Fees</strong></td>
                                    <td>Tuition Fees: 21 × 208/unit</td>
                                    <td>4,368.00</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>4,368.00</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><strong>4,368.00</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Laboratory Fees</strong></td>
                                    <td>Computer Laboratory: 1 × 500/subject</td>
                                    <td>500.00</td>
                                </tr>
                                <tr>
                                    <td rowspan="12"><strong>Miscellaneous Fees</strong></td>
                                    <td>School ID - Validation Fee</td>
                                    <td>500.00</td>
                                </tr>
                                <tr>
                                    <td>Scuaa Fees</td>
                                    <td>25.00</td>
                                </tr>
                                <tr>
                                    <td>Mutual Aid Fund</td>
                                    <td>100.00</td>
                                </tr>
                                <tr>
                                    <td>Medical / Dental Fee</td>
                                    <td>50.00</td>
                                </tr>
                                <tr>
                                    <td>Library Fees</td>
                                    <td>50.00</td>
                                </tr>
                                <tr>
                                    <td>Cultural Fees</td>
                                    <td>300.00</td>
                                </tr>
                                <tr>
                                    <td>Athletic Fee</td>
                                    <td>60.00</td>
                                </tr>
                                <tr>
                                    <td>Borrower's Card</td>
                                    <td>100.00</td>
                                </tr>
                                <tr>
                                    <td>Registration Fees</td>
                                    <td>20.00</td>
                                </tr>
                                <tr>
                                    <td>Insurance Fee</td>
                                    <td>100.00</td>
                                </tr>
                                <tr>
                                    <td>Development Fee</td>
                                    <td>500.00</td>
                                </tr>
                                <tr>
                                    <td>Total Miscellaneous</td>
                                    <td>805.00</td>
                                </tr>
                                <tr>
                                    <td><strong>Other Fees</strong></td>
                                    <td>Student Services Fee</td>
                                    <td>500.00</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>500.00</td>
                                </tr>
                                <tr class="table-dark">
                                    <td colspan="2"><strong>Total Assessment</strong></td>
                                    <td><strong>6,173.00</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2">Upon Enrollment</td>
                                    <td>0.00</td>
                                </tr>
                                <tr class="table-warning">
                                    <td colspan="2"><strong>Balance Payable</strong></td>
                                    <td><strong>6,173.00</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3">
                        <label for="paymentMethod" class="form-label">Select Payment Method:</label>
                        <select class="form-select" id="paymentMethod">
                            <option value="Gcash">Gcash</option>
                            <option value="Landbank">Landbank</option>
                            <option value="Paypal">Paypal</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                        <button class="btn btn-primary mt-2" onclick="payTotalFee()">Pay Now</button>
                    </div>
                `;
            }
            break;
        case 'fees':
            html = `
                <h2>View Fees</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Amount</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${fees.map(fee => `
                                <tr>
                                    <td>${courses.find(c => c.id === fee.courseId)?.subject || 'N/A'}</td>
                                    <td>₱${fee.amount}</td>
                                    <td>${fee.description}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'outstandingBalances':
            html = `
                <h2>Outstanding Balances</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Balance</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${outstandingBalances.map(balance => `
                                <tr>
                                    <td>${balance.studentName}</td>
                                    <td>₱${balance.balance}</td>
                                    <td>${balance.dueDate}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'receipts':
            html = `
                <h2>Receipts</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Receipt Number</th>
                                <th>Payment ID</th>
                                <th>Generated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${receipts.map(receipt => `
                                <tr>
                                    <td>${receipt.receiptNumber}</td>
                                    <td>${receipt.paymentId}</td>
                                    <td>${receipt.generatedDate}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'feeAdjustments':
            html = `
                <h2>Fee Adjustments</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Adjustment Type</th>
                                <th>Amount</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feeAdjustments.map(adjustment => `
                                <tr>
                                    <td>${adjustment.studentName}</td>
                                    <td>${adjustment.adjustmentType}</td>
                                    <td>₱${adjustment.amount}</td>
                                    <td>${adjustment.reason}</td>
                                    <td>${adjustment.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'financialReports':
            html = `
                <h2>Financial Reports</h2>
                <div class="row">
                    <div class="col-md-6">
                        <h4>Total Revenue</h4>
                        <p>₱${financialReports.totalRevenue}</p>
                        <h4>Total Outstanding</h4>
                        <p>₱${financialReports.totalOutstanding}</p>
                    </div>
                    <div class="col-md-6">
                        <h4>Monthly Revenue</h4>
                        <ul>
                            ${financialReports.monthlyRevenue.map(month => `<li>${month.month}: ₱${month.amount}</li>`).join('')}
                        </ul>
                        <h4>Payment Methods</h4>
                        <ul>
                            ${financialReports.paymentMethods.map(method => `<li>${method.method}: ${method.count} transactions, ₱${method.amount}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            break;
        case 'announcements':
            let announcementsHtml = '';

            if (currentUser.role === 'instructor') {
                // Instructor view: show form to post announcements and all announcements
                announcementsHtml = `
                    <h2>Announcements</h2>
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Post New Announcement</h5>
                            <form id="announcementForm">
                                <div class="mb-3">
                                    <label for="courseSelect" class="form-label">Course</label>
                                    <select class="form-select" id="courseSelect" required>
                                        <option value="">Select Course</option>
                                        ${courses.map(course => `<option value="${course.id}">${course.subject}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="announcementTitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="announcementTitle" required>
                                </div>
                                <div class="mb-3">
                                    <label for="announcementMessage" class="form-label">Message</label>
                                    <textarea class="form-control" id="announcementMessage" rows="3" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Post Announcement</button>
                            </form>
                        </div>
                    </div>
                    <h3>All Announcements</h3>
                    ${announcements.length > 0 ? announcements.map(ann => {
                        const course = courses.find(c => c.id === ann.courseId);
                        return `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${ann.title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${course ? course.subject : 'Unknown Course'}</h6>
                                    <p class="card-text">${ann.message}</p>
                                    <small class="text-muted">${new Date(ann.date).toLocaleString()}</small>
                                </div>
                            </div>
                        `;
                    }).join('') : '<p>No announcements available.</p>'}
                `;
            } else {
                // Student view: show only announcements for enrolled courses
                const studentEnrollmentsAnn = enrollments.filter(e => e.studentId === currentUser.id);
                const studentAnnouncements = announcements.filter(ann => studentEnrollmentsAnn.some(e => e.courseId === ann.courseId));
                announcementsHtml = `
                    <h2>Announcements</h2>
                    <div class="d-flex justify-content-center">
                        <div class="table-responsive" style="max-width: 100%;">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Course</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${studentAnnouncements.length > 0 ? studentAnnouncements.map(ann => {
                                        const course = courses.find(c => c.id === ann.courseId);
                                        return `
                                            <tr>
                                                <td>${ann.title}</td>
                                                <td>${course ? course.subject : 'Unknown Course'}</td>
                                                <td>${ann.message}</td>
                                                <td>${new Date(ann.date).toLocaleString()}</td>
                                            </tr>
                                        `;
                                    }).join('') : '<tr><td colspan="4">No announcements available.</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }

            html = announcementsHtml;
            break;
    }

    content.innerHTML = html;
}

// Initialize dashboard
function initializeDashboard() {
    // Add event listener for announcement form if it exists
    const announcementForm = document.getElementById('announcementForm');
    if (announcementForm) {
        announcementForm.addEventListener('submit', postAnnouncement);
    }

    // Add event listener for add course form if it exists
    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', addCourse);
    }
}

// Add course function
function addCourse(e) {
    e.preventDefault();
    const code = document.getElementById('courseCode').value;
    const subject = document.getElementById('courseSubject').value;
    const description = document.getElementById('courseDescription').value;
    const instructor = document.getElementById('courseInstructor').value;
    const schedule = document.getElementById('courseSchedule').value;

    if (code && subject && description && instructor && schedule) {
        const newCourse = {
            id: code,
            subject,
            description,
            instructor,
            schedule,
            program: 'BSIT' // Default to BSIT or adjust as needed
        };
        courses.push(newCourse);
        localStorage.setItem('courses', JSON.stringify(courses));
        alert('Course added successfully!');
        document.getElementById('addCourseForm').reset();
        showSection('courses'); // Refresh the courses section
    } else {
        alert('All fields are required');
    }
}

// Filter courses function
function filterCourses() {
    const filterBy = document.getElementById('filterCourses').value;
    const filteredCourses = filterBy === 'all' ? courses : courses.filter(course => course.program === filterBy);

    const tbody = document.getElementById('coursesTableBody');
    tbody.innerHTML = filteredCourses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.subject}</td>
            <td>${course.description}</td>
            <td>${course.instructor}</td>
            <td>${course.schedule}</td>
        </tr>
    `).join('');
}

// Post announcement
function postAnnouncement(e) {
    e.preventDefault();
    const courseId = document.getElementById('courseSelect').value;
    const title = document.getElementById('announcementTitle').value;
    const message = document.getElementById('announcementMessage').value;

    const newAnnouncement = {
        id: announcements.length + 1,
        courseId,
        title,
        message,
        date: new Date().toISOString()
    };

    announcements.push(newAnnouncement);
    localStorage.setItem('announcements', JSON.stringify(announcements));

    // Show success toast
    const toastElement = document.getElementById('announcementToast');
    if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    } else {
        alert('Announcement posted successfully!');
    }

    // Clear form
    document.getElementById('announcementForm').reset();

    // Refresh the announcements section after a short delay
    setTimeout(() => {
        showSection('announcements');
    }, 1000);
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

// Admin functions for managing users
function addUser() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    const role = prompt('Enter role (student, instructor, admin, coordinator, cashier):');

    if (username && password && role) {
        if (users.find(u => u.username === username)) {
            alert('Username already exists');
            return;
        }
        if (!isPasswordStrong(password)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }
        const newUser = { id: users.length + 1, username, password, role, status: 'pending' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User added successfully');
        showSection('users'); // Refresh the users section
    } else {
        alert('All fields are required');
    }
}

function editUser(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        const newUsername = prompt('Enter new username:', user.username);
        const newPassword = prompt('Enter new password:', user.password);
        const newRole = prompt('Enter new role:', user.role);

        if (newUsername && newPassword && newRole) {
            user.username = newUsername;
            user.password = newPassword;
            user.role = newRole;
            localStorage.setItem('users', JSON.stringify(users));
            alert('User updated successfully');
            showSection('users'); // Refresh the users section
        } else {
            alert('All fields are required');
        }
    }
}

function deleteUser(username) {
    if (confirm(`Are you sure you want to delete user: ${username}?`)) {
        users = users.filter(u => u.username !== username);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User deleted successfully');
        showSection('users'); // Refresh the users section
    }
}

// Approve pending user
function approveUser(username) {
    const user = users.find(u => u.username === username);
    if (user && user.status === 'pending') {
        user.status = 'active';
        localStorage.setItem('users', JSON.stringify(users));
        alert('User approved successfully');
        showSection('users');
    }
}

function generateReport(type) {
    const reportContent = document.getElementById('reportContent');
    let content = '';

    switch (type) {
        case 'user':
            const totalUsers = users.length;

            // User Breakdown by Role
            const roleCounts = {};
            users.forEach(user => {
                roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
            });
            const students = roleCounts['student'] || 0;
            const instructors = roleCounts['instructor'] || 0;
            const coordinators = roleCounts['coordinator'] || 0;
            const admins = roleCounts['admin'] || 0;

            // Account Status Breakdown
            const statusCounts = {};
            users.forEach(user => {
                statusCounts[user.status] = (statusCounts[user.status] || 0) + 1;
            });
            const active = statusCounts['active'] || 0;
            const inactiveStatus = statusCounts['inactive'] || 0;
            const pending = statusCounts['pending'] || 0;

            // Last Login/Active Users (> 30 Days Inactive)
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const inactiveUsers = users.filter(user => new Date(user.lastLogin) < thirtyDaysAgo);

            content = `
                <h3> User Activity</h3>
                <p>Provided for essential oversight and security auditing.</p>
                <h4> 1. User Breakdown by Role</h4>
                <p>(Immediate snapshot of system composition.)</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Count</th>
                            <th>Percentage of Total Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Students</td>
                            <td>${students}</td>
                            <td>${((students / totalUsers) * 100).toFixed(1)}%</td>
                        </tr>
                        <tr>
                            <td>Instructors</td>
                            <td>${instructors}</td>
                            <td>${((instructors / totalUsers) * 100).toFixed(1)}%</td>
                        </tr>
                        <tr>
                            <td>Program Coordinators</td>
                            <td>${coordinators}</td>
                            <td>${((coordinators / totalUsers) * 100).toFixed(1)}%</td>
                        </tr>
                        <tr>
                            <td>Administrators</td>
                            <td>${admins}</td>
                            <td>${((admins / totalUsers) * 100).toFixed(1)}%</td>
                        </tr>
                        <tr>
                            <td><strong>TOTAL USERS</strong></td>
                            <td><strong>${totalUsers}</strong></td>
                            <td><strong>100%</strong></td>
                        </tr>
                    </tbody>
                </table>
                <h4> 2. Account Status Breakdown</h4>
                <p>(Visualizing accounts needing attention, typically shown as a donut or pie chart on the web.)</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Count</th>
                            <th>Actionable Insight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Active</td>
                            <td>${active}</td>
                            <td>These accounts have full access.</td>
                        </tr>
                        <tr>
                            <td>Inactive</td>
                            <td>${inactiveStatus}</td>
                            <td>Review for potential deactivation or deletion.</td>
                        </tr>
                        <tr>
                            <td>Pending Approval</td>
                            <td>${pending}</td>
                            <td>Requires immediate Admin review/action to grant access.</td>
                        </tr>
                    </tbody>
                </table>
                <h4>3. Last Login/Active Users (> 30 Days Inactive)</h4>
                <p>(Security Audit Focus: Users flagged for potential account cleanup.)</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>👤 User Name</th>
                            <th>🆔 User ID</th>
                            <th>📜 Role</th>
                            <th>🗓 Last Login Date</th>
                            <th>Inactivity (Days)</th>
                            <th>✏️ Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${inactiveUsers.map(user => {
                            const lastLoginDate = new Date(user.lastLogin);
                            const daysInactive = Math.floor((Date.now() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));
                            const action = daysInactive > 50 ? '[Deactivate Account]' : daysInactive > 40 ? '[Follow Up Directly]' : '[Send Reminder]';
                            return `
                                <tr>
                                    <td>${user.username}</td>
                                    <td>${user.id}</td>
                                    <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                    <td>${lastLoginDate.toLocaleDateString()}</td>
                                    <td>${daysInactive}</td>
                                    <td>${action}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
            break;
        case 'course':
            const totalCourses = courses.length;

            // Breakdown by Program
            const programCounts = {};
            courses.forEach(course => {
                programCounts[course.program] = (programCounts[course.program] || 0) + 1;
            });

            // Instructor Assignments
            const instructorCounts = {};
            courses.forEach(course => {
                instructorCounts[course.instructor] = (instructorCounts[course.instructor] || 0) + 1;
            });

            // Enrollment Counts (assuming enrollments array)
            const courseEnrollments = {};
            enrollments.forEach(enrollment => {
                courseEnrollments[enrollment.courseId] = (courseEnrollments[enrollment.courseId] || 0) + 1;
            });

            content = `
                <h3>📚 Course Report</h3>
                <p>Comprehensive overview of academic offerings and enrollment data.</p>
                <h4>🏫 1. Breakdown of Courses by Program</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Program</th>
                            <th>Total Courses</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(programCounts).map(([program, count]) => `
                            <tr>
                                <td>${program}</td>
                                <td>${count}</td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td><strong>TOTAL COURSES</strong></td>
                            <td><strong>${totalCourses}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <h4>👨‍🏫 2. Instructor Assignments</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Instructor</th>
                            <th>Courses Assigned</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(instructorCounts).map(([instructor, count]) => `
                            <tr>
                                <td>${instructor}</td>
                                <td>${count}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h4>📅 3. Course Schedules and Enrollments</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Subject</th>
                            <th>Instructor</th>
                            <th>Schedule</th>
                            <th>Enrolled Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${courses.map(course => `
                            <tr>
                                <td>${course.id}</td>
                                <td>${course.subject}</td>
                                <td>${course.instructor}</td>
                                <td>${course.schedule}</td>
                                <td>${courseEnrollments[course.id] || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
        case 'submission':
            const totalSubmissions = submissions.length;

            // Breakdown by course
            const courseSubmissions = {};
            submissions.forEach(sub => {
                const module = modules.find(m => m.id === sub.moduleId);
                if (module) {
                    const course = courses.find(c => c.id === module.courseId);
                    if (course) {
                        courseSubmissions[course.subject] = (courseSubmissions[course.subject] || 0) + 1;
                    }
                }
            });

            // Breakdown by student
            const studentSubmissions = {};
            submissions.forEach(sub => {
                const student = users.find(u => u.id === sub.studentId);
                if (student) {
                    studentSubmissions[student.username] = (studentSubmissions[student.username] || 0) + 1;
                }
            });

            // Grade distribution
            let passing = 0, failing = 0, averageGrade = 0, totalScore = 0, totalPossible = 0;
            submissions.forEach(sub => {
                const gradeParts = sub.grade.split('/');
                if (gradeParts.length === 2) {
                    const score = parseFloat(gradeParts[0]);
                    const total = parseFloat(gradeParts[1]);
                    totalScore += score;
                    totalPossible += total;
                    if (score / total >= 0.6) passing++; else failing++;
                    averageGrade += score / total;
                }
            });
            averageGrade = submissions.length > 0 ? (averageGrade / submissions.length * 100).toFixed(1) : 0;
            const overallAverage = totalPossible > 0 ? ((totalScore / totalPossible) * 100).toFixed(1) : 0;
            const passRate = submissions.length > 0 ? ((passing / submissions.length) * 100).toFixed(1) : 0;

            // Submission status (assuming all are submitted)
            const submitted = totalSubmissions;

            // Timestamps (data not available, placeholder)
            const submissionDates = 'Data not available';

            // Feedback provided
            const withFeedback = submissions.filter(sub => sub.feedback).length;

            // Dummy calculations
            const completionRate = ((submitted / (users.filter(u => u.role === 'student').length * modules.length)) * 100).toFixed(1);
            const averageFeedbackLength = withFeedback > 0 ? submissions.filter(sub => sub.feedback).reduce((sum, sub) => sum + sub.feedback.length, 0) / withFeedback : 0;

            content = `
                <h3>📝 Submission Report</h3>
                <p>Overview of student submissions and performance.</p>
                <h4>1. Total Submissions</h4>
                <p><strong>${totalSubmissions}</strong></p>
                <h4>2. Breakdown by Course</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(courseSubmissions).map(([course, count]) => `
                            <tr>
                                <td>${course}</td>
                                <td>${count}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h4>3. Breakdown by Student</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(studentSubmissions).map(([student, count]) => `
                            <tr>
                                <td>${student}</td>
                                <td>${count}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h4>4. Grade Distribution</h4>
                <p>Passing: ${passing}, Failing: ${failing}, Average Grade: ${averageGrade}%</p>
                <h4>5. Submission Status</h4>
                <p>Submitted: ${submitted}</p>
                <h4>6. Timestamps</h4>
                <p>Submission Dates: ${submissionDates}</p>
                <h4>7. Feedback Provided</h4>
                <p>Submissions with Feedback: ${withFeedback}</p>
            `;
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
            <td>${user.status}</td>
            <td>
                ${user.status === 'pending' ? `<button class="btn btn-success btn-sm" onclick="approveUser('${user.username}')">Approve</button>` : ''}
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

// Pay fee function
function payFee(feeId) {
    const fee = fees.find(f => f.id === feeId);
    if (fee) {
        alert(`Payment of ₱${fee.amount} for "${fee.description}" processed successfully!`);
    }
}

// Pay total fee function
function payTotalFee() {
    // Calculate total fee from the fees array
    const totalFee = fees.reduce((sum, fee) => sum + fee.amount, 0);
    alert(`Payment of ₱${totalFee} for all fees processed successfully!`);
}

// Show register form
function showRegisterForm() {
    const formContainer = document.getElementById('formContainer');
    if (!formContainer) return;
    formContainer.innerHTML = `
        <form id="registerForm">
            <div class="mb-3">
                <label for="regUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="regUsername" required>
            </div>
            <div class="mb-3">
                <label for="regPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="regPassword" required>
            </div>
            <div class="mb-3">
                <label for="regRole" class="form-label">Role</label>
                <select class="form-select" id="regRole" required>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrator</option>
                    <option value="coordinator">Program Coordinator</option>
                </select>
            </div>
            <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
        <p class="text-center mt-3">Already have an account? <a href="#" onclick="showLoginForm()">Login here</a></p>
    `;
    document.getElementById('registerForm').addEventListener('submit', registerUser);
}

// Show login form
function showLoginForm() {
    const formContainer = document.getElementById('formContainer');
    if (!formContainer) return;
    formContainer.innerHTML = `
        <form id="loginForm">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role" required>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrator</option>
                    <option value="coordinator">Program Coordinator</option>
                    <option value="cashier">Cashier</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p class="text-center mt-3">Don't have an account? <a href="#" onclick="showRegisterForm()">Register here</a></p>
    `;
    document.getElementById('loginForm').addEventListener('submit', loginHandler);
}

// Initialize login form on load
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        loadDashboard(user.role);
    } else {
        // Add event listener to the static login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', loginHandler);
        }
    }
};

// Register user
function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    // Enforce password strength
    if (!isPasswordStrong(password)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
        return;
    }

    // Add new user with incremental ID and pending status
    const newUser = { id: users.length + 1, username, password, role, status: 'pending' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Your account is pending approval. Please contact an administrator.');
    showLoginForm();
}


