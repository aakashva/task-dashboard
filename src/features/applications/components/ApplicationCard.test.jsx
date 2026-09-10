import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ApplicationCard from './ApplicationCard';

const mockUpdateStatus = vi.fn();
const mockDeleteApplication = vi.fn();

vi.mock('../../../context/ApplicationContext', () => ({
  useApplicationContext: () => ({
    updateStatus: mockUpdateStatus,
    deleteApplication: mockDeleteApplication,
  }),
  STATUSES: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
}));

describe('ApplicationCard Component', () => {
  const mockApplication = {
    id: 1,
    company: 'Acme Corp',
    role: 'Frontend Engineer',
    status: 'Applied',
    dateApplied: '2026-01-01',
    url: 'https://example.com/job',
    notes: 'Some notes',
    tags: ['Remote', 'Referral'],
  };

  beforeEach(() => {
    mockUpdateStatus.mockClear();
    mockDeleteApplication.mockClear();
  });

  test('renders application details correctly', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Referral')).toBeInTheDocument();
    expect(screen.getByText('Some notes')).toBeInTheDocument();
  });

  test('calls updateStatus when status select changes', () => {
    render(<ApplicationCard application={mockApplication} />);

    const select = screen.getByTestId(`application-status-select-${mockApplication.id}`);
    fireEvent.change(select, { target: { value: 'Offer' } });

    expect(mockUpdateStatus).toHaveBeenCalledWith(mockApplication.id, 'Offer');
  });

  test('calls deleteApplication when delete button is clicked', () => {
    render(<ApplicationCard application={mockApplication} />);

    fireEvent.click(screen.getByTestId(`delete-application-${mockApplication.id}`));
    expect(mockDeleteApplication).toHaveBeenCalledWith(mockApplication.id);
  });

  test('renders without tags when none provided', () => {
    const applicationWithoutTags = { ...mockApplication, tags: [] };
    render(<ApplicationCard application={applicationWithoutTags} />);

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.queryByTestId(`application-tags-${applicationWithoutTags.id}`)).not.toBeInTheDocument();
  });
});
