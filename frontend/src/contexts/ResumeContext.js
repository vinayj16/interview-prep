import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeContext = createContext();

export const useResume = () => {
  return useContext(ResumeContext);
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    education: [],
    workExperience: [],
    skills: [],
    projects: [],
    certifications: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load resume data on component mount
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const response = await axios.get('/api/resume', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data) {
          setResumeData(prev => ({
            ...prev,
            ...response.data,
            education: response.data.education || [],
            workExperience: response.data.workExperience || [],
            skills: response.data.skills || [],
            projects: response.data.projects || [],
            certifications: response.data.certifications || []
          }));
        }
      } catch (err) {
        console.error('Error fetching resume data:', err);
        setError('Failed to load resume data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  // Update resume data
  const updateResumeData = async (updates) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Optimistic UI update
      setResumeData(prev => ({
        ...prev,
        ...updates
      }));

      // Send update to server
      await axios.put(
        '/api/resume',
        { ...updates },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return true;
    } catch (err) {
      console.error('Error updating resume data:', err);
      setError('Failed to update resume data');
      // Revert optimistic update on error
      setResumeData(prev => ({
        ...prev,
        ...Object.keys(updates).reduce((acc, key) => ({
          ...acc,
          [key]: prev[key]
        }), {})
      }));
      return false;
    }
  };

  // Add a new item to a collection (e.g., education, skills)
  const addItemToCollection = async (collection, item) => {
    try {
      const updatedCollection = [...(resumeData[collection] || []), item];
      return await updateResumeData({ [collection]: updatedCollection });
    } catch (err) {
      console.error(`Error adding item to ${collection}:`, err);
      return false;
    }
  };

  // Update an item in a collection
  const updateItemInCollection = async (collection, id, updates) => {
    try {
      const updatedCollection = (resumeData[collection] || []).map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      return await updateResumeData({ [collection]: updatedCollection });
    } catch (err) {
      console.error(`Error updating item in ${collection}:`, err);
      return false;
    }
  };

  // Remove an item from a collection
  const removeItemFromCollection = async (collection, id) => {
    try {
      const updatedCollection = (resumeData[collection] || []).filter(
        item => item.id !== id
      );
      return await updateResumeData({ [collection]: updatedCollection });
    } catch (err) {
      console.error(`Error removing item from ${collection}:`, err);
      return false;
    }
  };

  const value = {
    resumeData,
    isLoading,
    error,
    updateResumeData,
    addItemToCollection,
    updateItemInCollection,
    removeItemFromCollection,
    refreshResumeData: () => {
      // Force refresh of resume data
      setIsLoading(true);
      setError(null);
      // Implementation of refresh would go here
      setIsLoading(false);
    }
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};