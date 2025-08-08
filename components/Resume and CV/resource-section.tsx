import { ResourceCard } from "@/components/Resume and CV/resource-card";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: 'charcoal' | 'taupe' | 'slateBlue' | 'bronze';
  icon: React.ReactNode;
}

interface ResourceSectionProps {
  title: string;
  resources: any[];
  onCreate: () => void;
  onDownload?: (pdfUrl: string) => void;
}

export const ResourceSection = ({ title, resources, onCreate, onDownload }: ResourceSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white font-inter tracking-tight">
          {title}
        </h2>
        <Button
          onClick={onCreate}
          variant="default"
          className="ml-4 bg-green-500 hover:bg-green-500/90 text-white shadow-lg rounded-2xl py-3 px-6 transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
        >
          Create Now!
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} onDownload={() => onDownload && onDownload(resource.pdfUrl)} />
        ))}
      </div>
    </section>
  );
};

export default ResourceSection;