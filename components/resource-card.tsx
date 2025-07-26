import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'teal';
  icon: React.ReactNode;
  onDownload?: () => void;
}

export const ResourceCard = ({
  title,
  description,
  fileType,
  fileSize,
  color,
  icon,
  onDownload,
}: ResourceCardProps) => {
  const colorMap = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    green: '#10B981',
    red: '#EF4444',
    teal: '#14B8A6',
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div 
        className="h-32 flex items-center justify-center"
        style={{ backgroundColor: colorMap[color] }}
      >
        <div className="text-white text-4xl">{icon}</div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            <span className="font-medium">{fileType}</span>
            <span className="mx-1">•</span>
            <span>{fileSize}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDownload}
            className="text-muted-foreground hover:text-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
