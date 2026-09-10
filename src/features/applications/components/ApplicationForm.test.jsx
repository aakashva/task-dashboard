import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ApplicationForm from './ApplicationForm';

const mockAddApplication = vi.fn();
const mockAddTag = vi.fn();

vi.mock('../../../context/ApplicationContext', () => ({
  useApplicationContext: () => ({
    addApplication: mockAddApplication,
  }),
  STATUSES: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
}));

vi.mock('../../../context/TagContext', () => ({
  useTagContext: () => ({
    tags: ['Remote'],
    addTag: mockAddTag,
  }),
}));

describe('ApplicationForm Component', () => {
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockAddApplication.mockClear();
    mockAddTag.mockClear();
    mockOnCancel.mockClear();
  });

  test('renders the form fields', () => {
    render(<ApplicationForm onCancel={mockOnCancel} />);

    expect(screen.getByTestId('company-input')).toBeInTheDocument();
    expect(screen.getByTestId('role-input')).toBeInTheDocument();
    expect(screen.getByTestId('status-select')).toBeInTheDocument();
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
  });

  test('does not submit when company or role is missing', () => {
    render(<ApplicationForm onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByTestId('submit-button'));
    expect(mockAddApplication).not.toHaveBeenCalled();
  });

  test('submits a new application with entered data', () => {
    render(<ApplicationForm onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByTestId('company-input'), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByTestId('role-input'), { target: { value: 'Engineer' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockAddApplication).toHaveBeenCalledWith(
      expect.objectContaining({ company: 'Acme Corp', role: 'Engineer' })
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(<ApplicationForm onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
