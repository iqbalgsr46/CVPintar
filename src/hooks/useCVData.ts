'use client';

import { useState, useEffect } from 'react';

export type Experience = {
  id: string;
  company: string;
  position: string;
  yearStart: string;
  yearEnd: string;
};

export type Education = {
  id: string;
  school: string;
  major: string;
  graduationYear: string;
};

export type Course = {
  id: string;
  institution: string;
  year: string;
};

export type CVData = {
  personal: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  education: Education[];
  courses: Course[];
  skills: string;
  experience: Experience[];
};

const defaultCVData: CVData = {
  personal: {
    fullName: '',
    phone: '',
    email: '',
    address: '',
  },
  education: [],
  courses: [],
  skills: '',
  experience: [],
};

export function useCVData() {
  const [data, setData] = useState<CVData>(defaultCVData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cvpintar_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.personal) {
          setData({ ...defaultCVData, ...parsed, personal: { ...defaultCVData.personal, ...parsed.personal } });
        } else {
          localStorage.removeItem('cvpintar_data');
        }
      } catch (e) {
        console.error('Failed to parse CV data', e);
        localStorage.removeItem('cvpintar_data');
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: CVData) => {
    setData(newData);
    localStorage.setItem('cvpintar_data', JSON.stringify(newData));
  };

  return { data, updateData, isLoaded };
}
