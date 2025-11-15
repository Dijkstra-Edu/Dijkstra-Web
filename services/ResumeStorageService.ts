// ResumeStorageService.ts
// Handles localStorage operations for resumes
import { UserProfileData, SavedResumeData } from '@/types/resume';

export class ResumeStorageService {
  private static STORAGE_KEY = 'dijkstra-resume-data';

  static saveResumeData(resumeId: string, data: Partial<UserProfileData>, template: 'deedy' | 'row-based', title: string, documentId: string, userEmail: string, userName: string): void {
    try {
      const savedData: SavedResumeData = {
        resumeId,
        title,
        template,
        content: data,
        lastModified: new Date().toISOString(),
        documentId,
        userEmail,
        userName
      };
      const existingData = this.getAllSavedResumes();
      const updatedData = existingData.filter(item => item.resumeId !== resumeId);
      updatedData.push(savedData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
      console.log('Resume data saved successfully:', resumeId);
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  }

  static loadResumeData(resumeId: string): SavedResumeData | null {
    try {
      const allData = this.getAllSavedResumes();
      const resumeData = allData.find(item => item.resumeId === resumeId);
      return resumeData || null;
    } catch (error) {
      console.error('Error loading resume data:', error);
      return null;
    }
  }

  static getAllSavedResumes(): SavedResumeData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading saved resumes:', error);
      return [];
    }
  }

  static deleteResume(resumeId: string): void {
    try {
      const existingData = this.getAllSavedResumes();
      const updatedData = existingData.filter(item => item.resumeId !== resumeId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
      console.log('Resume deleted successfully:', resumeId);
    } catch (error) {
      console.error('Error deleting resume:', error);
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
      console.log('Resume deleted successfully:', resumeId);
      return true;
    } catch (error) {
      console.error('Error deleting resume data:', error);
      return false;
    }
  }

  static deleteBulkResumeData(resumeIds: string[]): number {
    try {
      const existingData = this.getAllSavedResumes();
      const filteredData = existingData.filter(item => !resumeIds.includes(item.resumeId));
      const deletedCount = existingData.length - filteredData.length;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredData));
      console.log(`${deletedCount} resumes deleted successfully`);
      return deletedCount;
    } catch (error) {
      console.error('Error deleting bulk resume data:', error);
      return 0;
    }
  }
}
