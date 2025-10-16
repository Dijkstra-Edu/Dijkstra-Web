// Work Experience Form Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MonthPicker } from "@/components/ui/date-picker";
import { CompanyAutoComplete } from "@/components/company-autocomplete";
import { Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { workExperienceSchema, type WorkExperienceFormData } from "@/lib/profile/schemas";
import { parseSkillsString } from "@/lib/profile/profile-utils";
import type { WorkExperienceData } from "@/types/profile-sections";

interface WorkExperienceFormProps {
  experiences: WorkExperienceData[];
  onAdd: (data: Omit<WorkExperienceData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<WorkExperienceData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}


export function WorkExperienceForm({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: WorkExperienceFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCompanyData, setSelectedCompanyData] = useState<{name: string, logo_url?: string} | null>(null);

  const form = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      company: null,
      position: "",
      startDate: new Date(),
      endDate: null,
      current: false,
      description: "",
      skills: [],
    },
  });

  const editForm = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
  });

  const onSubmit = (data: WorkExperienceFormData) => {
    try {
      onAdd(data);
      toast.success("Work experience added successfully!");
      form.reset();
      setSelectedCompanyData(null);
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add work experience");
    }
  };

  const onEditSubmit = (data: WorkExperienceFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ id: editingId, data });
      toast.success("Work experience updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update work experience");
    }
  };

  const handleEdit = (experience: WorkExperienceData) => {
    setEditingId(experience.id);
    editForm.reset({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      skills: experience.skills,
    });
    setSelectedCompanyData(experience.company);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this work experience?")) {
      onDelete(id);
      toast.success("Work experience deleted successfully!");
    }
  };

  const handleSkillsChange = (skillsString: string) => {
    const skills = parseSkillsString(skillsString);
    form.setValue("skills", skills);
  };

  const handleEditSkillsChange = (skillsString: string) => {
    const skills = parseSkillsString(skillsString);
    editForm.setValue("skills", skills);
  };

  return (
    <div className="space-y-6">
      {/* Add New Experience */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Work Experience</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <CompanyAutoComplete
                          value={field.value?.name || ""}
                          onChange={(company) => {
                            field.onChange(company);
                            setSelectedCompanyData(company);
                          }}
                          selectedCompany={selectedCompanyData}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer" {...field} />
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
                        <MonthPicker
                          date={field.value}
                          onDateChange={field.onChange}
                        />
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
                        <MonthPicker
                          date={field.value || undefined}
                          onDateChange={(date) => field.onChange(date || null)}
                          disabled={form.watch("current")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(!!checked);
                          if (checked) {
                            form.setValue("endDate", null);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Currently working here</FormLabel>
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
                        placeholder="Describe your role and achievements..."
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
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="React, Node.js, TypeScript"
                        value={field.value.join(", ")}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Experience'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddingNew(false);
                  form.reset();
                  setSelectedCompanyData(null);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Existing Experiences */}
      {experiences.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-4 space-y-4">
          {editingId === experience.id ? (
            // Edit Form
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <CompanyAutoComplete
                            value={field.value?.name || ""}
                            onChange={(company) => {
                              field.onChange(company);
                              setSelectedCompanyData(company);
                            }}
                            selectedCompany={selectedCompanyData}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <MonthPicker
                            date={field.value}
                            onDateChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <MonthPicker
                            date={field.value || undefined}
                            onDateChange={(date) => field.onChange(date || null)}
                            disabled={editForm.watch("current")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            if (checked) {
                              editForm.setValue("endDate", null);
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently working here</FormLabel>
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
                        <Textarea
                          placeholder="Describe your role and achievements..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, TypeScript"
                          value={field.value.join(", ")}
                          onChange={(e) => handleEditSkillsChange(e.target.value)}
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
                    setSelectedCompanyData(null);
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
                  <h5 className="font-medium">{experience.position}</h5>
                  <p className="text-sm text-muted-foreground">{experience.company?.name || 'No company specified'}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(experience.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{experience.description}</p>
              <div className="flex flex-wrap gap-1">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-muted rounded-md text-xs"
                  >
                    {skill}
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
          Add Work Experience
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
