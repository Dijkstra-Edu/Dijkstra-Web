"use client";

import React, { useState, useEffect, useRef } from "react";
import { userProfileData } from "@/data/mockResumeData";
import { UserProfileData, Education, Project } from "@/types/resume";

interface ResumeFormProps {
  onDataChange: (data: Partial<UserProfileData>) => void;
  initialData?: Partial<UserProfileData>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  onDataChange,
  initialData = {},
}) => {
  // Helper function to initialize data with proper fallback
  const getInitialFormData = (initial: Partial<UserProfileData>): Partial<UserProfileData> => {
    // If we have API data (check for user id or github_user_name), use it
    const hasApiData = initial.user?.id || initial.user?.github_user_name;
    
    if (hasApiData) {
      console.log('🎯 Initializing form with API data:', initial.user?.github_user_name);
      return {
        user: initial.user,
        experience: initial.experience,
        education: initial.education,
        projects: initial.projects,
        links: initial.links,
        organizations: initial.organizations,
      };
    }
    
    // Otherwise use mock data
    console.log('🎯 Initializing form with mock data');
    return {
      user: userProfileData.user,
      experience: userProfileData.experience,
      education: userProfileData.education,
      projects: userProfileData.projects,
      links: userProfileData.links,
      organizations: userProfileData.organizations,
    };
  };

  const [data, setData] = useState<Partial<UserProfileData>>(() => getInitialFormData(initialData));

  const isInitialMount = useRef(true);
  const hasLoadedApiData = useRef(false);
  const onDataChangeRef = useRef(onDataChange);
  const previousUserIdRef = useRef<string | undefined>(undefined);

  // Keep ref updated
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  }, [onDataChange]);

  // Update data when initialData changes (e.g., when API data loads)
  useEffect(() => {
    console.log('🔍 ResumeForm: initialData changed:', {
      hasInitialData: !!initialData,
      hasUser: !!initialData?.user,
      userId: initialData?.user?.id,
      githubUsername: initialData?.user?.github_user_name,
      firstName: initialData?.user?.first_name,
      educationCount: Array.isArray(initialData?.education) ? initialData.education.length : 0,
      experienceExists: !!initialData?.experience,
      hasLoadedApiDataFlag: hasLoadedApiData.current,
      previousUserId: previousUserIdRef.current,
    });
    
    // Check if initialData actually has data (not just an empty object)
    const hasData = initialData.user?.id || initialData.user?.github_user_name;
    const currentUserId = initialData.user?.id;
    
    // Reset hasLoadedApiData if we're loading a different user
    if (currentUserId && currentUserId !== previousUserIdRef.current) {
      console.log('🔄 Different user detected, resetting hasLoadedApiData');
      hasLoadedApiData.current = false;
      previousUserIdRef.current = currentUserId;
    }
    
    // Only update if we haven't loaded API data yet and initialData has actual data
    if (hasData && !hasLoadedApiData.current) {
      hasLoadedApiData.current = true;
      console.log('✅ Loading API data into form:', {
        user: initialData.user?.github_user_name,
        hasEducation: Array.isArray(initialData.education) ? initialData.education.length : 0,
        hasExperience: !!initialData.experience,
        hasProjects: Array.isArray(initialData.projects) ? initialData.projects.length : 0,
      });
      console.log('📦 Full initialData being loaded:', initialData);
      
      setData({
        user: initialData.user || userProfileData.user,
        experience: initialData.experience || userProfileData.experience,
        education: initialData.education || userProfileData.education,
        projects: initialData.projects || userProfileData.projects,
        links: initialData.links || userProfileData.links,
        organizations: initialData.organizations || userProfileData.organizations,
      });
    }
  }, [initialData]);

  // Only notify parent of changes when user edits (not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onDataChangeRef.current(data);
  }, [data]);

  const updateUser = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      user: {
        ...prev.user!,
        [field]: value,
      },
    }));
  };

  const updateExperience = (
    field: string,
    value: string | string[] | boolean | number
  ) => {
    setData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience!,
        [field]: value,
      },
    }));
  };

  const updateEducation = (
    index: number,
    field: string,
    value: string | string[] | boolean | number
  ) => {
    setData((prev) => {
      const newEducation = [...(prev.education || [])];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value,
      };
      return {
        ...prev,
        education: newEducation,
      };
    });
  };

  const addEducation = () => {
    setData((prev) => {
      const newEducation: Education = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile_id: prev.user?.id || "",
        school: "",
        school_type: "",
        degree: "",
        field: "",
        currently_studying: false,
        location: "",
        location_type: "",
        start_date: "",
        description_general: "",
        description_detailed: "",
        description_less: "",
        work_done: [],
        school_score_multiplier: 1,
        tools_used: [],
      };
      
      return {
        ...prev,
        education: [...(prev.education || []), newEducation],
      };
    });
  };

  const removeEducation = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateProject = (
    index: number,
    field: string,
    value: string | string[] | boolean | number
  ) => {
    setData((prev) => {
      const newProjects = [...(prev.projects || [])];
      newProjects[index] = {
        ...newProjects[index],
        [field]: value,
      };
      return {
        ...prev,
        projects: newProjects,
      };
    });
  };

  const addProject = () => {
    setData((prev) => {
      const newProject: Project = {
        id: Date.now(),
        profile_id: prev.user?.id || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: "",
        organization: "",
        owner: prev.user?.github_user_name || "",
        private: false,
        github_stars: 0,
        github_about: "",
        github_open_issues: 0,
        github_forks: 0,
        description: "",
        domain: "",
        topics: [],
        tools: [],
        readme: false,
        license: false,
        landing_page: false,
        docs_page: false,
        own_domain_name: false,
        total_lines_contributed: 0,
        improper_uploads: false,
        complexity_rating: 0,
        testing_framework_present: false,
      };
      
      return {
        ...prev,
        projects: [...(prev.projects || []), newProject],
      };
    });
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleStringArrayInput = (value: string): string[] => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return (
    <div className="p-6 max-w-none">
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={data.user?.first_name || ""}
                onChange={(e) => updateUser("first_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={data.user?.last_name || ""}
                onChange={(e) => updateUser("last_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Username
              </label>
              <input
                type="text"
                value={data.user?.github_user_name || ""}
                onChange={(e) => updateUser("github_user_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="johndoe"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              Experience
            </h2>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={data.experience?.company_name || ""}
                    onChange={(e) =>
                      updateExperience("company_name", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={data.experience?.title || ""}
                    onChange={(e) =>
                      updateExperience("title", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={data.experience?.start_date || ""}
                      onChange={(e) =>
                        updateExperience("start_date", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="2023-01-15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={data.experience?.end_date || ""}
                      onChange={(e) =>
                        updateExperience("end_date", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="2024-08-30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.experience?.location || ""}
                    onChange={(e) =>
                      updateExperience("location", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={data.experience?.description_general || ""}
                    onChange={(e) =>
                      updateExperience("description_general", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Led the development of scalable microservices for a next-generation fintech platform, improving system performance and reliability."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Work Done (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(data.experience?.work_done || []).join(", ")}
                    onChange={(e) =>
                      updateExperience("work_done", handleStringArrayInput(e.target.value))
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="API Design & Development, System Architecture, Database Management"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tools Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(data.experience?.tools_used || []).join(", ")}
                    onChange={(e) =>
                      updateExperience("tools_used", handleStringArrayInput(e.target.value))
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Golang, Python, PostgreSQL, Docker, Kubernetes"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              Education
            </h2>
            <button
              onClick={addEducation}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer text-xs"
            >
              Add
            </button>
          </div>
          <div className="space-y-4">
            {data.education?.map((edu, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Education {index + 1}
                  </h3>
                  {data.education && data.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      School
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(index, "school", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Field
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(index, "field", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={edu.start_date}
                        onChange={(e) =>
                          updateEducation(index, "start_date", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="2018-09-01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={edu.end_date || ""}
                        onChange={(e) =>
                          updateEducation(index, "end_date", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="2022-06-15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(index, "location", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Boston, MA"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={edu.description_general}
                      onChange={(e) =>
                        updateEducation(index, "description_general", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={2}
                      placeholder="Specialized in machine learning and distributed systems, graduating with honors."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              Projects
            </h2>
            <button
              onClick={addProject}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer text-xs"
            >
              Add
            </button>
          </div>
          <div className="space-y-4">
            {data.projects?.map((project, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Project {index + 1}
                  </h3>
                  {data.projects && data.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        updateProject(index, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="My Awesome Project"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={project.organization}
                      onChange={(e) =>
                        updateProject(index, "organization", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Open Source Initiative"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(index, "description", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={3}
                      placeholder="An open-source library for advanced data analysis and visualization."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Domain
                    </label>
                    <input
                      type="text"
                      value={project.domain}
                      onChange={(e) =>
                        updateProject(index, "domain", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Data Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Topics (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(project.topics || []).join(", ")}
                      onChange={(e) =>
                        updateProject(index, "topics", handleStringArrayInput(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="data-visualization, machine-learning, statistics"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tools (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(project.tools || []).join(", ")}
                      onChange={(e) =>
                        updateProject(index, "tools", handleStringArrayInput(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Python, Pandas, NumPy, Plotly"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Links
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Portfolio Link
              </label>
              <input
                type="text"
                value={data.links?.portfolio_link || ""}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  links: {
                    ...prev.links!,
                    portfolio_link: e.target.value
                  }
                }))}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                GitHub Link
              </label>
              <input
                type="text"
                value={data.links?.github_link || ""}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  links: {
                    ...prev.links!,
                    github_link: e.target.value
                  }
                }))}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                LinkedIn Link
              </label>
              <input
                type="text"
                value={data.links?.linkedin_link || ""}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  links: {
                    ...prev.links!,
                    linkedin_link: e.target.value
                  }
                }))}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

// Made with Bob
