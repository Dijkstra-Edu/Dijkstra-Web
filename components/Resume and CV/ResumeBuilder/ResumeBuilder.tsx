// ResumeBuilder.tsx - Standalone Resume Builder Component
'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import ResumeForm from '@/components/Resume and CV/ResumeBuilder/ResumeForm';
import LatexPreview from '@/components/Resume and CV/ResumeBuilder/LatexPreview';

interface ResumeBuilderProps {
  initialData?: Partial<ResumeData>;
  onDataChange?: (data: Partial<ResumeData>) => void;
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
}

export default function ResumeBuilder({
  initialData = {},
  onDataChange,
  className = "",
  height = "calc(100vh - 80px)",
  showHeader = true,
  headerTitle = "LaTeX Resume Builder",
  headerSubtitle = "Professional Deedy-Style Resume with Real-time Preview"
}: ResumeBuilderProps) {
  const [resumeData, setResumeData] = useState<Partial<ResumeData>>(initialData);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  const handleDataChange = (data: Partial<ResumeData>) => {
    setResumeData(data);
    onDataChange?.(data);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const containerElement = e.currentTarget as HTMLElement;
    const rect = containerElement.getBoundingClientRect();
    const containerWidth = rect.width;
    const newLeftWidth = ((e.clientX - rect.left) / containerWidth) * 100;
    
    // Constrain between 20% and 80%
    const constrainedWidth = Math.min(80, Math.max(20, newLeftWidth));
    setLeftPanelWidth(constrainedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {showHeader && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{headerTitle}</h1>
              <p className="text-sm text-gray-600">{headerSubtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Auto-save enabled</div>
            </div>
          </div>
        </div>
      )}

      {/* Two Panel Layout with Resizable Divider */}
      <div className="flex" style={{ height: height }}>
        {/* Left Panel - Form */}
        <div 
          className="border-r border-gray-200 bg-gray-50"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm">
                <ResumeForm 
                  onDataChange={handleDataChange}
                  initialData={resumeData}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className={`w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group ${
            isDragging ? 'bg-blue-500' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          {/* Drag handle indicator */}
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 group-hover:bg-blue-600 transition-colors"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-gray-300 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex flex-col space-y-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div 
          className="bg-white"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <LatexPreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


