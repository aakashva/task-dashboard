# Job Application Tracker - Copilot Instructions

## Project Overview
This is a React-based job application tracker that lets users log job applications and follow them through a Kanban-style status board (Applied, Interviewing, Offer, Rejected), with tags for organizing and filtering. The application is built using React, Framer Motion for animations, and Tailwind CSS for styling. It uses Vite as the build tool and Vitest for testing.

## Code Standards

### Required Before Commit
- All tests must pass: `npm test`
- Code must follow JSX and React best practices
- Ensure proper component structure and separation of concerns
- Verify that new components follow established patterns and include tests
- Check for accessibility issues in UI components

### React Patterns
- Follow functional component patterns with React Hooks
- Use context providers for state management (ApplicationContext, TagContext)
- Follow component composition principles
- Use proper data-testid attributes for testability
- Apply proper prop types validation when needed
- Keep components focused on a single responsibility
- Use descriptive variable and function names

### CSS/Styling Standards
- Use Tailwind CSS utility classes for styling
- Follow the established color scheme defined in tailwind.config.js
- Use consistent spacing and sizing patterns
- Ensure responsive design works across different screen sizes

## Development Flow

- Install dependencies: `npm install`
- Start development server: `npm start`
- Run tests: `npm test`
- Build for production: `npm run build`

## Repository Structure
- `/src`: Main application source code
  - `/context`: React context providers for state management
  - `/features`: Feature-based organization of components
    - `/applications`: Job application and Kanban board components
    - `/tags`: Tag management components
  - `/common`: Common/shared components and utilities
- `/public`: Static assets and HTML template
- Configuration files:
  - `vite.config.js`: Vite configuration
  - `tailwind.config.js`: Tailwind CSS configuration
  - `vitest.config.js`: Vitest test runner configuration

## Key Guidelines

1. **Component Architecture**:
   - Components should be organized by feature in the features directory
   - Each component should have a single responsibility
   - Use composition over inheritance
   - Keep components reasonably sized and focused

2. **State Management**:
   - Use the established context providers:
     - `ApplicationContext` for job application state and operations (add, update status, delete)
     - `TagContext` for tag management
   - Follow the pattern of providing actions through context

3. **UI/UX Standards**:
   - Use Framer Motion for animations to maintain consistency
   - Follow the established design patterns for components
   - Ensure proper accessibility attributes are included
   - Use the defined color palette from the Tailwind configuration

4. **Testing**:
   - Write tests for all components using Vitest and React Testing Library
   - Mock dependencies appropriately in tests
   - Test both component rendering and user interactions
   - Use data-testid attributes for targeting elements in tests

5. **Documentation**:
   - Include JSDoc comments for complex functions
   - Document props for components when they're not self-explanatory
   - Add meaningful comments for complex logic
   - Document context providers' purpose and available values/actions

6. **Performance Considerations**:
   - Use React.memo for components that render frequently
   - Be mindful of unnecessary re-renders
   - Keep animations performant by using hardware-accelerated properties