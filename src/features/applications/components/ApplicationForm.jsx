import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, TagIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useApplicationContext, STATUSES } from '../../../context/ApplicationContext';
import { useTagContext } from '../../../context/TagContext';

function ApplicationForm({ onCancel }) {
  const { addApplication } = useApplicationContext();
  const { tags, addTag } = useTagContext();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [dateApplied, setDateApplied] = useState(() => new Date().toISOString().slice(0, 10));
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const finalTagInput = newTagInput.trim();
    let finalTags = selectedTags;
    if (finalTagInput && !selectedTags.includes(finalTagInput)) {
      if (!tags.includes(finalTagInput)) {
        addTag(finalTagInput);
      }
      finalTags = [...selectedTags, finalTagInput];
    }

    addApplication({
      company: company.trim(),
      role: role.trim(),
      status,
      dateApplied,
      url: url.trim(),
      notes: notes.trim(),
      tags: finalTags,
    });

    setCompany('');
    setRole('');
    setStatus('Applied');
    setDateApplied(new Date().toISOString().slice(0, 10));
    setUrl('');
    setNotes('');
    setSelectedTags([]);
    setNewTagInput('');
    onCancel();
  };

  const handleAddTag = (tag) => {
    if (!tag.trim() || selectedTags.includes(tag.trim())) return;
    setSelectedTags([...selectedTags, tag.trim()]);
    setNewTagInput('');
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && newTagInput.trim()) {
      e.preventDefault();
      handleAddTag(newTagInput.trim());
    }
  };

  const getMatchingTags = () => {
    if (!newTagInput.trim()) return [];

    const inputLower = newTagInput.toLowerCase();
    return tags.filter(
      (tag) => !selectedTags.includes(tag) && tag.toLowerCase().includes(inputLower)
    );
  };

  return (
    <form className="application-form mb-6" onSubmit={handleSubmit} data-testid="application-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full py-3 px-4 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all"
          autoComplete="off"
          data-testid="company-input"
        />
        <input
          type="text"
          placeholder="Role / Title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full py-3 px-4 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all"
          autoComplete="off"
          data-testid="role-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full py-3 px-4 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all"
          data-testid="status-select"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
          className="w-full py-3 px-4 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all"
          data-testid="date-input"
        />
      </div>

      <input
        type="url"
        placeholder="Job posting URL (optional)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full py-3 px-4 mb-3 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all"
        autoComplete="off"
        data-testid="url-input"
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full py-3 px-4 mb-3 text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-hidden transition-all resize-none"
        data-testid="notes-input"
      />

      {/* Tag input field */}
      <div className="mb-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <TagIcon className="h-4 w-4 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder="Enter a tag (press Enter or comma to add)"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full py-3 px-4 pl-9 text-sm text-neutral-800 rounded-lg border border-neutral-200 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 outline-hidden transition-all"
            autoComplete="off"
            data-testid="tag-input"
          />

          {newTagInput.trim() && !selectedTags.includes(newTagInput.trim()) && (
            <button
              type="button"
              onClick={() => handleAddTag(newTagInput.trim())}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-primary-500 hover:bg-primary-600 text-white rounded-full"
              data-testid="add-tag-button"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {getMatchingTags().length > 0 && (
          <div className="mt-2" data-testid="tag-suggestions">
            <p className="text-xs font-medium text-neutral-500 mb-1.5">Select matching tag:</p>
            <div className="flex flex-wrap gap-2">
              {getMatchingTags().map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                  data-testid={`tag-suggestion-${tag}`}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="mb-3" data-testid="selected-tags">
          <p className="text-xs font-medium text-neutral-500 mb-2">Selected tags:</p>
          <div className="flex flex-wrap gap-2 p-2 bg-neutral-50 rounded-lg">
            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-500 text-white group"
                data-testid={`selected-tag-${tag}`}
              >
                <TagIcon className="h-3 w-3 mr-1" />
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-1 p-0.5 rounded-full hover:bg-primary-600 group-hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveTag(tag);
                  }}
                  data-testid={`remove-tag-${tag}`}
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-neutral-500 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          whileTap={{ scale: 0.97 }}
          data-testid="cancel-button"
        >
          <XMarkIcon className="h-5 w-5 inline mr-1" />
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={!company.trim() || !role.trim()}
          className={`px-4 py-2 rounded-lg font-medium ${
            company.trim() && role.trim()
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          } transition-colors`}
          whileTap={company.trim() && role.trim() ? { scale: 0.97 } : {}}
          data-testid="submit-button"
        >
          <CheckIcon className="h-5 w-5 inline mr-1" />
          Add Application
        </motion.button>
      </div>
    </form>
  );
}

export default ApplicationForm;
