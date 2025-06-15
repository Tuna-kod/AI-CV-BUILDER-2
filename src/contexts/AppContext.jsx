
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext'; 

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cvs, setCvs] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCvs = async () => {
      if (!user) {
        setCvs([]); 
        return;
      }
      try {
        const { data, error } = await supabase
          .from('cvs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCvs(data || []);
      } catch (error) {
        console.error('Error fetching CVs:', error);
        setCvs([]);
      }
    };

    fetchCvs();
  }, [user]);

  const saveCv = async (cvData) => {
    if (!user) {
      console.error("User not authenticated, cannot save CV.");
      return null;
    }
    try {
      const newCvData = {
        user_id: user.id,
        personal_info: cvData.personalInfo,
        experience: cvData.experience,
        education: cvData.education,
        skills: cvData.skills,
        achievements: cvData.achievements,
        template: selectedTemplate,
      };

      const { data, error } = await supabase
        .from('cvs')
        .insert([newCvData])
        .select()
        .single();
      
      if (error) throw error;
      
      setCvs(prevCvs => [data, ...prevCvs]);
      return data;

    } catch (error) {
      console.error('Error saving CV:', error);
      return null;
    }
  };

  const deleteCv = async (cvId) => {
    if (!user) {
      console.error("User not authenticated, cannot delete CV.");
      return;
    }
    try {
      const { error } = await supabase
        .from('cvs')
        .delete()
        .eq('id', cvId)
        .eq('user_id', user.id);

      if (error) throw error;

      setCvs(prevCvs => prevCvs.filter(cv => cv.id !== cvId));
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  };

  const value = {
    cvs,
    saveCv,
    deleteCv,
    selectedTemplate,
    setSelectedTemplate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
