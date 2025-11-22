/**
 * Document API Service
 * Handles API calls for creating and updating resume/CV documents
 */

import { API_ENDPOINTS } from "@/constants/api";
import { UserProfileData } from "@/types/resume";

export interface DocumentCreateRequest {
  github_username: string;
  latex: string;
  base_structure: Partial<UserProfileData>;
  document_type?: string;
  document_kind?: string;
}

export interface DocumentCreateResponse {
  id: string;
  profile_id: string;
  latex: string;
  document_name?: string;
  base_structure: Partial<UserProfileData>;
  created_at: string;
  updated_at: string;
  document_type?: string;
  document_kind?: string;
}

export interface DocumentUpdateRequest {
  latex?: string;
  document_name?: string;
  base_structure?: Partial<UserProfileData>;
  document_type?: string;
  document_kind?: string;
}

export interface DocumentUpdateResponse {
  id: string;
  profile_id: string;
  latex: string;
  document_name?: string;
  base_structure: Partial<UserProfileData>;
  created_at: string;
  updated_at: string;
  document_type?: string;
  document_kind?: string;
}

export interface DocumentApiError {
  detail: {
    error_code: string;
    message: string;
  };
}

export interface DocumentResponse {
  id: string;
  profile_id: string;
  document_name?: string;
  latex?: string;
  base_structure?: Partial<UserProfileData>;
  created_at: string;
  updated_at: string;
  document_type?: string;
  document_kind?: string;
}

export class DocumentApiService {
  /**
   * Create a new document in the backend
   * @param githubUsername - User's GitHub username
   * @param latex - LaTeX string of the resume
   * @param baseStructure - Resume data structure
   * @returns Created document response
   */
  static async createDocument(
    githubUsername: string,
    latex: string,
    baseStructure: Partial<UserProfileData>,
    documentName?: string,
    documentType?: string,
    documentKind?: string
  ): Promise<DocumentCreateResponse> {
    const url = `${API_ENDPOINTS.DIJKSTRA_API}/Dijkstra/v1/document/create`;

    const payload: DocumentCreateRequest & { document_name?: string } = {
      github_username: githubUsername,
      latex: latex,
      base_structure: baseStructure,
    };

    if (documentName && documentName.trim() !== '') {
      payload.document_name = documentName;
    }

    if (documentType && documentType.trim() !== '') {
      payload.document_type = documentType;
    }

    if (documentKind && documentKind.trim() !== '') {
      payload.document_kind = documentKind;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData: DocumentApiError = await response.json();
        
        if (response.status === 404) {
          throw new Error(
            errorData.detail.message || "User or profile not found"
          );
        }
        
        if (response.status === 422) {
          throw new Error("Invalid data provided. Please check all fields.");
        }

        throw new Error(
          `Failed to create document: ${response.status} ${response.statusText}`
        );
      }

      const data: DocumentCreateResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while creating document");
    }
  }

  /**
   * Update an existing document in the backend
   * @param documentId - The document ID to update
   * @param latex - Optional updated LaTeX string
   * @param baseStructure - Optional updated resume data structure
   * @returns Updated document response
   */
  static async updateDocument(
    documentId: string,
    latex?: string,
    baseStructure?: Partial<UserProfileData>,
    documentName?: string,
    documentType?: string,
    documentKind?: string
  ): Promise<DocumentUpdateResponse> {
    const url = `${API_ENDPOINTS.DIJKSTRA_API}/Dijkstra/v1/document/${documentId}`;

    // Build payload with only provided fields
    const payload: DocumentUpdateRequest & { document_name?: string } = {};
    if (latex !== undefined) {
      payload.latex = latex;
    }
    if (documentName !== undefined && documentName.trim() !== '') {
      payload.document_name = documentName;
    }
    if (baseStructure !== undefined) {
      payload.base_structure = baseStructure;
    }
    if (documentType !== undefined && documentType.trim() !== '') {
      payload.document_type = documentType;
    }
    if (documentKind !== undefined && documentKind.trim() !== '') {
      payload.document_kind = documentKind;
    }
    

    // Validate that at least one field is provided
    if (Object.keys(payload).length === 0) {
      throw new Error("At least one field (latex or base_structure) must be provided for update");
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData: DocumentApiError = await response.json();
        
        if (response.status === 404) {
          throw new Error(
            errorData.detail.message || "Document not found"
          );
        }
        
        if (response.status === 422) {
          throw new Error("Invalid data provided for update");
        }

        throw new Error(
          `Failed to update document: ${response.status} ${response.statusText}`
        );
      }

      const data: DocumentUpdateResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while updating document");
    }
  }

  /**
   * Validate required fields before API call
   * @param githubUsername - User's GitHub username
   * @param latex - LaTeX string
   * @param baseStructure - Resume data structure
   * @returns Validation result
   */
  static validateDocumentData(
    githubUsername: string,
    latex: string,
    baseStructure: Partial<UserProfileData>
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!githubUsername || githubUsername.trim() === "") {
      errors.push("GitHub username is required");
    }

    if (!latex || latex.trim() === "") {
      errors.push("LaTeX content is required");
    }

    if (!baseStructure || typeof baseStructure !== "object") {
      errors.push("Resume structure is required");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
  /**
   * Delete a document by ID
   * @param documentId - The document ID to delete
   * @returns Server response text on success
   */
  static async deleteDocument(documentId: string): Promise<string> {
    const url = `${API_ENDPOINTS.DIJKSTRA_API}/Dijkstra/v1/document/${documentId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: DocumentApiError = await response.json().catch(() => ({} as DocumentApiError));
        if (response.status === 404) {
          throw new Error(errorData?.detail?.message || "Document not found");
        }
        throw new Error(`Failed to delete document: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      return text;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while deleting document");
    }
  }

  /**
   * Get all documents for a given user by GitHub username
   * @param githubUsername - GitHub username
   * @returns Array of documents (may be empty)
   */
  static async getDocumentsByUser(githubUsername: string): Promise<DocumentResponse[] | null> {
    const url = `${API_ENDPOINTS.DIJKSTRA_API}/Dijkstra/v1/document/user/${githubUsername}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        // User not found — return empty list to allow UI to handle
        return [];
      }

      if (!response.ok) {
        const errorData: DocumentApiError = await response.json().catch(() => ({} as DocumentApiError));
        throw new Error(errorData?.detail?.message || `Failed to fetch user documents: ${response.statusText}`);
      }

      const data = await response.json();
      // If server explicitly returns `null`, propagate null so callers can
      // decide not to fall back to localStorage and show an empty table.
      if (data === null) return null;
      return data as DocumentResponse[];
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while fetching user documents");
    }
  }

  /**
   * Get a single document by its ID
   * @param documentId - UUID of the document
   * @returns DocumentResponse
   */
  static async getDocumentById(documentId: string): Promise<DocumentResponse> {
    const url = `${API_ENDPOINTS.DIJKSTRA_API}/Dijkstra/v1/document/${documentId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        const errorData: DocumentApiError = await response.json().catch(() => ({} as DocumentApiError));
        throw new Error(errorData?.detail?.message || "Document not found");
      }

      if (response.status === 400) {
        const errorData: DocumentApiError = await response.json().catch(() => ({} as DocumentApiError));
        throw new Error(errorData?.detail?.message || "Invalid document id");
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
      }

      const data: DocumentResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while fetching document");
    }
  }
}
