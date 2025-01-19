# *YSYNC* - Application Management Platform for YSES Trainees

# Introduction

### YSYNC
is a **web-based application** designed to streamline the application process experience for Young Software Engineers' Society (YSES) trainees. It facilitates communication, collaboration, and information access among trainees, mentors (resident members), and administrators. YSYNC ensures that all stakeholders have easy access to important updates, events, and resources throughout the training process.

# Screenshots

## TRAINEE’S VIEW

### START PAGE  
![Screenshot 2025-01-18 at 12-01-44 YSYNC](https://github.com/user-attachments/assets/095e4ea9-03b0-42c8-b46f-d275fb397609)


### LOG-IN PAGE  

![Screenshot 2025-01-18 at 12-03-16 YSYNC](https://github.com/user-attachments/assets/63af3997-ce86-4eba-981c-4a2e74f6eeae)


### DASHBOARD 

![Screenshot 2025-01-18 at 16-00-21 YSYNC](https://github.com/user-attachments/assets/4196955f-4a32-4748-a4b0-21bf5f8f76ab)


### DASHBOARD CHAT  
![Screenshot 2025-01-18 at 16-01-54 YSYNC](https://github.com/user-attachments/assets/326eddcb-93dc-4566-b4b9-c4e25768b5a8)


### MENTORS PAGE

![Screenshot 2025-01-18 at 12-07-32 YSYNC](https://github.com/user-attachments/assets/92f7ce52-12bd-43cf-835c-be578c61d230)

### RESIDENT MEMBERS PAGE

![Screenshot 2025-01-18 at 12-08-30 YSYNC](https://github.com/user-attachments/assets/99fda568-f311-4c9a-9e76-501d4f482c25)

## RESIDENT MEMBER’S VIEW  

### DASHBOARD  
![Screenshot 2025-01-18 at 12-10-51 YSYNC](https://github.com/user-attachments/assets/cf2d5b97-d29e-482a-a12f-a383e3a5ea97)

### TRAINEES PAGE  
![Screenshot 2025-01-18 at 12-11-39 YSYNC](https://github.com/user-attachments/assets/60c13e8e-d328-4c99-99b9-04eb41c5db32)

## ADMIN’S VIEW

### Account Information

![Screenshot 2025-01-18 at 12-12-42 YSYNC](https://github.com/user-attachments/assets/bb6cf291-8edd-4091-8aba-1dfeb6f4ddb3)


### Requests
![Screenshot 2025-01-18 at 12-12-59 YSYNC](https://github.com/user-attachments/assets/316626a3-862d-4ef6-b9b0-f260998564a8)


### Reports

![Screenshot 2025-01-18 at 12-13-14 YSYNC](https://github.com/user-attachments/assets/c8327b40-2161-4166-9616-697283a5b2aa)

### GENERAL VIEW

### PROFILE PAGE

![image](https://github.com/user-attachments/assets/d8e96470-e80b-48cf-89ea-e7167c05becf)
![image](https://github.com/user-attachments/assets/8ec66a55-adec-42dd-8b07-ff6e6d5f8c7c)

### REPORT PAGE

![Screenshot 2025-01-18 at 12-09-39 YSYNC](https://github.com/user-attachments/assets/ab2ab56a-4ca9-408b-833a-2b30ed159947)


### DEFER PAGE  
![Screenshot 2025-01-18 at 12-10-17 YSYNC](https://github.com/user-attachments/assets/2bbca146-c933-49fb-b5b1-f2d6bae3115e)

## Key Features

**Dashboard:** Centralized hub for accessing announcements, events, personalized updates, and a real-time chatbox.  
**Mentor Choosing:** Recommendation system to help trainees find mentors based on shared interests and expertise.  
**Resident Members Page:**: Displays all members of the organization (active, inactive, alumni).  
**Admin Controls:** Powerful tools for administrators to manage users, content, and system operations.

## User Types and Their Views

YSYNC supports three primary user types:

### Trainees

- View announcements, updates, and deadlines through the dashboard.
- Communicate with mentors and other trainees using the integrated chatbox within the dashboard.
- Use the "Mentor Choosing" feature to find and connect with suitable mentors.
- Manage their personal profiles and account settings.
- View all members in the "Resident Members Page"

### Resident Members (Mentors)

- Manage announcements, including creating, updating, and deleting.
- Communicate with trainees and other members using the integrated chatbox within the dashboard.
- Update their profile information for mentorship selection.
- View trainee information for mentorship purposes.
- View all members in the "Resident Members Page"

### Administrators

- Full access to manage all user accounts, including creation, editing, and deletion.
- Manage announcements, events, and calendar information.
- Moderate user-generated content within the chatbox.
- Monitor system usage.
- View all members in the "Resident Members Page"

## Key Functionalities

### Dashboard

- Displays pinned, upcoming, and past announcements.
- Calendar integration for visualizing important dates and deadlines.
- Automated email notifications for time-sensitive updates.  
- Real-time communication platform for all users to send and receive messages.

### Mentor Choosing

- Displays detailed mentor profiles with expertise and interests.
- Allows trainees to select tags from a predefined list of interests.
- Recommends the Top 3 Mentors to a trainee.

### Admin Controls

- Manage all user accounts.
- Post, pin, edit, and delete announcements and calendar events.
- Handle application and deferral requests.
- Monitor and moderate user-generated content within the chatbox.

### Resident Members Page  
- Displays all members of the organization (active, inactive, alumni).
- Allows filtering and searching of members. 
- Allows viewing of member profiles.

## Getting Started

### System Requirements

- **Web Browser:** Google Chrome, Mozilla Firefox, Brave, or Microsoft Edge (latest stable versions recommended).
- **Internet Connection:** Stable connection with a minimum speed of 5 Mbps.
- **Operating System:** Windows 10/11 (64-bit), Linux-based distributions (Fedora, Ubuntu, Linux Mint).

### Accessing YSYNC

1.  Navigate to the deployed YSYNC URL: \`https://ysync.example.com\` or \`http://localhost:3000\` for local development.  
2.  Log in using your registered UP email address and password.  
3.  If you don't have an account, click "Sign Up" and provide the necessary details.

## Technology Stack

YSYNC is built using the MERN stack:

\- **Frontend:** ReactJS  
- For building a dynamic and responsive user interface.  
**Backend:** Node.js and Express.js  
- For creating RESTful APIs.  
**Database:** MongoDB  
- To store and manage application data.  
**Authentication:** JSON Web Tokens (JWT)  
- For secure user authentication and role-based access control.

## Design & Implementation

- The application features a modular and reusable component-based architecture.  
- Password hashing (bcrypt) is used to protect user credentials.  
- Role-Based Access Control restricts access to features based on user roles.  
- RESTful APIs facilitate data sharing between the frontend and backend.

## Assumptions and Dependencies

- Users have a basic understanding of web navigation and web application usage.  
- All users have a stable internet connection and a compatible web browser.  
- The hosting environment provides sufficient resources to handle peak user loads.  
- Users have devices that meet the minimum system requirements stated above.  
- Trainees, mentors, and administrators will actively use the platform as their primary tool for communication during the application process.  
- The system is limited by the hardware and software resources available for hosting and development.  
- The mentor choosing feature provides recommendations and is not the final decision-making system.

## Other Key Information

### Security Requirements

- Users will authenticate using their university email.
- Unique session tokens will be generated for logged-in users with role-based access control.  
- Short-lived sessions with auto-renewal ensure data security.  
- All data is encrypted during transmission and in storage.  
- Password hashing using bcrypt ensures secure password management.  

### Business Rules

- Only YSES members and authorized users can register.  
- Content must comply with the established guidelines.  
- Mentor matching is based on user-provided criteria.  
- The system will send notifications about updates, messages, and events.  
- Data is retained based on the organization's data retention policy.

## The Team

- **Project Manager:** Gonzales, Paula Victoria
- **Frontend Manager:** Ocampo, Alessandro Marcus
- **Backend Manager:** Borja, Klenn Jakek

**Developers:**

- Arias, Jacob
- Javier, Myko Jefferson
- Macatangay, Lawrence Joel
- Mejorada, Diego 
- Peña, Justin Dayne Bryant




*Young Software Engineers’ Society (YSES)*
