import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: 'charcoal' | 'taupe' | 'slateBlue' | 'bronze';
  img_placeholder: string;
  onDownload?: () => void;
  onClick?: () => void;
  className?: string;
}

export const ResourceCard = ({
  title,
  description,
  fileType,
  fileSize,
  color,
  img_placeholder,
  onDownload,
  onClick,
  className = "",
}: ResourceCardProps) => {
  const colorMap = {
    charcoal: '#2E2E2E',
    taupe: '#4A3F35',
    slateBlue: '#3D4F60',
    bronze: '#665C54',
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when download button is clicked
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div
      className={`bg-card text-card-foreground border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-gray-400/30 hover:bg-[oklch(0.97_0.005_250)] dark:hover:shadow-blue-500/30 dark:hover:bg-[oklch(0.27_0.04_265)] ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={
        typeof window !== 'undefined' &&
        !document.documentElement.classList.contains('dark')
          ? { borderColor: 'oklch(0.92 0.01 250)' }
          : {}
      }
      onClick={handleCardClick}
    >
      <div className="flex">
        {/* Left column - Image */}
        <div
          className="flex items-center justify-center w-40"
          style={{ backgroundColor: colorMap[color] }}
        >
          <img
            src={img_placeholder}
            alt="Placeholder"
            className="p-2 w-auto object-cover rounded-md shadow-md transition-all duration-300"
          />
        </div>

        {/* Right column - Content */}
        <div className="flex-1 p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-card-foreground font-inter mb-1">
              {title}
            </h3>
            <p className="text-sm text-card-foreground/80 font-inter">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-card-foreground/80 font-inter">
              <span className="font-medium">{fileType}</span>
              <span className="mx-1">•</span>
              <span>{fileSize}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadClick}
              className="text-card-foreground hover:text-primary hover:bg-transparent focus-visible:ring-primary focus-visible:ring-2"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};