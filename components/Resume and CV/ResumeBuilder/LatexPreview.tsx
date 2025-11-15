// components/LatexPreview.tsx
'use client';

import React, { useState, useRef } from 'react';
import { UserProfileData } from '@/types/resume';
import { generateRowBasedLatex, generateDeedyLatex } from '@/lib/latex-generator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface LatexPreviewProps {
  data: Partial<UserProfileData>;
  template?: 'deedy' | 'row-based';
  scale?: number;
}

// Helper function to format location object to string
const formatLocation = (location: string | { city?: string; state?: string; country?: string } | unknown): string => {
  if (!location) return '';
  if (typeof location === 'string') return location;
  if (typeof location === 'object' && location !== null) {
    const loc = location as { city?: string; state?: string; country?: string };
    const parts = [loc.city, loc.state, loc.country].filter(Boolean);
    return parts.join(', ');
  }
  return '';
};

export default function LatexPreview({ data, template = 'deedy', scale = 1 }: LatexPreviewProps) {
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLatex, setShowLatex] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const latexCode = template === 'row-based' ? generateRowBasedLatex(data) : generateDeedyLatex(data);

  const renderHTMLPreview = () => {
    if (!data.user?.first_name) {
      return (
        <div className="p-8 text-center text-gray-500">
          <p>Fill in your information to see the preview</p>
        </div>
      );
    }

    if (template === 'row-based') {
      return renderRowBasedPreview();
    }

    return renderDeedyPreview();
  };

  const renderRowBasedPreview = () => {
    const fullName = `${data.user?.first_name || ''} ${data.user?.middle_name || ''} ${data.user?.last_name || ''}`.trim();
    
    return (
      <div className="w-full h-full overflow-hidden">
        <div 
          className="bg-white origin-top-left transition-transform duration-200" 
          style={{ 
            fontFamily: 'Charter, Times, serif', 
            fontSize: '10pt', 
            lineHeight: '1.4',
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            height: `${100 / scale}%`
          }}
        >
        <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-normal text-gray-900 mb-3">
            {fullName || 'John Doe'}
          </h1>
          <div className="text-sm text-gray-700 flex justify-center items-center flex-wrap gap-2">
            <span className="hover:text-blue-600 cursor-pointer underline">
              {data.links?.linkedin_user_name ? `${data.links.linkedin_user_name}@example.com` : 'youremail@yourdomain.com'}
            </span>
            <span>|</span>
            <span>Phone Number</span>
            <span>|</span>
            <span className="hover:text-blue-600 cursor-pointer underline">
              {data.links?.portfolio_link || 'yourwebsite.com'}
            </span>
            <span>|</span>
            <span className="hover:text-blue-600 cursor-pointer underline">
              {data.links?.linkedin_link || 'linkedin.com/in/yourusername'}
            </span>
            <span>|</span>
            <span className="hover:text-blue-600 cursor-pointer underline">
              {data.links?.github_link || 'github.com/yourusername'}
            </span>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-4">
            Education
          </h2>
          {data.education && data.education.length > 0 ? (
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold text-sm">{edu.school}</span>
                      <span>, {edu.degree}</span>
                      {edu.location && <span> -- {formatLocation(edu.location)}</span>}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {edu.start_date} - {edu.end_date || 'Present'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 ml-4">
                    {edu.description_general && <p>• {edu.description_general}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-sm">Your University</span>
                  <span>, BS in Computer Science</span>
                </div>
                <div className="text-sm text-gray-600">Sept 2020 – May 2024</div>
              </div>
              <ul className="text-sm text-gray-700 ml-4">
                <li>• GPA: 3.9/4.0</li>
                <li>• <strong>Coursework:</strong> Data Structures, Algorithms, Computer Architecture</li>
              </ul>
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-4">
            Experience
          </h2>
          {data.experience ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-sm">{data.experience.title}</span>
                    <span>, {data.experience.company_name}</span>
                    {data.experience.location && <span> -- {formatLocation(data.experience.location)}</span>}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {data.experience.start_date} – {data.experience.end_date || 'Present'}
                  </div>
                </div>
                {data.experience.work_done && data.experience.work_done.length > 0 && (
                  <ul className="text-sm text-gray-700 ml-4">
                    {data.experience.work_done.map((desc, i) => (
                      <li key={i}>• {desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-sm">Software Engineer</span>
                  <span>, Tech Company -- City, State</span>
                </div>
                <div className="text-sm text-gray-600">June 2022 – Aug 2024</div>
              </div>
              <ul className="text-sm text-gray-700 ml-4">
                <li>• Developed and maintained web applications using modern technologies</li>
                <li>• Collaborated with cross-functional teams to deliver high-quality software</li>
                <li>• Implemented efficient algorithms and data structures</li>
              </ul>
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-4">
            Projects
          </h2>
          {data.projects && data.projects.length > 0 ? (
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold text-sm">{project.name}</span>
                    </div>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {project.landing_page_link || 'github.com/username/repo'}
                    </div>
                  </div>
                  {project.description && (
                    <ul className="text-sm text-gray-700 ml-4">
                      <li>• {project.description}</li>
                      {project.topics && project.topics.map((topic, i) => (
                        <li key={i}>• {topic}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-sm">Web Application</span>
                </div>
                <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                  github.com/username/project
                </div>
              </div>
              <ul className="text-sm text-gray-700 ml-4">
                <li>• Built a full-stack web application using React and Node.js</li>
                <li>• Implemented user authentication and data persistence</li>
              </ul>
            </div>
          )}
        </div>

        {/* Technologies Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-4">
            Technologies
          </h2>
                    <div className="space-y-3">
            <div className="text-sm">
              <span className="font-bold">Tools:</span> {(() => {
                const tools = data.experience?.tools_used;
                if (!tools) return 'Python, JavaScript, Java, C++, SQL';
                return typeof tools === 'string' ? tools : Array.isArray(tools) ? tools.join(', ') : String(tools);
              })()}
            </div>
            
            {data.projects && data.projects.length > 0 && data.projects[0].tools && data.projects[0].tools.length > 0 ? (
              <div className="text-sm">
                <span className="font-bold">Project Technologies:</span> {data.projects[0].tools.join(', ')}
              </div>
            ) : (
              <div className="text-sm">
                <span className="font-bold">Technologies:</span> React, Node.js, MongoDB, AWS, Docker
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  };

  const renderDeedyPreview = () => {
    const fullName = `${data.user?.first_name || ''} ${data.user?.middle_name || ''} ${data.user?.last_name || ''}`.trim();

    return (
      <div className="w-full h-full overflow-hidden">
        <div 
          className="bg-white origin-top-left transition-transform duration-200" 
          style={{ 
            fontFamily: 'Times, serif', 
            fontSize: '10pt', 
            lineHeight: '1.2',
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            height: `${100 / scale}%`
          }}
        >
        <div className="p-6">
        {/* Header */}
        <div className="border-b border-gray-400 pb-4 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-thin text-gray-900 mb-2 tracking-widest" style={{ fontFamily: 'Lato, sans-serif' }}>
              {fullName.toUpperCase() || 'YOUR NAME'}
            </h1>
            <div className="text-sm text-gray-700">
              <span className="hover:text-blue-600 cursor-pointer underline">
                {data.links?.linkedin_user_name ? `${data.links.linkedin_user_name}@example.com` : 'your.email@example.com'}
              </span>
              <span className="mx-2">|</span>
              <span>Phone Number</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Experience */}
            {data.experience && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                  Experience
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold text-sm">{data.experience.company_name}</span>
                      <span className="mx-2">|</span>
                      <span className="italic text-sm">{data.experience.title}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <span>{data.experience.start_date} - {data.experience.end_date || 'Present'}</span>
                      <span className="mx-2">|</span>
                      <span>{formatLocation(data.experience.location)}</span>
                    </div>
                  </div>
                  <ul className="text-xs leading-relaxed">
                    {(() => {
                      const workDone: string | string[] | unknown = data.experience.work_done;
                      const items: string[] = typeof workDone === 'string' 
                        ? workDone.split(/[,;]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
                        : Array.isArray(workDone) ? workDone : [];
                      return items.map((item: string, i: number) => <li key={i}>• {item}</li>);
                    })()}
                  </ul>
                </div>
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
                        <span>{project.created_at.split('T')[0]} - {project.updated_at.split('T')[0]}</span>
                      </div>
                    </div>
                    <ul className="text-xs leading-relaxed">
                      {(() => {
                        const topics: string | string[] | unknown = project.topics;
                        const items: string[] = typeof topics === 'string'
                          ? topics.split(/[,;]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
                          : Array.isArray(topics) ? topics : [];
                        return items.map((item: string, i: number) => <li key={i}>• {item}</li>);
                      })()}
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
                    <div className="font-bold text-sm">{edu.school}</div>
                    <div className="text-xs">{edu.degree} in {edu.field}</div>
                    <div className="text-xs text-gray-600">{edu.start_date} - {edu.end_date || 'Present'} | {formatLocation(edu.location)}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-blue-600 pb-1 mb-3">
                Skills
              </h2>
              
              <div className="mb-3">
                              <div className="mb-3">
                <div className="font-bold text-xs">Tools</div>
                <div className="text-xs">
                  {(() => {
                    const tools: string | string[] | unknown = data.experience?.tools_used;
                    if (!tools) return 'Python • JavaScript • React';
                    return typeof tools === 'string' ? tools.replace(/,/g, ' •') : Array.isArray(tools) ? tools.join(' • ') : String(tools);
                  })()}
                </div>
              </div>
              </div>
              
              {data.projects && data.projects.length > 0 && data.projects[0].tools && data.projects[0].tools.length > 0 && (
                <div className="mb-3">
                  <div className="font-bold text-xs">Project Technologies</div>
                  <div className="text-xs">{data.projects[0].tools.join(' • ')}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  };

  const downloadPDF = async () => {
    if (!previewRef.current) {
      setError('Preview content not found');
      return;
    }

    setIsCompiling(true);
    setError(null);
    setPdfUrl(null);
    
    try {
      const element = previewRef.current;
      
      // Find the actual content div (the one with transform scale)
      const contentDiv = element.querySelector('div > div') as HTMLElement;
      
      if (!contentDiv) {
        throw new Error('Content not found');
      }
      
      // Create a completely isolated container outside the main DOM
      const isolatedContainer = document.createElement('div');
      isolatedContainer.style.cssText = `
        position: fixed;
        top: -20000px;
        left: -20000px;
        background: white;
        width: auto;
        min-width: 900px;
        max-width: 900px;
        min-height: 1200px;
        overflow: visible;
        box-sizing: border-box;
        padding: 20px;
      `;
      
      // Clone the content
      const clone = contentDiv.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none';
      clone.style.width = '100%';
      clone.style.maxWidth = '860px';
      clone.style.height = 'auto';
      clone.style.overflow = 'visible';
      clone.style.boxSizing = 'border-box';
      clone.style.fontSize = '10pt';
      
      // Add inline styles to override all colors and ensure proper layout
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        * {
          color: inherit !important;
          background-color: transparent !important;
          border-color: currentColor !important;
          box-sizing: border-box !important;
        }
        body, html, div {
          background-color: white !important;
          overflow: visible !important;
        }
        .text-gray-900, h1, h2 { color: #111827 !important; }
        .text-gray-700 { color: #374151 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .text-gray-500 { color: #6b7280 !important; }
        .text-blue-600 { color: #2563eb !important; }
        .bg-white { background-color: #ffffff !important; }
        .border-gray-400 { border-color: #9ca3af !important; }
        .border-blue-600 { border-color: #2563eb !important; }
        .border-b { border-bottom-width: 1px !important; border-bottom-style: solid !important; }
        .grid { 
          display: grid !important; 
          width: 100% !important;
        }
        .grid-cols-3 { 
          grid-template-columns: 2fr 1fr !important; 
          gap: 1.5rem !important;
        }
        .col-span-2 { 
          grid-column: 1 / 2 !important;
          min-width: 0 !important;
          overflow: visible !important;
        }
        .col-span-1 { 
          grid-column: 2 / 3 !important;
          min-width: 0 !important;
          overflow: visible !important;
          word-wrap: break-word !important;
        }
        .gap-6 { gap: 1.5rem !important; }
        .flex { display: flex !important; }
        .flex-wrap { flex-wrap: wrap !important; }
        .justify-between { justify-content: space-between !important; }
        .justify-center { justify-content: center !important; }
        .items-start { align-items: flex-start !important; }
        .items-center { align-items: center !important; }
        .text-center { text-align: center !important; }
        .text-right { text-align: right !important; }
        .mb-1 { margin-bottom: 0.25rem !important; }
        .mb-2 { margin-bottom: 0.5rem !important; }
        .mb-3 { margin-bottom: 0.75rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-6 { margin-bottom: 1.5rem !important; }
        .mb-8 { margin-bottom: 2rem !important; }
        .pb-1 { padding-bottom: 0.25rem !important; }
        .pb-4 { padding-bottom: 1rem !important; }
        .p-6 { padding: 1.5rem !important; }
        .mx-2 { margin-left: 0.5rem !important; margin-right: 0.5rem !important; }
        .gap-2 { gap: 0.5rem !important; }
        .tracking-wider { letter-spacing: 0.05em !important; }
        .tracking-widest { letter-spacing: 0.1em !important; }
        .uppercase { text-transform: uppercase !important; }
        .italic { font-style: italic !important; }
        .font-bold { font-weight: 700 !important; }
        .font-thin { font-weight: 100 !important; }
        .underline { text-decoration: underline !important; }
        .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
        .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
        .leading-relaxed { line-height: 1.625 !important; }
        span, p, div, li {
          white-space: normal !important;
          overflow: visible !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        ul, ol {
          padding-left: 1rem !important;
          margin: 0 !important;
          list-style-position: inside !important;
        }
        li {
          margin-bottom: 0.25rem !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
      `;
      
      isolatedContainer.appendChild(styleTag);
      isolatedContainer.appendChild(clone);
      document.body.appendChild(isolatedContainer);
      
      // Wait for rendering and layout to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create canvas from the isolated container with better settings
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        foreignObjectRendering: false,
        allowTaint: true,
        width: clone.scrollWidth,
        height: clone.scrollHeight,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight
      });
      
      // Remove isolated container
      document.body.removeChild(isolatedContainer);
      
      // PDF dimensions - A4 size
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Calculate image dimensions to fit in PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // If content fits on one page
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multiple pages needed
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }
      
      // Generate filename
      const fullName = `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'resume';
      const filename = `${fullName.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;
      
      // Download
      pdf.save(filename);
      
      setPdfUrl('success');
      setTimeout(() => setPdfUrl(null), 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      console.error('PDF Error:', err);
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
            onClick={downloadPDF}
            disabled={isCompiling}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCompiling ? 'Generating...' : 'Download PDF'}
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
            PDF downloaded successfully!
          </p>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {showLatex ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
              <h3 className="text-sm font-semibold text-gray-700">Generated LaTeX Code</h3>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(latexCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
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
            <div className="flex-1 overflow-hidden bg-gray-50 rounded-lg border">
              <pre className="p-4 text-xs font-mono leading-relaxed h-full overflow-auto w-full whitespace-pre-wrap break-words">
                <code className="block w-full">{latexCode}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Resume Preview</h3>
            <div className="flex-1 overflow-auto bg-white border rounded-lg">
              <div className="origin-top-left" style={{ transformOrigin: 'top left' }} ref={previewRef}>
                {renderHTMLPreview()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}