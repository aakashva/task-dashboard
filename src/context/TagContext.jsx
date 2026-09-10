import React, { createContext, useState, useContext, useEffect } from 'react';
import { useApplicationContext } from './ApplicationContext';
import { DataHydrationService } from '../common/utils/DataHydrationService';

const TagContext = createContext();

export const useTagContext = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState(() => {
    return DataHydrationService.shouldHydrate()
      ? DataHydrationService.getInitialTags()
      : [];
  });
  const { applications } = useApplicationContext();

  useEffect(() => {
    const uniqueTags = new Set();

    applications.forEach((app) => {
      if (app.tags && Array.isArray(app.tags)) {
        app.tags.forEach((tag) => uniqueTags.add(tag));
      }
    });

    const updatedTags = Array.from(uniqueTags);
    setTags((prevTags) => {
      const allTags = new Set([...prevTags, ...updatedTags]);
      return Array.from(allTags);
    });
  }, [applications]);

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const editTag = (oldTag, newTag) => {
    setTags(tags.map((tag) => (tag === oldTag ? newTag : tag)));
  };

  const deleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleManageTags = (operation, oldTag, newTag = null) => {
    switch (operation) {
      case 'add':
        addTag(oldTag);
        break;

      case 'edit':
        editTag(oldTag, newTag);
        break;

      case 'delete':
        deleteTag(oldTag);
        break;

      default:
        break;
    }
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        addTag,
        editTag,
        deleteTag,
        handleManageTags,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};
