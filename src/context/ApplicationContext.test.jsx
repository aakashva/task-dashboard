import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ApplicationProvider, useApplicationContext } from './ApplicationContext';

function wrapper({ children }) {
  return <ApplicationProvider>{children}</ApplicationProvider>;
}

describe('ApplicationContext', () => {
  test('starts with no applications', () => {
    const { result } = renderHook(() => useApplicationContext(), { wrapper });
    expect(result.current.applications).toEqual([]);
    expect(result.current.stats.total).toBe(0);
  });

  test('addApplication adds a new application with defaults', () => {
    const { result } = renderHook(() => useApplicationContext(), { wrapper });

    act(() => {
      result.current.addApplication({ company: 'Acme Corp', role: 'Engineer' });
    });

    expect(result.current.applications).toHaveLength(1);
    expect(result.current.applications[0]).toMatchObject({
      company: 'Acme Corp',
      role: 'Engineer',
      status: 'Applied',
    });
    expect(result.current.stats.total).toBe(1);
    expect(result.current.stats.Applied).toBe(1);
  });

  test('updateStatus changes an application status', () => {
    const { result } = renderHook(() => useApplicationContext(), { wrapper });

    let added;
    act(() => {
      added = result.current.addApplication({ company: 'Acme Corp', role: 'Engineer' });
    });

    act(() => {
      result.current.updateStatus(added.id, 'Offer');
    });

    expect(result.current.applications[0].status).toBe('Offer');
    expect(result.current.stats.Offer).toBe(1);
    expect(result.current.stats.Applied).toBe(0);
  });

  test('deleteApplication removes an application', () => {
    const { result } = renderHook(() => useApplicationContext(), { wrapper });

    let added;
    act(() => {
      added = result.current.addApplication({ company: 'Acme Corp', role: 'Engineer' });
    });

    act(() => {
      result.current.deleteApplication(added.id);
    });

    expect(result.current.applications).toHaveLength(0);
  });
});
