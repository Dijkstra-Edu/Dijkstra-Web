// Projects Form Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { projectsSchema, type ProjectsFormData } from "@/lib/profile/schemas";
import { parseSkillsString } from "@/lib/profile/profile-utils";
import type { ProjectsData, Domain, Tools } from "@/types/client/profile-section/profile-sections";

const DOMAINS: { value: Domain; label: string }[] = [
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "FULLSTACK", label: "Full Stack" },
  { value: "ANDROID", label: "Android" },
  { value: "IOS", label: "iOS" },
  { value: "CROSS_PLATFORM_MOBILE", label: "Cross Platform Mobile" },
  { value: "GAME_DEV", label: "Game Development" },
  { value: "ML_ENGINEERING", label: "ML Engineering" },
  { value: "DATA_SCIENCE_ANALYSIS", label: "Data Science" },
  { value: "APPLICATION_SECURITY", label: "Application Security" },
  { value: "CLOUD", label: "Cloud" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "EMBEDDED_IOT", label: "Embedded/IoT" },
  { value: "UI_UX", label: "UI/UX" },
  { value: "OTHER", label: "Other" },
];

const TESTING_FRAMEWORKS = [
  "Jest", "Mocha", "Chai", "Cypress", "Selenium", "Pytest", "JUnit", "TestNG", "RSpec", "PHPUnit", "Other"
];

interface ProjectsFormProps {
  projects: ProjectsData[];
  onAdd: (data: Omit<ProjectsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<ProjectsData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}

export function ProjectsForm({
  projects,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: ProjectsFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      name: "",
      organization: "Personal",
      owner: "",
      private: false,
      githubStars: 0,
      githubAbout: "",
      githubOpenIssues: 0,
      githubForks: 0,
      description: "",
      domain: "FULLSTACK" as Domain,
      topics: [],
      tools: [],
      readme: true,
      license: true,
      landingPage: false,
      landingPageLink: "",
      docsPage: false,
      docsPageLink: "",
      ownDomainName: false,
      totalLinesContributed: 0,
      improperUploads: false,
      complexityRating: 5,
      testingFrameworkPresent: false,
      testingFramework: "Jest",
      projectOrganizationLogo: "",
    },
  });

  const editForm = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
  });

  const onSubmit = (data: ProjectsFormData) => {
    try {
      onAdd({
        ...data,
        domain: data.domain as Domain,
        tools: data.tools as Tools[],
      });
      toast.success("Project added successfully!");
      form.reset();
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  const onEditSubmit = (data: ProjectsFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ 
        id: editingId, 
        data: {
          ...data,
          domain: data.domain as Domain,
          tools: data.tools as Tools[],
        }
      });
      toast.success("Project updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  const handleEdit = (project: ProjectsData) => {
    setEditingId(project.id);
    editForm.reset({
      name: project.name,
      organization: project.organization,
      owner: project.owner,
      private: project.private,
      githubStars: project.githubStars,
      githubAbout: project.githubAbout,
      githubOpenIssues: project.githubOpenIssues,
      githubForks: project.githubForks,
      description: project.description,
      domain: project.domain,
      topics: project.topics,
      tools: project.tools,
      readme: project.readme,
      license: project.license,
      landingPage: project.landingPage,
      landingPageLink: project.landingPageLink,
      docsPage: project.docsPage,
      docsPageLink: project.docsPageLink,
      ownDomainName: project.ownDomainName,
      totalLinesContributed: project.totalLinesContributed,
      improperUploads: project.improperUploads,
      complexityRating: project.complexityRating,
      testingFrameworkPresent: project.testingFrameworkPresent,
      testingFramework: project.testingFramework,
      projectOrganizationLogo: project.projectOrganizationLogo,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onDelete(id);
      toast.success("Project deleted successfully!");
    }
  };

  const handleTopicsChange = (topicsString: string) => {
    const topics = topicsString.split(',').map(t => t.trim()).filter(t => t.length > 0);
    form.setValue("topics", topics);
  };

  const handleEditTopicsChange = (topicsString: string) => {
    const topics = topicsString.split(',').map(t => t.trim()).filter(t => t.length > 0);
    editForm.setValue("topics", topics);
  };

  const handleToolsChange = (toolsString: string) => {
    const tools = parseSkillsString(toolsString);
    form.setValue("tools", tools);
  };

  const handleEditToolsChange = (toolsString: string) => {
    const tools = parseSkillsString(toolsString);
    editForm.setValue("tools", tools);
  };

  return (
    <div className="space-y-6">
      {/* Add New Project */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Project</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., E-Commerce Platform" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Owner</FormLabel>
                      <FormControl>
                        <Input placeholder="yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Personal, University, Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DOMAINS.map((domain) => (
                            <SelectItem key={domain.value} value={domain.value}>
                              {domain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="githubAbout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description for GitHub" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comprehensive description of the project..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topics (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="react, nodejs, mongodb"
                          value={field.value.join(", ")}
                          onChange={(e) => handleTopicsChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="REACTJS, NODEJS, MONGODB"
                          value={field.value.join(", ")}
                          onChange={(e) => handleToolsChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="githubStars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Stars</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="githubForks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Forks</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="complexityRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complexity Rating (1-10)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 5)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="landingPageLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landing Page URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourproject.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="docsPageLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documentation URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://docs.yourproject.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="readme"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Has README</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Has License</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="landingPage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Has Landing Page</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="docsPage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Has Documentation</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Project'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddingNew(false);
                  form.reset();
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Existing Project Entries */}
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 space-y-4">
          {editingId === project.id ? (
            // Edit Form (simplified for brevity - would include all fields)
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DOMAINS.map((domain) => (
                              <SelectItem key={domain.value} value={domain.value}>
                                {domain.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isUpdating}>
                    <Save className="w-4 h-4 mr-2" />
                    {isUpdating ? 'Updating...' : 'Update'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setEditingId(null);
                    editForm.reset();
                  }}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            // Display Mode
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">{project.name}</h5>
                  <p className="text-sm text-muted-foreground">{project.githubAbout}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-muted rounded-md text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Button */}
      {!isAddingNew && (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full"
        >
          Add Project
        </Button>
      )}

      {/* Cancel Button */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={onCancel}>
          Done Editing
        </Button>
      </div>
    </div>
  );
}
