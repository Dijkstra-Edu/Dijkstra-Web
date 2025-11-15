// ResumeApiService.ts
// Handles API-like operations for resumes (simulated backend)
import { v4 as uuidv4 } from 'uuid';
import { ResumeData } from '@/types/resume';

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

export class ResumeApiService {
  static async createResume(data: CreateResumeRequest): Promise<ResumeResponse> {
    try {
      const documentId = uuidv4();
      const response: ResumeResponse = {
        data: {
          data: {
            documentId: documentId,
            ...data.data
          }
        }
      };
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

  static async getResumeById(resumeId: string): Promise<ResumeResponse> {
    try {
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

  static async updateResume(resumeId: string, data: CreateResumeRequest): Promise<ResumeResponse> {
    try {
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
