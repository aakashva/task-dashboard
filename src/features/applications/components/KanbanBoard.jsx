import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useApplicationContext, STATUSES } from '../../../context/ApplicationContext';
import { useTagContext } from '../../../context/TagContext';
import ApplicationCard from './ApplicationCard';
import TagManager from '../../tags/components/TagManager';

const STATUS_STYLES = {
  Applied: 'bg-primary-50 text-primary-700 border-primary-100',
  Interviewing: 'bg-blue-100 text-blue-700 border-blue-200',
  Offer: 'bg-green-100 text-green-700 border-green-200',
  Rejected: 'bg-rose-100 text-rose-700 border-rose-200',
};

function KanbanBoard() {
  const { applications, stats } = useApplicationContext();
  const { tags } = useTagContext();
  const [showTagManager, setShowTagManager] = useState(false);
  const [activeTagFilter, setActiveTagFilter] = useState(null);

  const visibleApplications = activeTagFilter
    ? applications.filter((app) => app.tags && app.tags.includes(activeTagFilter))
    : applications;

  return (
    <div className="kanban-board" data-testid="kanban-board">
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h2 className="font-semibold text-lg text-neutral-700">Applications</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap" data-testid="tag-filter-list">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTagFilter(activeTagFilter === tag ? null : tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTagFilter === tag
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  data-testid={`tag-filter-${tag}`}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
              {activeTagFilter && (
                <button
                  type="button"
                  onClick={() => setActiveTagFilter(null)}
                  className="p-1 text-neutral-400 hover:text-neutral-600"
                  data-testid="clear-tag-filter"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <button
            type="button"
            className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors px-3 py-1.5 hover:bg-primary-50 rounded-lg"
            onClick={() => setShowTagManager(true)}
            data-testid="manage-tags-button"
          >
            <TagIcon className="h-4 w-4 mr-2" />
            Manage Tags
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTagManager && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTagManager(false)}
            data-testid="tag-manager-modal"
          >
            <motion.div
              className="p-1 rounded-xl max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TagManager onClose={() => setShowTagManager(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="kanban-columns">
        {STATUSES.map((status) => {
          const columnApplications = visibleApplications.filter((app) => app.status === status);

          return (
            <div
              key={status}
              className="kanban-column bg-white rounded-xl shadow-soft flex flex-col"
              data-testid={`kanban-column-${status}`}
            >
              <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border ${STATUS_STYLES[status]}`}>
                  {status}
                </span>
                <span
                  className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-xs"
                  data-testid={`column-count-${status}`}
                >
                  {stats[status] ?? 0}
                </span>
              </div>

              <div className="p-4 grow overflow-y-auto max-h-[65vh] flex flex-col gap-2">
                <AnimatePresence>
                  {columnApplications.length > 0 ? (
                    columnApplications.map((application) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        data-testid={`application-card-container-${application.id}`}
                      >
                        <ApplicationCard application={application} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-neutral-400 py-4 text-sm"
                      data-testid={`empty-column-message-${status}`}
                    >
                      No applications here
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanbanBoard;
