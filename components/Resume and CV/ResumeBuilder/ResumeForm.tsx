"use client";

import React, { useState, useEffect } from "react";
import { mockResumeData } from "@/data/mockResumeData";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  onDataChange: (data: Partial<ResumeData>) => void;
  initialData?: Partial<ResumeData>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  onDataChange,
  initialData = {},
}) => {
  const [data, setData] = useState<Partial<ResumeData>>({
    personalInfo: {
      name: mockResumeData.personalInfo.name,
      email: mockResumeData.personalInfo.email,
      phone: mockResumeData.personalInfo.phone,
      website: mockResumeData.personalInfo.website,
      ...initialData.personalInfo,
    },
  experience: initialData.experience || mockResumeData.experience,
  projects: initialData.projects || mockResumeData.projects,
  education: initialData.education || mockResumeData.education,
  skills: initialData.skills || mockResumeData.skills,
  coursework: initialData.coursework || mockResumeData.coursework,
  societies: initialData.societies || mockResumeData.societies,
  links: initialData.links || mockResumeData.links,
  });

  useEffect(() => {
    onDataChange(data);
  }, [data, onDataChange]);

  const updatePersonalInfo = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        website: "",
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setData((prev) => {
      const newExperience = [...(prev.experience || [])];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        experience: newExperience,
      };
    });
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          description: [],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateProject = (
    index: number,
    field: string,
    value: string | string[]
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
    setData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: Date.now().toString(),
          name: "",
          description: [],
          location: "",
          startDate: "",
          endDate: "",
          details: [],
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
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

  const updateSkills = (
    category: string,
    subcategory: string,
    value: string[]
  ) => {
    setData((prev) => ({
      ...prev,
      skills: {
        programming: {
          expert: [],
          intermediate: [],
          beginner: [],
        },
        technology: [],
        ...prev.skills,
        [category]: {
          expert: [],
          intermediate: [],
          beginner: [],
          ...(category === 'programming' ? prev.skills?.programming : {}),
          [subcategory]: value,
        },
      },
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
                Full Name
              </label>
              <input
                type="text"
                value={data.personalInfo?.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={data.personalInfo?.email || ""}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={data.personalInfo?.phone || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length <= 10) {
                    updatePersonalInfo("phone", value); // Update phone number in state
                  }
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter your phone number"
              />
              {data.personalInfo?.phone &&
                data.personalInfo.phone.length > 10 && (
                  <p className="text-red-500 text-xs mt-1">
                    Enter a valid 10-digit phone number
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              Experience
            </h2>
            <button
              onClick={addExperience}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
            >
              Add
            </button>
          </div>
          <div className="space-y-4">
            {data.experience?.map((exp, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Experience {index + 1}
                  </h3>
                  {data.experience && data.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
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
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(index, "position", e.target.value)
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
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(index, "startDate", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Jan 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(index, "endDate", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(index, "location", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Job Description (one bullet point per line)
                    </label>
                    <textarea
                      value={exp.description?.join("\n") || ""}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target.value.split("\n") // Keep all lines, including empty ones
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={3}
                      placeholder="Developed web applications using React and Node.js&#10;Led a team of 3 engineers&#10;Improved application performance by 40%"
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
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
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
                      Location
                    </label>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e) =>
                        updateProject(index, "location", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={project.startDate}
                        onChange={(e) =>
                          updateProject(index, "startDate", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Jan 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={project.endDate}
                        onChange={(e) =>
                          updateProject(index, "endDate", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Project Description
                    </label>
                    <input
                      type="text"
                      value={project.description}
                      onChange={(e) =>
                        updateProject(index, "description", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Brief description of the project"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Details (one bullet point per line)
                    </label>
                    <textarea
                      value={project.details?.join("\n") || ""}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "details",
                          e.target.value.split("\n") 
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={3}
                      placeholder="Built responsive web application&#10;Integrated third-party APIs&#10;Deployed using Docker"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education?.map((edu, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
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
                      Expected Graduation
                    </label>
                    <input
                      type="text"
                      value={edu.expectedGraduation}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "expectedGraduation",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="May 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      GPA (optional)
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(index, "gpa", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="3.8"
                    />
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Skills
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Programming Languages
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Expert Level (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={data.skills?.programming?.expert?.join(", ") || ""}
                    onChange={(e) =>
                      updateSkills(
                        "programming",
                        "expert",
                        handleStringArrayInput(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Python, JavaScript"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Intermediate Level (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={
                      data.skills?.programming?.intermediate?.join(", ") || ""
                    }
                    onChange={(e) =>
                      updateSkills(
                        "programming",
                        "intermediate",
                        handleStringArrayInput(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Java, C++"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Beginner Level (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={data.skills?.programming?.beginner?.join(", ") || ""}
                    onChange={(e) =>
                      updateSkills(
                        "programming",
                        "beginner",
                        handleStringArrayInput(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Rust, Go"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Technologies & Tools (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills?.technology?.join(", ") || ""}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    skills: {
                      programming: {
                        expert: [],
                        intermediate: [],
                        beginner: [],
                      },
                      ...prev.skills,
                      technology: handleStringArrayInput(e.target.value),
                    },
                  }))
                }
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="React, Node.js, Docker, AWS"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;