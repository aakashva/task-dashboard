import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import KanbanBoard from './KanbanBoard';

const mockApplications = [
  { id: 1, company: 'Acme Corp', role: 'Engineer', status: 'Applied', tags: ['Remote'] },
  { id: 2, company: 'Globex Inc', role: 'Designer', status: 'Interviewing', tags: [] },
];

vi.mock('../../../context/ApplicationContext', () => ({
  useApplicationContext: () => ({
    applications: mockApplications,
    stats: { total: 2, Applied: 1, Interviewing: 1, Offer: 0, Rejected: 0 },
    updateStatus: vi.fn(),
    deleteApplication: vi.fn(),
  }),
  STATUSES: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
}));

vi.mock('../../../context/TagContext', () => ({
  useTagContext: () => ({
    tags: ['Remote'],
  }),
}));

describe('KanbanBoard Component', () => {
  test('renders a column for each status', () => {
    render(<KanbanBoard />);

    expect(screen.getByTestId('kanban-column-Applied')).toBeInTheDocument();
    expect(screen.getByTestId('kanban-column-Interviewing')).toBeInTheDocument();
    expect(screen.getByTestId('kanban-column-Offer')).toBeInTheDocument();
    expect(screen.getByTestId('kanban-column-Rejected')).toBeInTheDocument();
  });

  test('places applications in the correct column', () => {
    render(<KanbanBoard />);

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Globex Inc')).toBeInTheDocument();
  });

  test('filters applications by tag', () => {
    render(<KanbanBoard />);

    fireEvent.click(screen.getByTestId('tag-filter-Remote'));

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.queryByText('Globex Inc')).not.toBeInTheDocument();
  });

  test('opens the tag manager modal', () => {
    render(<KanbanBoard />);

    fireEvent.click(screen.getByTestId('manage-tags-button'));
    expect(screen.getByTestId('tag-manager-modal')).toBeInTheDocument();
  });
});
