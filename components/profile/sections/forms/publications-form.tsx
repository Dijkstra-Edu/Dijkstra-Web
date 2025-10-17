// Publications Form Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { publicationsSchema, type PublicationsFormData } from "@/lib/profile/schemas";
import { parseSkillsString } from "@/lib/profile/profile-utils";
import type { PublicationsData, Tools } from "@/types/client/profile-section/profile-sections";

interface PublicationsFormProps {
  publications: PublicationsData[];
  onAdd: (data: Omit<PublicationsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<PublicationsData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}

export function PublicationsForm({
  publications,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: PublicationsFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<PublicationsFormData>({
    resolver: zodResolver(publicationsSchema),
    defaultValues: {
      title: "",
      publisher: "",
      authors: [],
      publicationDate: "",
      publicationUrl: "",
      description: "",
      tools: [],
      publisherLogo: "",
    },
  });

  const editForm = useForm<PublicationsFormData>({
    resolver: zodResolver(publicationsSchema),
  });

  const onSubmit = (data: PublicationsFormData) => {
    try {
      onAdd({
        ...data,
        tools: data.tools as Tools[],
        publicationUrl: data.publicationUrl || "",
        publisherLogo: data.publisherLogo || "",
        description: data.description || "",
      });
      toast.success("Publication added successfully!");
      form.reset();
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add publication");
    }
  };

  const onEditSubmit = (data: PublicationsFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ 
        id: editingId, 
        data: {
          ...data,
          tools: data.tools as Tools[],
        }
      });
      toast.success("Publication updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update publication");
    }
  };

  const handleEdit = (publication: PublicationsData) => {
    setEditingId(publication.id);
    editForm.reset({
      title: publication.title,
      publisher: publication.publisher,
      authors: publication.authors,
      publicationDate: publication.publicationDate,
      publicationUrl: publication.publicationUrl || "",
      description: publication.description || "",
      tools: publication.tools,
      publisherLogo: publication.publisherLogo || "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this publication?")) {
      onDelete(id);
      toast.success("Publication deleted successfully!");
    }
  };

  const handleAuthorsChange = (authorsString: string) => {
    const authors = authorsString.split(',').map(a => a.trim()).filter(a => a.length > 0);
    form.setValue("authors", authors);
  };

  const handleEditAuthorsChange = (authorsString: string) => {
    const authors = authorsString.split(',').map(a => a.trim()).filter(a => a.length > 0);
    editForm.setValue("authors", authors);
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
      {/* Add New Publication */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Publication</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Optimizing React Performance with Memoization Techniques" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="publisher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publisher</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Medium, IEEE, ACM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="publisherLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publisher Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="authors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authors (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alex Johnson, Dr. Sarah Chen"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => handleAuthorsChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="publicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="publicationUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://medium.com/@alexjohnson/react-performance" {...field} />
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the publication..."
                        rows={3}
                        {...field}
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
                        placeholder="REACTJS, JAVASCRIPT, PERFORMANCE"
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => handleToolsChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Publication'}
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

      {/* Existing Publication Entries */}
      {publications.map((publication) => (
        <div key={publication.id} className="border rounded-lg p-4 space-y-4">
          {editingId === publication.id ? (
            // Edit Form
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="publicationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="authors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authors (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alex Johnson, Dr. Sarah Chen"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => handleEditAuthorsChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  <h5 className="font-medium">{publication.title}</h5>
                  <p className="text-sm text-muted-foreground">{publication.publisher}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(publication)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(publication.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{publication.description}</p>
              <div className="flex flex-wrap gap-1">
                {publication.tools?.map((tool) => (
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
          Add Publication
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
