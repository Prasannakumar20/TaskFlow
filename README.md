
# TaskFlow - Modern Task Management Application

TaskFlow is a comprehensive task management application built with modern web technologies, featuring real-time collaboration, smart notifications, and an intuitive user interface.

## 🚀 Features

- **User Authentication**: Secure login with Google OAuth and email/password
- **Real-time Task Management**: Create, edit, delete, and organize tasks with live updates
- **Smart Notifications**: Bell icon notifications for upcoming deadlines and overdue tasks
- **Calendar Integration**: Calendar view to visualize tasks by due dates
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Task Prioritization**: High, Medium, Low priority levels with color coding
- **Status Tracking**: Todo, In Progress, Completed status management
- **Task Sharing**: Share tasks with team members via email
- **Tag System**: Organize tasks with custom tags
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - High-quality component library built on Radix UI
- **Lucide React** - Beautiful & consistent icon library

### Backend & Authentication
- **Firebase Authentication** - Secure user authentication system
- **Cloud Firestore** - NoSQL real-time database for task storage
- **Firebase Hosting** - Static web hosting platform

### State Management & Utilities
- **React Context API** - Global state management for auth and theme
- **TanStack Query** - Data fetching and caching library
- **React Router DOM** - Client-side routing
- **date-fns** - Modern JavaScript date utility library
- **Sonner** - Toast notification system

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project with Authentication and Firestore enabled

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Google and Email/Password providers)
   - Enable Cloud Firestore database
   - Copy your Firebase configuration to `src/lib/firebase.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AuthDialog.tsx   # Authentication modal
│   ├── CalendarView.tsx # Calendar integration
│   ├── Header.tsx       # Main navigation header
│   ├── NotificationPopover.tsx # Task notifications
│   ├── TaskBoard.tsx    # Kanban-style task board
│   ├── TaskCard.tsx     # Individual task display
│   └── TaskForm.tsx     # Task creation/editing form
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
├── lib/                 # Utility libraries
│   ├── firebase.ts      # Firebase configuration
│   └── utils.ts         # Helper functions
├── pages/               # Application pages
│   ├── Index.tsx        # Main dashboard
│   └── NotFound.tsx     # 404 error page
└── hooks/               # Custom React hooks
```

## 🎯 Key Assumptions Made

1. **User Workflow**: Assumed users primarily work in a Kanban-style board view for task management
2. **Notification Strategy**: Implemented proactive notifications for tasks due within 3 days
3. **Sharing Mechanism**: Tasks can be shared via email addresses (assumes email-based collaboration)
4. **Data Persistence**: All user data is stored in Firebase Firestore for real-time synchronization
5. **Authentication Method**: Prioritized Google OAuth for ease of use, with email/password as backup
6. **Responsive Design**: Assumed mobile-first approach with desktop enhancement
7. **Task Categories**: Implemented priority-based categorization (High, Medium, Low) rather than project-based

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    TaskFlow Architecture                     │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + TypeScript + Vite)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Components    │  │    Contexts     │  │    Hooks     │ │
│  │  - TaskBoard    │  │  - AuthContext  │  │  - useTasks  │ │
│  │  - TaskCard     │  │  - ThemeContext │  │  - useAuth   │ │
│  │  - Header       │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                              │                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            State Management Layer                       │ │
│  │         TanStack Query + React Context                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                              │                              │
├─────────────────────────────────────────────────────────────┤
│  Backend Services (Firebase)                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Authentication │  │   Cloud Store   │  │   Hosting    │ │
│  │  - Google OAuth │  │  - Real-time DB │  │  - Static    │ │
│  │  - Email/Pass   │  │  - Collections  │  │    Files     │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🎥 Demo Video

[Loom Demo Video] : ([https://your-loom-video-link-here](https://drive.google.com/file/d/1VCxrDk2tR7i_VxK4ILyQGsHzTkNrRDnF/view?usp=drive_link))

## 🚀 Deployment

The application is deployed on Firebase Hosting and can be accessed at: [Your Deployment URL]

To deploy your own version:
1. Build the project: `npm run build`
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login to Firebase: `firebase login`
4. Initialize hosting: `firebase init hosting`
5. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for providing robust backend services
- shadcn/ui for the beautiful component library
- Lucide for the comprehensive icon set
- The React and TypeScript communities for excellent documentation

---
## Project: https://cosmic-task-pulse.lovable.app/

**This project is a part of a hackathon run by https://www.katomaran.com**
