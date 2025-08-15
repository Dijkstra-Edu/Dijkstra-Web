"use client";

import { v4 as uuidv4 } from 'uuid';

// Define types for our API
interface ResumeData {
  title: string;
  resumeId: string;
  userEmail: string;
  userName: string;
  [key: string]: string | number | boolean | object; // For additional fields
}

interface CreateResumeRequest {
  data: ResumeData;
}

interface ResumeResponse {
  data: {
    data: {
      documentId: string;
      [key: string]: string | number | boolean | object;
    };
  };
}

class GlobalApi {
  // Create a new resume
  static async CreateNewResume(data: CreateResumeRequest): Promise<ResumeResponse> {
    try {
      // Generate a unique document ID
      const documentId = uuidv4();
      
      // In a real application, this would be an API call to your backend
      // For now, we'll simulate a successful response
      const response: ResumeResponse = {
        data: {
          data: {
            documentId: documentId,
            ...data.data
          }
        }
      };
      
      // Store in localStorage for persistence
      const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      resumes.push({
        documentId: documentId,
        ...data.data
      });
      localStorage.setItem('resumes', JSON.stringify(resumes));
      
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get resume by ID
  static async GetResumeById(resumeId: string): Promise<ResumeResponse> {
    try {
      // In a real application, this would be an API call to your backend
      // For now, we'll retrieve from localStorage
      const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      const resume = resumes.find((r: { documentId: string }) => r.documentId === resumeId);
      
      if (!resume) {
        return Promise.reject(new Error('Resume not found'));
      }
      
      return Promise.resolve({
        data: {
          data: resume
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update resume details
  static async UpdateResumeDetail(
    resumeId: string, 
    data: { data: Record<string, string | number | boolean | object> }
  ): Promise<ResumeResponse> {
    try {
      // In a real application, this would be an API call to your backend
      // For now, we'll update in localStorage
      const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      const index = resumes.findIndex((r: { documentId: string }) => r.documentId === resumeId);
      
      if (index === -1) {
        return Promise.reject(new Error('Resume not found'));
      }
      
      resumes[index] = {
        ...resumes[index],
        ...data.data
      };
      
      localStorage.setItem('resumes', JSON.stringify(resumes));
      
      return Promise.resolve({
        data: {
          data: resumes[index]
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default GlobalApi;


