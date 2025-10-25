// Education Form Component

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
import { MonthYearPicker } from "../../shared/month-year-picker";
import { InstitutionAutoComplete } from "@/components/institution-autocomplete";
import { Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { educationSchema, type EducationFormData } from "@/lib/profile/schemas";
import { parseSkillsString } from "@/lib/profile/profile-utils";
import type { EducationData, SchoolType, Degree, WorkLocationType, Location, Tools } from "@/types/client/profile-section/profile-sections";

const SCHOOL_TYPES: { value: SchoolType; label: string }[] = [
  { value: "UNIVERSITY", label: "University" },
  { value: "COLLEGE", label: "College" },
  { value: "SCHOOL", label: "School" },
  { value: "COURSE", label: "Course" },
  { value: "BOOTCAMP", label: "Bootcamp" },
  { value: "OTHER", label: "Other" },
];

const DEGREES: { value: Degree; label: string }[] = [
  { value: "BTECH", label: "B.Tech" },
  { value: "BSC", label: "B.Sc" },
  { value: "BE", label: "B.E" },
  { value: "BCA", label: "BCA" },
  { value: "BSCHONS", label: "B.Sc (Hons)" },
  { value: "BDES", label: "B.Des" },
  { value: "BPHIL", label: "B.Phil" },
  { value: "MTECH", label: "M.Tech" },
  { value: "MSC", label: "M.Sc" },
  { value: "ME", label: "M.E" },
  { value: "MCA", label: "MCA" },
  { value: "MSR", label: "M.S.R" },
  { value: "MBA", label: "MBA" },
  { value: "MDES", label: "M.Des" },
  { value: "MPHIL", label: "M.Phil" },
  { value: "PGDM", label: "PGDM" },
  { value: "PHD", label: "PhD" },
  { value: "DENG", label: "D.Eng" },
];

interface EducationFormProps {
  profileId: string;
  educations: EducationData[];
  onAdd: (data: Omit<EducationData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<EducationData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}

export function EducationForm({
  profileId,
  educations,
  onAdd,
  onUpdate,
  onDelete,
  isAdding,
  isUpdating,
  isDeleting,
  onCancel,
}: EducationFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedInstitutionData, setSelectedInstitutionData] = useState<{name: string, logo_url?: string} | null>(null);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      schoolName: "",
      schoolLogoUrl: "",
      schoolType: "UNIVERSITY" as SchoolType,
      degree: "BTECH" as Degree,
      courseFieldName: "",
      currentlyStudying: false,
      location: {
        country: "",
        city: "",
        state: undefined,
        latitude: undefined,
        longitude: undefined,
      },
      locationType: "ON_SITE" as WorkLocationType,
      startDateMonth: new Date().getMonth() + 1,
      startDateYear: new Date().getFullYear(),
      endDateMonth: undefined,
      endDateYear: undefined,
      descriptionGeneral: "",
      descriptionDetailed: "",
      descriptionLess: "",
      workDone: "",
      cgpa: undefined,
      toolsUsed: [],
    },
  });

  const editForm = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit = (data: EducationFormData) => {
    try {
      onAdd({
        ...data,
        schoolType: data.schoolType as SchoolType,
        degree: data.degree as Degree,
        locationType: data.locationType as WorkLocationType,
        toolsUsed: data.toolsUsed as Tools[],
        location: data.location as Location,
        profileId: profileId,
      });
      toast.success("Education added successfully!");
      form.reset();
      setSelectedInstitutionData(null);
      setIsAddingNew(false);
    } catch (error) {
      toast.error("Failed to add education");
    }
  };

  const onEditSubmit = (data: EducationFormData) => {
    if (!editingId) return;
    try {
      onUpdate({ 
        id: editingId, 
        data: {
          ...data,
          schoolType: data.schoolType as SchoolType,
          degree: data.degree as Degree,
          locationType: data.locationType as WorkLocationType,
          toolsUsed: data.toolsUsed as Tools[],
          location: data.location as Location,
          profileId: profileId,
        }
      });
      toast.success("Education updated successfully!");
      editForm.reset();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update education");
    }
  };

  const handleEdit = (education: EducationData) => {
    setEditingId(education.id);
    editForm.reset({
      schoolName: education.schoolName,
      schoolLogoUrl: education.schoolLogoUrl,
      schoolType: education.schoolType,
      degree: education.degree,
      courseFieldName: education.courseFieldName,
      currentlyStudying: education.currentlyStudying,
      location: education.location as Location,
      locationType: education.locationType,
      startDateMonth: education.startDateMonth,
      startDateYear: education.startDateYear,
      endDateMonth: education.endDateMonth,
      endDateYear: education.endDateYear,
      descriptionGeneral: education.descriptionGeneral,
      descriptionDetailed: education.descriptionDetailed,
      descriptionLess: education.descriptionLess,
      workDone: education.workDone,
      cgpa: education.cgpa,
      toolsUsed: education.toolsUsed,
    });
    setSelectedInstitutionData({
      name: education.schoolName,
      logo_url: education.schoolLogoUrl,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      onDelete(id);
      toast.success("Education deleted successfully!");
    }
  };

  const handleToolsChange = (toolsString: string) => {
    const tools = parseSkillsString(toolsString);
    form.setValue("toolsUsed", tools);
  };

  const handleEditToolsChange = (toolsString: string) => {
    const tools = parseSkillsString(toolsString);
    editForm.setValue("toolsUsed", tools);
  };

  return (
    <div className="space-y-6">
      {/* Add New Education */}
      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Add New Education</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <InstitutionAutoComplete
                          value={field.value}
                          onChange={(institution) => {
                            field.onChange(institution.name);
                            form.setValue("schoolLogoUrl", institution.logo_url || "");
                            setSelectedInstitutionData(institution);
                          }}
                          selectedInstitution={selectedInstitutionData}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="courseFieldName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="schoolType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SCHOOL_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DEGREES.map((degree) => (
                            <SelectItem key={degree.value} value={degree.value}>
                              {degree.label}
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
                  name="startDateMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <MonthYearPicker
                          month={form.watch("startDateMonth")}
                          year={form.watch("startDateYear")}
                          onMonthChange={(month) => form.setValue("startDateMonth", month)}
                          onYearChange={(year) => form.setValue("startDateYear", year)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDateMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <MonthYearPicker
                          month={form.watch("endDateMonth") || new Date().getMonth() + 1}
                          year={form.watch("endDateYear") || new Date().getFullYear()}
                          onMonthChange={(month) => form.setValue("endDateMonth", month)}
                          onYearChange={(year) => form.setValue("endDateYear", year)}
                          disabled={form.watch("currentlyStudying")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currentlyStudying"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(!!checked);
                          if (checked) {
                            form.setValue("endDateMonth", undefined);
                            form.setValue("endDateYear", undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Currently studying here</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CGPA (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        max="4" 
                        placeholder="3.8"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descriptionGeneral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your academic achievements and coursework..."
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
                name="toolsUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies & Tools (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Python, Java, C++, Git"
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
                  {isAdding ? 'Adding...' : 'Add Education'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddingNew(false);
                  form.reset();
                  setSelectedInstitutionData(null);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Existing Education Entries */}
      {educations.map((education) => (
        <div key={education.id} className="border rounded-lg p-4 space-y-4">
          {editingId === education.id ? (
            // Edit Form
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <InstitutionAutoComplete
                            value={field.value}
                            onChange={(institution) => {
                              field.onChange(institution.name);
                              editForm.setValue("schoolLogoUrl", institution.logo_url || "");
                              setSelectedInstitutionData(institution);
                            }}
                            selectedInstitution={selectedInstitutionData}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="courseFieldName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="schoolType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SCHOOL_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
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
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DEGREES.map((degree) => (
                              <SelectItem key={degree.value} value={degree.value}>
                                {degree.label}
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
                    control={editForm.control}
                    name="startDateMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <MonthYearPicker
                            month={editForm.watch("startDateMonth")}
                            year={editForm.watch("startDateYear")}
                            onMonthChange={(month) => editForm.setValue("startDateMonth", month)}
                            onYearChange={(year) => editForm.setValue("startDateYear", year)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="endDateMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <MonthYearPicker
                            month={editForm.watch("endDateMonth") || new Date().getMonth() + 1}
                            year={editForm.watch("endDateYear") || new Date().getFullYear()}
                            onMonthChange={(month) => editForm.setValue("endDateMonth", month)}
                            onYearChange={(year) => editForm.setValue("endDateYear", year)}
                            disabled={editForm.watch("currentlyStudying")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="currentlyStudying"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            if (checked) {
                              editForm.setValue("endDateMonth", undefined);
                              editForm.setValue("endDateYear", undefined);
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently studying here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGPA (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          max="4" 
                          placeholder="3.8"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="descriptionGeneral"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your academic achievements and coursework..."
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
                  name="toolsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies & Tools (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Python, Java, C++, Git"
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
                    setSelectedInstitutionData(null);
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
                  <h5 className="font-medium">{education.schoolName}</h5>
                  <p className="text-sm text-muted-foreground">{education.degree} in {education.courseFieldName}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(education)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(education.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{education.descriptionGeneral}</p>
              <div className="flex flex-wrap gap-1">
                {education.toolsUsed.map((tool) => (
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
          Add Education
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
