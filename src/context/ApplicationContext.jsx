import React, { createContext, useState, useContext, useEffect } from 'react';
import { DataHydrationService } from '../common/utils/DataHydrationService';

export const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

const ApplicationContext = createContext();

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    return DataHydrationService.shouldHydrate()
      ? DataHydrationService.getInitialApplications()
      : [];
  });
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 });

  useEffect(() => {
    const counts = STATUSES.reduce((acc, status) => {
      acc[status] = applications.filter((app) => app.status === status).length;
      return acc;
    }, {});
    setStats({ total: applications.length, ...counts });
  }, [applications]);

  const addApplication = (application) => {
    const id = Math.floor(Math.random() * 1000000) + 1;
    const newApplication = {
      id,
      company: '',
      role: '',
      status: 'Applied',
      dateApplied: new Date().toISOString().slice(0, 10),
      url: '',
      notes: '',
      tags: [],
      ...application,
    };
    setApplications([...applications, newApplication]);
    return newApplication;
  };

  const updateApplication = (id, updates) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const updateStatus = (id, status) => {
    updateApplication(id, { status });
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const updateApplicationsWithEditedTag = (oldTag, newTag) => {
    setApplications(
      applications.map((app) => {
        if (app.tags && app.tags.includes(oldTag)) {
          return { ...app, tags: app.tags.map((tag) => (tag === oldTag ? newTag : tag)) };
        }
        return app;
      })
    );
  };

  const updateApplicationsWithDeletedTag = (tagToDelete) => {
    setApplications(
      applications.map((app) => {
        if (app.tags && app.tags.includes(tagToDelete)) {
          return { ...app, tags: app.tags.filter((tag) => tag !== tagToDelete) };
        }
        return app;
      })
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        stats,
        addApplication,
        updateApplication,
        updateStatus,
        deleteApplication,
        updateApplicationsWithEditedTag,
        updateApplicationsWithDeletedTag,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
