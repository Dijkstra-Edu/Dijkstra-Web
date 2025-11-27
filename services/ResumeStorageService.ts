// ResumeStorageService.ts
// Handles localStorage operations for resumes
import { UserProfileData, SavedResumeData } from '@/types/document';

export class ResumeStorageService {
  private static STORAGE_KEY = 'dijkstra-resume-data';

  static saveResumeData(resumeId: string, data: Partial<UserProfileData>, template: 'deedy' | 'row-based', title: string, documentId: string, userEmail: string, userName: string, documentType?: 'resume' | 'cv'): void {
    try {
      const savedData: SavedResumeData = {
        resumeId,
        title,
        template,
        content: data,
        lastModified: new Date().toISOString(),
        documentId,
        userEmail,
        userName,
        documentType
      };
      const existingData = this.getAllSavedResumes();
      const updatedData = existingData.filter(item => item.resumeId !== resumeId);
      updatedData.push(savedData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch {
      // Error intentionally swallowed; localStorage operations may fail in restricted environments
    }
  }

  static loadResumeData(resumeId: string): SavedResumeData | null {
    try {
      const allData = this.getAllSavedResumes();
      const resumeData = allData.find(item => item.resumeId === resumeId);
      return resumeData || null;
    } catch {
      // Return null if loading fails
      return null;
    }
  }

  static getAllSavedResumes(): SavedResumeData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      // If parsing fails or storage is unavailable, return empty list
      return [];
    }
  }

  static deleteResume(resumeId: string): void {
    try {
      const existingData = this.getAllSavedResumes();
      const updatedData = existingData.filter(item => item.resumeId !== resumeId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch {
      // Swallow delete errors from localStorage
    }
  }

  static resumeExists(resumeId: string): boolean {
    const allData = this.getAllSavedResumes();
    return allData.some(item => item.resumeId === resumeId);
  }

  static formatLastModified(lastModified: string): string {
    const now = new Date();
    const modifiedDate = new Date(lastModified);
    const diffMs = now.getTime() - modifiedDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }

  static deleteResumeData(resumeId: string): boolean {
    try {
      const existingData = this.getAllSavedResumes();
      const filteredData = existingData.filter(item => item.resumeId !== resumeId);
      if (filteredData.length === existingData.length) {
        return false;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredData));
      return true;
    } catch {
      // Swallow delete errors and indicate failure
      return false;
    }
  }

  static deleteBulkResumeData(resumeIds: string[]): number {
    try {
      const existingData = this.getAllSavedResumes();
      const filteredData = existingData.filter(item => !resumeIds.includes(item.resumeId));
      const deletedCount = existingData.length - filteredData.length;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredData));
      return deletedCount;
    } catch {
      // On error, return 0 deleted
      return 0;
    }
  }
}
