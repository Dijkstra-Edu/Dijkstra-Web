// Skills Form Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Edit, Trash2, Save, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { skillsSchema, type SkillsFormData } from "@/lib/profile/schemas";
import { SKILL_CATEGORIES } from "@/constants/profile-constants";
import type { SkillsData, Tools, Domain } from "@/types/client/profile-section/profile-sections";

interface SkillsFormProps {
  skills: SkillsData[];
  onAdd: (data: Omit<SkillsData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<SkillsData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}

export function SkillsForm({
  skills,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: SkillsFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skill: "",
      domain: "",
      proficiency: 50,
      yearsOfExperience: 0,
    },
  });

  const editForm = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
  });

  const onSubmit = (data: SkillsFormData) => {
    try {
      onAdd({
        ...data,
        skill: data.skill as Tools,
        domain: data.domain as Domain,
        profileId: "", // This will be set by the parent component
      });
      toast.success("Skill added successfully!");
      form.reset();
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add skill");
    }
  };

  const onEditSubmit = (data: SkillsFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ 
        id: editingId, 
        data: {
          ...data,
          skill: data.skill as Tools,
          domain: data.domain as Domain,
        }
      });
      toast.success("Skill updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update skill");
    }
  };

  const handleEdit = (skill: SkillsData) => {
    setEditingId(skill.id);
    editForm.reset({
      skill: skill.skill,
      domain: skill.domain,
      proficiency: skill.proficiency,
      yearsOfExperience: skill.yearsOfExperience,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      onDelete(id);
      toast.success("Skill deleted successfully!");
    }
  };

  // Group skills by domain
  const skillsByCategory = skills.reduce((acc, skill) => {
    const domain = skill.domain || "Other";
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(skill);
    return acc;
  }, {} as Record<string, SkillsData[]>);

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Skill</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., React, Python, AWS" {...field} />
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
                          {SKILL_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="proficiency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency Level (1-100)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="100" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Skill'}
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

      {/* Existing Skills by Category */}
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="space-y-4">
          <h4 className="font-semibold text-lg border-b pb-2">{category}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySkills.map((skill) => (
              <div key={skill.id} className="border rounded-lg p-4 space-y-3">
                {editingId === skill.id ? (
                  // Edit Form
                  <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-3">
                      <FormField
                        control={editForm.control}
                        name="skill"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Skill name" {...field} />
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
                            <FormLabel className="text-sm">Domain</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SKILL_CATEGORIES.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
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
                        name="proficiency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Proficiency</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="100" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Years</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                step="0.1"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button type="submit" size="sm" disabled={isUpdating}>
                          <Save className="w-3 h-3 mr-1" />
                          {isUpdating ? 'Saving...' : 'Save'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingId(null);
                            editForm.reset();
                          }}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  // Display Mode
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium">{skill.skill}</h5>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(skill)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(skill.id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Proficiency: {skill.proficiency}/100</p>
                      <p>Experience: {skill.yearsOfExperience} years</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add New Button */}
      {!isAddingNew && (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
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