import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: 'charcoal' | 'taupe' | 'slateBlue' | 'bronze';
  icon: React.ReactNode;
  onDownload?: () => void;
  className?: string;
}

export const ResourceCard = ({
  title,
  description,
  fileType,
  fileSize,
  color,
  icon,
  onDownload,
  className = "",
}: ResourceCardProps) => {
  const colorMap = {
    charcoal: '#2E2E2E',
    taupe: '#4A3F35',
    slateBlue: '#3D4F60',
    bronze: '#665C54',
  };

  return (
    <div
      className={`bg-card text-card-foreground border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-gray-400/30 hover:bg-[oklch(0.97_0.005_250)] dark:hover:shadow-blue-500/30 dark:hover:bg-[oklch(0.27_0.04_265)] ${className}`}
      style={typeof window !== 'undefined' && !document.documentElement.classList.contains('dark') ? { borderColor: 'oklch(0.92 0.01 250)' } : {}}
    >
      <div
        className="h-32 flex items-center justify-center"
        style={{ backgroundColor: colorMap[color] }}
      >
        <div className="text-white text-4xl drop-shadow">{icon}</div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground font-inter mb-1">{title}</h3>
          <p className="text-sm text-card-foreground/80 font-inter">{description}</p>
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
            onClick={onDownload}
            className="text-card-foreground hover:text-primary hover:bg-transparent focus-visible:ring-primary focus-visible:ring-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};