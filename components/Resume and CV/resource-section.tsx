import { ResourceCard } from "@/components/Resume and CV/resource-card";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: "charcoal" | "taupe" | "slateBlue" | "bronze";
  img_placeholder: string;
  pdfUrl?: string;
  template?: "deedy" | "row-based";
}

interface ResourceSectionProps {
  title: string;
  resources: ResourceItem[];
  onCreate: (template?: "deedy" | "row-based") => void;
  onDownload?: (pdfUrl: string) => void;
}

export const ResourceSection = ({
  title,
  resources,
  onCreate,
  onDownload,
}: ResourceSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <Button
          onClick={() => onCreate()}
          className="rounded-xl bg-primary hover:bg-primary/90 cursor-pointer text-white shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5"
        >
          + Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            {...resource}
            onDownload={() =>
              onDownload && resource.pdfUrl && onDownload(resource.pdfUrl)
            }
            onClick={() => onCreate(resource.template)}
            className="bg-card text-card-foreground rounded-2xl shadow-sm hover:shadow-md border border-border hover:border-primary/40 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default ResourceSection;
