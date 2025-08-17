// components/LatexPreview.tsx
'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { generateDeedyLatex } from '@/lib/latex-generator';

interface LatexPreviewProps {
  data: Partial<ResumeData>;
}

export default function LatexPreview({ data }: LatexPreviewProps) {
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLatex, setShowLatex] = useState(false);
  const [copied, setCopied] = useState(false); // Add copied state

  const latexCode = generateDeedyLatex(data);

  const renderHTMLPreview = () => {
    if (!data.personalInfo?.name) {
      return (
        <div className="p-8 text-center text-gray-500">
          <p>Fill in your information to see the preview</p>
        </div>
      );
    }

    return (
      <div className="p-6 bg-white" style={{ fontFamily: 'Times, serif', fontSize: '10pt', lineHeight: '1.2' }}>
        {/* Header */}
        <div className="border-b border-gray-400 pb-4 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-thin text-gray-900 mb-2 tracking-widest" style={{ fontFamily: 'Lato, sans-serif' }}>
              {data.personalInfo?.name?.toUpperCase() || 'YOUR NAME'}
            </h1>
            <div className="text-sm text-gray-700">
              <span className="hover:text-blue-600 cursor-pointer underline">
                {data.personalInfo?.email || 'your.email@example.com'}
              </span>
              <span className="mx-2">|</span>
              <span>{data.personalInfo?.phone || '111.111.1111'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                  Experience
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-bold text-sm">{exp.company}</span>
                        <span className="mx-2">|</span>
                        <span className="italic text-sm">{exp.position}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span>{exp.startDate} - {exp.endDate}</span>
                        <span className="mx-2">|</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="text-xs leading-relaxed">
                      {exp.description?.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                  Projects
                </h2>
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-bold text-sm">{project.name}</span>
                        <span className="mx-2">|</span>
                        <span className="italic text-sm">{project.description}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span>{project.startDate} - {project.endDate}</span>
                        <span className="mx-2">|</span>
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <ul className="text-xs leading-relaxed">
                      {project.details?.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-1">
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="font-bold text-sm">{edu.institution}</div>
                    <div className="text-xs">{edu.degree}</div>
                    <div className="text-xs text-gray-600">{edu.expectedGraduation} | {edu.location}</div>
                    {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {data.skills && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                  Skills
                </h2>
                
                {data.skills.programming && (
                  <div className="mb-3">
                    <div className="font-bold text-xs">Programming</div>
                    <div className="text-xs">
                      {data.skills.programming.expert && data.skills.programming.expert.length > 0 && (
                        <div><strong>Expert:</strong> {data.skills.programming.expert.join(', ')}</div>
                      )}
                      {data.skills.programming.intermediate && data.skills.programming.intermediate.length > 0 && (
                        <div><strong>Intermediate:</strong> {data.skills.programming.intermediate.join(', ')}</div>
                      )}
                      {data.skills.programming.beginner && data.skills.programming.beginner.length > 0 && (
                        <div><strong>Beginner:</strong> {data.skills.programming.beginner.join(', ')}</div>
                      )}
                    </div>
                  </div>
                )}
                
                {data.skills.technology && data.skills.technology.length > 0 && (
                  <div className="mb-3">
                    <div className="font-bold text-xs">Technology</div>
                    <div className="text-xs">{data.skills.technology.join(', ')}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const compileToPDF = async () => {
    setIsCompiling(true);
    setError(null);
    
    try {
      // Call the LaTeX compilation API
      const response = await fetch('/api/compile-latex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexCode }),
      });

      if (!response.ok) {
        throw new Error(`Compilation failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setPdfUrl(result.pdfUrl);
      } else {
        setError(result.error || 'Compilation failed');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">LaTeX Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowLatex(!showLatex)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {showLatex ? 'Show Preview' : 'Show Code'}
          </button>
          <button
            onClick={compileToPDF}
            disabled={isCompiling}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCompiling ? 'Compiling...' : 'Generate PDF'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {pdfUrl && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm">
            PDF compiled successfully!{' '}
            <a href={pdfUrl} download="resume.pdf" className="underline font-medium">
              Download PDF
            </a>
          </p>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {showLatex ? (
          <div className="h-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Generated LaTeX Code</h3>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(latexCode);
                    setCopied(true); // Set the copied state to true
                    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
                  } catch (err) {
                    console.error("Failed to copy text: ", err);
                  }
                }}
                className={`px-2 py-1 text-xs rounded ${
                  copied ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div className="h-full overflow-y-auto bg-gray-50 rounded-lg border">
              <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
                <code>{latexCode}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Resume Preview</h3>
            <div className="h-full overflow-y-auto bg-white border rounded-lg">{renderHTMLPreview()}</div>
          </div>
        )}
      </div>
    </div>
  );
}