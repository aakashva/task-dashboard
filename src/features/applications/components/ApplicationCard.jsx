import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, TagIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useApplicationContext, STATUSES } from '../../../context/ApplicationContext';

function ApplicationCard({ application }) {
  const { updateStatus, deleteApplication } = useApplicationContext();

  return (
    <div
      className="application-card rounded-xl border border-neutral-100 hover:border-primary-100 bg-white hover:bg-primary-50/30 p-4 shadow-xs hover:shadow-md transition-all duration-200"
      data-testid={`application-card-${application.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-neutral-800" data-testid={`application-company-${application.id}`}>
            {application.company}
          </p>
          <p className="text-sm text-neutral-600" data-testid={`application-role-${application.id}`}>
            {application.role}
          </p>
        </div>
        <motion.button
          className="p-2 rounded-full bg-transparent text-neutral-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
          onClick={() => deleteApplication(application.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid={`delete-application-${application.id}`}
        >
          <TrashIcon className="h-4 w-4" />
        </motion.button>
      </div>

      {application.dateApplied && (
        <p className="text-xs text-neutral-500 mt-1" data-testid={`application-date-${application.id}`}>
          Applied {application.dateApplied}
        </p>
      )}

      {application.url && (
        <a
          href={application.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-primary-600 hover:text-primary-800 mt-1"
          data-testid={`application-url-${application.id}`}
        >
          <LinkIcon className="h-3 w-3 mr-1" />
          View posting
        </a>
      )}

      {application.notes && (
        <p className="text-sm text-neutral-600 mt-2" data-testid={`application-notes-${application.id}`}>
          {application.notes}
        </p>
      )}

      {application.tags && application.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1" data-testid={`application-tags-${application.id}`}>
          {application.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <select
          value={application.status}
          onChange={(e) => updateStatus(application.id, e.target.value)}
          className="w-full py-1.5 px-2 text-sm text-neutral-700 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 outline-hidden transition-all"
          data-testid={`application-status-select-${application.id}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ApplicationCard;
