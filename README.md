# Post Pulse: A Dynamic Blog Post Management System

Post Pulse is a modern web application that provides an intuitive interface for managing blog posts. It offers a streamlined experience for creating, viewing, editing, and deleting blog posts with real-time updates and a responsive design.

The application features a clean, two-panel layout with a sidebar for post management and a main content area for detailed post viewing and editing. Built entirely with vanilla JavaScript, HTML, and CSS, Post Pulse delivers a smooth user experience with instant feedback and dynamic content updates. The system includes features like post counting, detailed post views, and a responsive layout that adapts to different screen sizes.

## Repository Structure

```
.
├── css/
│   └── styles.css          # Main stylesheet with responsive design and modern UI components
├── index.html              # Main entry point and UI structure
└── src/
    ├── db.json             # Development/source data store
    └── index.js            # Core application logic and event handlers
```

## Usage Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Local development server (e.g., Live Server VS Code extension or any JS-based server)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd post-pulse
```

2. Start a local development server:

- **Using VS Code:**

  - Install the "Live Server" extension
  - Open the project folder in VS Code
  - Right-click on `index.html` and select **"Open with Live Server"**

- **Using any JavaScript-based dev server (like **``**):**

```bash
# Install http-server globally if you haven't
npm install -g http-server

# Start server in the project root
http-server -c-1
```

3. Open your browser and navigate to:

```
http://localhost:8080
```

### Quick Start

1. Open the application in your browser
2. **Create a new post:**
   - Fill out the form in the sidebar with title, content, and author
   - Click "Add Post" to create the post
3. **View posts:**
   - Click on any post in the sidebar to view its details
4. **Edit a post:**
   - Click the "Edit" button while viewing a post
   - Update the fields in the form
   - Click "Save" to confirm changes
5. **Delete a post:**
   - Click the "Delete" button while viewing a post


### Troubleshooting

#### Common Issues

1. **Posts not displaying**

   - Ensure `db.json` is correctly formatted
   - Confirm that the local server is running
   - Check your browser console for JavaScript errors

2. **Styles not loading**

   - Verify the `styles.css` path is correct in `index.html`
   - Clear your browser cache
   - Open the developer console and check for 404 errors

#### Debugging

- Press `F12` to open Developer Tools
- Go to the **Console** tab to check for JavaScript errors
- Use the **Network** tab to check for missing files or failed requests
- Ensure all project files are being served by your dev server

## Data Flow

Post Pulse uses a straightforward client-side data flow to manage blog posts. All data is stored in JSON and handled via JavaScript, with dynamic updates in the UI.

```ascii
[User Input] -> [Form Validation] -> [Data Storage]
                                          |
[UI Update] <- [Event Handlers] <- [Data Retrieval]
```

### Component Interactions:

1. User inputs data via the HTML forms
2. Input is validated before it's processed
3. Data is saved in `db.json`
4. Event listeners trigger UI re-renders
5. The post list auto-updates on add/edit/delete
6. Post details are dynamically loaded in the main view
7. All interactions are handled via JavaScript event delegation
# Phase-1-Code-Challenge-Simple-Blog-Post-Manager
