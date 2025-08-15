"use client";

import { useResumeContext } from "@/app/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useState } from "react";

const colors = [
  "#4f46e5", // Indigo
  "#0ea5e9", // Sky
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#000000", // Black
];

export default function ThemeColor() {
  const [showColors, setShowColors] = useState(false);
  const { resumeInfo, setResumeInfo } = useResumeContext();

  const handleColorChange = (color: string) => {
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        themeColor: color,
      });
    }
    setShowColors(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowColors(!showColors)}
        className="flex gap-2"
      >
        <Palette size={18} />
        Theme
      </Button>

      {showColors && (
        <div className="absolute top-12 left-0 bg-white dark:bg-zinc-800 p-3 rounded-md shadow-lg z-10 grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}


