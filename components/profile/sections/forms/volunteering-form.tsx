// Volunteering Form Component

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
import { volunteeringSchema, type VolunteeringFormData } from "@/lib/profile/schemas";
import { parseSkillsString } from "@/lib/profile/profile-utils";
import type { VolunteeringData, Cause } from "@/types/client/profile-section/profile-sections";

const CAUSES: { value: Cause; label: string }[] = [
  { value: "EDUCATION", label: "Education" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "ENVIRONMENT", label: "Environment" },
  { value: "ANIMAL_WELFARE", label: "Animal Welfare" },
  { value: "HUMAN_RIGHTS", label: "Human Rights" },
  { value: "POVERTY_ALLEVIATION", label: "Poverty Alleviation" },
  { value: "DISASTER_RELIEF", label: "Disaster Relief" },
  { value: "COMMUNITY_DEVELOPMENT", label: "Community Development" },
  { value: "SCIENCE_TECHNOLOGY", label: "Science & Technology" },
  { value: "ARTS_CULTURE", label: "Arts & Culture" },
  { value: "SPORTS", label: "Sports" },
  { value: "OTHER", label: "Other" },
];

interface VolunteeringFormProps {
  volunteerings: VolunteeringData[];
  onAdd: (data: Omit<VolunteeringData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<VolunteeringData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}

export function VolunteeringForm({
  volunteerings,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: VolunteeringFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<VolunteeringFormData>({
    resolver: zodResolver(volunteeringSchema),
    defaultValues: {
      organization: "",
      role: "",
      cause: "EDUCATION",
      startDate: "",
      endDate: "",
      currentlyVolunteering: false,
      description: "",
      tools: [],
      organizationLogo: "",
    },
  });

  const editForm = useForm<VolunteeringFormData>({
    resolver: zodResolver(volunteeringSchema),
  });

  const onSubmit = (data: VolunteeringFormData) => {
    try {
      onAdd(data);
      toast.success("Volunteering experience added successfully!");
      form.reset();
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add volunteering experience");
    }
  };

  const onEditSubmit = (data: VolunteeringFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ id: editingId, data });
      toast.success("Volunteering experience updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update volunteering experience");
    }
  };

  const handleEdit = (volunteering: VolunteeringData) => {
    setEditingId(volunteering.id);
    editForm.reset({
      organization: volunteering.organization,
      role: volunteering.role,
      cause: volunteering.cause,
      startDate: volunteering.startDate,
      endDate: volunteering.endDate || "",
      currentlyVolunteering: volunteering.currentlyVolunteering,
      description: volunteering.description || "",
      tools: volunteering.tools,
      organizationLogo: volunteering.organizationLogo || "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this volunteering experience?")) {
      onDelete(id);
      toast.success("Volunteering experience deleted successfully!");
    }
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
      {/* Add New Volunteering Experience */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Volunteering Experience</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Code for Good" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Lead Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cause" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAUSES.map((cause) => (
                            <SelectItem key={cause.value} value={cause.value}>
                              {cause.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organizationLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Logo URL (Optional)</FormLabel>
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          disabled={form.watch("currentlyVolunteering")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currentlyVolunteering"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(!!checked);
                          if (checked) {
                            form.setValue("endDate", "");
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Currently volunteering here</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your volunteering work and impact..."
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
                    <FormLabel>Technologies Used (comma-separated)</FormLabel>
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

              <div className="flex gap-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Volunteering Experience'}
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

      {/* Existing Volunteering Entries */}
      {volunteerings.map((volunteering) => (
        <div key={volunteering.id} className="border rounded-lg p-4 space-y-4">
          {editingId === volunteering.id ? (
            // Edit Form
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="cause"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cause</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CAUSES.map((cause) => (
                              <SelectItem key={cause.value} value={cause.value}>
                                {cause.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
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
                  name="currentlyVolunteering"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            if (checked) {
                              editForm.setValue("endDate", "");
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently volunteering here</FormLabel>
                      </div>
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

                <FormField
                  control={editForm.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies Used (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="REACTJS, NODEJS, MONGODB"
                          value={field.value.join(", ")}
                          onChange={(e) => handleEditToolsChange(e.target.value)}
                        />
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
                  <h5 className="font-medium">{volunteering.organization}</h5>
                  <p className="text-sm text-muted-foreground">{volunteering.role}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(volunteering)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(volunteering.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{volunteering.description}</p>
              <div className="flex flex-wrap gap-1">
                {volunteering.tools.map((tool) => (
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
          Add Volunteering Experience
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
