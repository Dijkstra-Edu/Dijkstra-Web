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
import { MonthYearPicker } from "../../shared/month-year-picker";
import { CompanyAutoComplete } from "@/components/autocompletes/company-autocomplete";
import { LocationAutoComplete } from "@/components/autocompletes/location-autocomplete";
import { ToolsMultiSelect } from "@/components/autocompletes/tools-multi-select";
import { DomainMultiSelect } from "@/components/autocompletes/domain-multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { workExperienceSchema, type WorkExperienceFormData } from "@/lib/profile/schemas";
import { EMPLOYMENT_TYPE_OPTIONS, WORK_LOCATION_TYPE_OPTIONS } from "@/constants/enum-constants";
import type { WorkExperienceData, EmploymentType, WorkLocationType, Domain, Tools, Location } from "@/types/client/profile-section/profile-sections";

interface WorkExperienceFormProps {
  profileId: string;
  experiences: WorkExperienceData[];
  onAdd: (data: Omit<WorkExperienceData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (data: { id: string; data: Partial<WorkExperienceData> }) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}


export function WorkExperienceForm({
  profileId,
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
      title: "",
      employmentType: "FULL_TIME",
      domain: [],
      companyName: "",
      companyLogo: "",
      currentlyWorking: false,
      location: {
        country: "",
        city: "",
        state: "",
        latitude: undefined,
        longitude: undefined,
      },
      locationType: "ON_SITE",
      startDateMonth: new Date().getMonth() + 1,
      startDateYear: new Date().getFullYear(),
      endDateMonth: undefined,
      endDateYear: undefined,
      descriptionGeneral: "",
      descriptionDetailed: "",
      descriptionLess: "",
      workDone: "",
      toolsUsed: [],
    },
  });

  const stripLogoDevToken = (url: string): string => {
    if (url.includes('logo.dev') && url.includes('?token=')) {
      return url.split('?token=')[0];
    }
    return url;
  };

  const editForm = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
  });

  const onSubmit = (data: WorkExperienceFormData) => {
    console.log("Adding work experience", data);
    try {
      onAdd({
        ...data,
        employmentType: data.employmentType as EmploymentType,
        locationType: data.locationType as WorkLocationType,
        location: data.location as Location,
        domain: data.domain as Domain[],
        toolsUsed: data.toolsUsed as Tools[],
        companyLogo: stripLogoDevToken(data.companyLogo || ""),
        profileId: profileId,
      });
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
      onUpdate({ 
        id: editingId, 
        data: {
          ...data,
          employmentType: data.employmentType as EmploymentType,
          locationType: data.locationType as WorkLocationType,
          location: data.location as Location,
          domain: data.domain as Domain[],
          toolsUsed: data.toolsUsed as Tools[],
          companyLogo: stripLogoDevToken(data.companyLogo || ""),
          profileId: profileId,
        }
      });
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
      title: experience.title,
      employmentType: experience.employmentType,
      domain: experience.domain,
      companyName: experience.companyName,
      companyLogo: experience.companyLogo,
      currentlyWorking: experience.currentlyWorking,
      locationType: experience.locationType,
      location: experience.location as Location,
      startDateMonth: experience.startDateMonth,
      startDateYear: experience.startDateYear,
      endDateMonth: experience.endDateMonth,
      endDateYear: experience.endDateYear,
      descriptionGeneral: experience.descriptionGeneral,
      descriptionDetailed: experience.descriptionDetailed,
      descriptionLess: experience.descriptionLess,
      workDone: experience.workDone,
      toolsUsed: experience.toolsUsed,
    });
    setSelectedCompanyData({
      name: experience.companyName,
      logo_url: experience.companyLogo,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this work experience?")) {
      onDelete(id);
      toast.success("Work experience deleted successfully!");
    }
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <CompanyAutoComplete
                          value={field.value}
                          onChange={(company) => {
                            field.onChange(company.name);
                            form.setValue("companyLogo", company.logo_url || "");
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
                  name="title"
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
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <DomainMultiSelect
                          value={field.value as Domain[] || []}
                          onChange={field.onChange}
                          placeholder="Select domains"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <LocationAutoComplete
                        value={field.value ? `${field.value.city}, ${field.value.country}` : ""}
                        onChange={(location) => {
                          field.onChange(location);
                        }}
                        selectedLocation={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Location Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work location type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WORK_LOCATION_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          disabled={form.watch("currentlyWorking")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currentlyWorking"
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
                      <FormLabel>Currently working here</FormLabel>
                    </div>
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
                      <Tabs defaultValue="general" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="general">General</TabsTrigger>
                          <TabsTrigger value="short">Short</TabsTrigger>
                          <TabsTrigger value="detailed">Detailed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="mt-4">
                          <Textarea
                            placeholder="Describe your role and achievements..."
                            rows={3}
                            {...field}
                          />
                        </TabsContent>
                        <TabsContent value="short" className="mt-4">
                          <FormField
                            control={form.control}
                            name="descriptionLess"
                            render={({ field: shortField }) => (
                              <Textarea
                                placeholder="Brief description..."
                                rows={3}
                                {...shortField}
                              />
                            )}
                          />
                        </TabsContent>
                        <TabsContent value="detailed" className="mt-4">
                          <FormField
                            control={form.control}
                            name="descriptionDetailed"
                            render={({ field: detailedField }) => (
                              <Textarea
                                placeholder="Detailed description..."
                                rows={5}
                                {...detailedField}
                              />
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workDone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Done</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the specific work you accomplished..."
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
                    <FormLabel>Tools & Technologies</FormLabel>
                    <FormControl>
                      <ToolsMultiSelect
                        value={field.value as Tools[] || []}
                        onChange={field.onChange}
                        placeholder="Select tools and technologies"
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
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <CompanyAutoComplete
                            value={field.value || ""}
                            onChange={(company) => {
                              field.onChange(company.name);
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
                    name="title"
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
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
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
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <DomainMultiSelect
                            value={field.value as Domain[] || []}
                            onChange={field.onChange}
                            placeholder="Select domains"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <LocationAutoComplete
                          value={field.value ? `${field.value.city}, ${field.value.country}` : ""}
                          onChange={(location) => {
                            field.onChange(location);
                          }}
                          selectedLocation={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="locationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Location Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select work location type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WORK_LOCATION_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            disabled={editForm.watch("currentlyWorking")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="currentlyWorking"
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
                        <FormLabel>Currently working here</FormLabel>
                      </div>
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
                        <Tabs defaultValue="general" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="short">Short</TabsTrigger>
                            <TabsTrigger value="detailed">Detailed</TabsTrigger>
                          </TabsList>
                          <TabsContent value="general" className="mt-4">
                            <Textarea
                              placeholder="Describe your role and achievements..."
                              rows={3}
                              {...field}
                            />
                          </TabsContent>
                          <TabsContent value="short" className="mt-4">
                            <FormField
                              control={editForm.control}
                              name="descriptionLess"
                              render={({ field: shortField }) => (
                                <Textarea
                                  placeholder="Brief description..."
                                  rows={3}
                                  {...shortField}
                                />
                              )}
                            />
                          </TabsContent>
                          <TabsContent value="detailed" className="mt-4">
                            <FormField
                              control={editForm.control}
                              name="descriptionDetailed"
                              render={({ field: detailedField }) => (
                                <Textarea
                                  placeholder="Detailed description..."
                                  rows={5}
                                  {...detailedField}
                                />
                              )}
                            />
                          </TabsContent>
                        </Tabs>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="workDone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Done</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the specific work you accomplished..."
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
                      <FormLabel>Tools & Technologies</FormLabel>
                      <FormControl>
                        <ToolsMultiSelect
                          value={field.value as Tools[] || []}
                          onChange={field.onChange}
                          placeholder="Select tools and technologies"
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
                  <h5 className="font-medium">{experience.title}</h5>
                  <p className="text-sm text-muted-foreground">{experience.companyName}</p>
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
              <p className="text-sm text-muted-foreground">{experience.descriptionGeneral}</p>
              <div className="flex flex-wrap gap-1">
                {experience.toolsUsed.map((tool) => (
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
