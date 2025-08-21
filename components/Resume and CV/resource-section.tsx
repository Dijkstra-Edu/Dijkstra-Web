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
  pdfUrl?: string;
  template?: 'deedy' | 'row-based';
}

interface ResourceSectionProps {
  title: string;
  resources: ResourceItem[];
  onCreate: (template?: 'deedy' | 'row-based') => void;
  onDownload?: (pdfUrl: string) => void;
}

export const ResourceSection = ({ title, resources, onCreate, onDownload }: ResourceSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground flex items-center gap-2">
          {title}
        </h2>
        <Button
          onClick={() => onCreate()}
          variant="default"
          className="ml-4 bg-[oklch(0.72_0.21_152)] hover:bg-[oklch(0.68_0.21_152)] text-[oklch(1_0_0)] dark:bg-[oklch(0.65_0.19_152)] dark:hover:bg-[oklch(0.60_0.19_152)] dark:text-[oklch(0.985_0.002_247.839)] shadow-lg rounded-2xl py-3 px-6 transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
        >
          Create Now!
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              {...resource} 
              onDownload={() => onDownload && resource.pdfUrl && onDownload(resource.pdfUrl)} 
              onClick={
                resource.title === "Column Resume" ? () => onCreate('deedy') :
                resource.title === "Row Resume" ? () => onCreate('row-based') :
                undefined
              }
              className="bg-card text-card-foreground rounded-xl shadow-md p-6 flex flex-col justify-between border border-border transition-colors duration-300" 
            />
        ))}
      </div>
    </section>
  );
};

export default ResourceSection;