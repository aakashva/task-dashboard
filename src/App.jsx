import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

import { ApplicationProvider, useApplicationContext } from './context/ApplicationContext';
import { TagProvider } from './context/TagContext';

import ApplicationForm from './features/applications/components/ApplicationForm';
import KanbanBoard from './features/applications/components/KanbanBoard';

function StatsSummary() {
  const { stats } = useApplicationContext();

  const items = [
    { label: 'Total', value: stats.total, className: 'bg-neutral-100 text-neutral-700' },
    { label: 'Applied', value: stats.Applied, className: 'bg-primary-50 text-primary-700' },
    { label: 'Interviewing', value: stats.Interviewing, className: 'bg-blue-100 text-blue-700' },
    { label: 'Offer', value: stats.Offer, className: 'bg-green-100 text-green-700' },
    { label: 'Rejected', value: stats.Rejected, className: 'bg-rose-100 text-rose-700' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6" data-testid="stats-summary">
      {items.map((item) => (
        <div
          key={item.label}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${item.className}`}
          data-testid={`stat-${item.label.toLowerCase()}`}
        >
          {item.label}: {item.value}
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col items-center py-12 px-4" data-testid="app">
      <div className="w-full max-w-6xl">
        <motion.div
          className="mb-6 bg-white rounded-2xl shadow-soft p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="app-header"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">Job Application Tracker</h1>
          </div>

          <StatsSummary />

          <AnimatePresence>
            {showForm ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                data-testid="application-form-container"
              >
                <ApplicationForm onCancel={() => setShowForm(false)} />
              </motion.div>
            ) : (
              <motion.button
                className="flex items-center justify-center w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
                onClick={() => setShowForm(true)}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-testid="show-application-form-button"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Application
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <KanbanBoard />
      </div>
    </div>
  );
}

function App() {
  return (
    <ApplicationProvider>
      <TagProvider>
        <AppContent />
      </TagProvider>
    </ApplicationProvider>
  );
}

export default App;
