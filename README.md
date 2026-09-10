# Job Application Tracker

A job application tracking app that lets you log companies you've applied to, follow their status through a Kanban-style board, and organize them with tags and notes. Built with React.

> **Note:** This application is intended for demonstration purposes only and is not meant for production use.

## Features

- **Application Tracking**: Log company, role, application date, posting URL, and notes for each application
- **Status Board**: Kanban-style columns (Applied, Interviewing, Offer, Rejected) — move an application between stages with a single dropdown
- **Tags**: Organize applications with customizable tags (e.g. Remote, Referral, Priority) and filter the board by tag
- **Stats Summary**: See totals at a glance — how many applications are in each stage
- **Animations**: Smooth transitions and animations using Framer Motion
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React**: Modern React with functional components and hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **Vite**: Fast, modern build tool and development server
- **Vitest**: Testing framework compatible with Vite

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v10+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-dashboard.git
   cd task-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

### Available Scripts

- `npm start` - Start the development server
- `npm start:hydrated` - Start the development server with sample application data
- `npm run build` - Build for production
- `npm run build:hydrated` - Build for production with sample data
- `npm run build:clean` - Build for production with data hydration explicitly disabled
- `npm run preview` - Preview the production build locally
- `npm run preview:hydrated` - Preview the production build with sample data
- `npm test` - Run tests with Vitest

### Data Hydration

The application supports pre-populating the app with sample applications through an optional hydration process:

- Sample data is defined in `src/data/initialData.json`
- Hydration can be enabled/disabled using the `VITE_ENABLE_DATA_HYDRATION` environment variable
- Use the convenience scripts for development with hydration:
  - `npm run start:hydrated` - Development with sample data
  - `npm run build:hydrated` - Production build with sample data
  - `npm run build:clean` - Production build without sample data
- GitHub Actions deployment automatically enables hydration for the production build

Without hydration, the app starts empty and everything you add lives only in memory for that session (there is no backend or persistent storage — this is a demo).

## Architecture

### State Management

The application uses React Context for state management:

- **ApplicationContext**: Manages the list of job applications and their status (add, update, delete, move between stages)
- **TagContext**: Manages tags and their relationships with applications

### UI Components

- **KanbanBoard**: Renders the status columns and tag filters
- **ApplicationCard**: Renders an individual application with its status selector
- **ApplicationForm**: Form for logging a new application
- **TagManager**: Interface for creating, renaming, and deleting tags

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
