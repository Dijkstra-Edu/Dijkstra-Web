"use client";

import { useResumeContext } from "@/app/context/ResumeContext";
import { Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function LatexTemplate() {
  const { resumeInfo } = useResumeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resumeInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Resume data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-8 max-w-[850px] mx-auto font-serif latex-resume">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
          {resumeInfo.firstName} {resumeInfo.lastName}
        </h1>
        <div className="flex justify-center items-center gap-4 text-sm">
          {resumeInfo.phone && (
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              {resumeInfo.phone}
            </div>
          )}
          {resumeInfo.email && (
            <div className="flex items-center">
              <Mail size={14} className="mr-1" />
              <a href={`mailto:${resumeInfo.email}`} className="underline">
                {resumeInfo.email}
              </a>
            </div>
          )}
          {resumeInfo.address && (
            <div className="flex items-center">
              {resumeInfo.address}
            </div>
          )}
        </div>
      </header>

      {/* Profile Summary */}
      {resumeInfo.summery && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2 latex-section-title">
            Profile Summary
          </h2>
          <p className="text-sm latex-text">{resumeInfo.summery}</p>
        </section>
      )}

      {/* Education */}
      {resumeInfo.education && resumeInfo.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2 latex-section-title">
            Education
          </h2>
          <ul className="list-none latex-list">
            {resumeInfo.education.map((edu, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold">{edu.universityName}</div>
                    <div className="italic text-sm">{edu.degree} {edu.major ? `in ${edu.major}` : ''} <span className="font-normal not-italic">{edu.description ? `• ${edu.description}` : ''}</span></div>
                  </div>
                  <div className="text-sm whitespace-nowrap">
                    {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {resumeInfo.Experience && resumeInfo.Experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2 latex-section-title">
            Experience
          </h2>
          <ul className="list-none latex-list">
            {resumeInfo.Experience.map((exp, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold">{exp.title}</div>
                    <div className="italic text-sm">{exp.companyName}</div>
                    <div className="text-sm">{exp.city}{exp.state ? `, ${exp.state}` : ''}</div>
                  </div>
                  <div className="text-sm whitespace-nowrap">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    }) : 'Present'}
                  </div>
                </div>
                <div className="text-sm mt-1 latex-work-summary" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {resumeInfo.skills && resumeInfo.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2 latex-section-title">
            Technical and Soft Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeInfo.skills.map((skill, index) => (
              <div key={index} className="latex-skill-tag">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      <style jsx global>{`
        .latex-resume {
          font-family: 'Latin Modern Roman', 'Computer Modern', Georgia, serif;
          line-height: 1.5;
          color: #333;
          letter-spacing: 0.01em;
        }
        
        .latex-section-title {
          border-bottom: 1px solid #333;
          padding-bottom: 0.2rem;
          margin-bottom: 0.8rem;
          letter-spacing: 0.05em;
        }
        
        .latex-list {
          padding-left: 0;
        }
        
        .latex-text {
          text-align: justify;
          hyphens: auto;
        }
        
        .latex-work-summary ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
        }
        
        .latex-skill-tag {
          background-color: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 3px;
          padding: 0.2rem 0.5rem;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
