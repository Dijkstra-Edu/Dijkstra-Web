import { ResourceCard } from "@/components/resource-card";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'teal';
  icon: React.ReactNode;
}

interface ResourceSectionProps {
  title: string;
  resources: ResourceItem[];
}

export const ResourceSection = ({ title, resources }: ResourceSectionProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>
    </section>
  );
};

export default ResourceSection; 