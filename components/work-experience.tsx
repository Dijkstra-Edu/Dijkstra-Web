"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Edit, Plus, Trash2, Save, X } from "lucide-react"
import { MonthPicker } from "@/components/ui/date-picker"
import { CompanyAutoComplete } from "./autocompletes/company-autocomplete"

interface Company {
  name: string
  domain?: string
  logo_url?: string
}

interface WorkExperience {
  id: string
  company: Company | null
  position: string
  startDate: Date
  endDate: Date
  current: boolean
  description: string
  skills: string[]
}

// Draft type used for the Add form where dates can be left blank until chosen
type WorkExperienceDraft = Omit<WorkExperience, "id" | "startDate" | "endDate"> & {
  startDate?: Date
  endDate?: Date
}

export function WorkExperience() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      company: { name: "TechCorp Inc.", domain: "techcorp.com" },
      position: "Software Engineering Intern",
      startDate: new Date(2024, 5), // June 2024
      endDate: new Date(2024, 7), // August 2024
      current: false,
      description:
        "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes. Participated in code reviews and agile development processes.",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    },
    {
      id: "2",
      company: { name: "University Research Lab" },
      position: "Research Assistant",
      startDate: new Date(2024, 0), // January 2024
      endDate: new Date(),
      current: true,
      description:
        "Conducting research on machine learning algorithms for natural language processing. Implementing and testing various ML models using Python and TensorFlow.",
      skills: ["Python", "TensorFlow", "Machine Learning", "NLP"],
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<WorkExperience | null>(null)
  const [newForm, setNewForm] = useState<WorkExperienceDraft>({
    company: null,
    position: "",
    startDate: undefined,
    endDate: undefined,
    current: false,
    description: "",
    skills: [],
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const calculateExperience = (startDate: Date, endDate: Date, isCurrent: boolean) => {
    const end = isCurrent ? new Date() : endDate
    const years = end.getFullYear() - startDate.getFullYear()
    const months = end.getMonth() - startDate.getMonth()
    
    // Calculate total months
    let totalMonths = years * 12 + months
    
    // If we're still in the same month or earlier in the current month, subtract 1
    if (end.getDate() < startDate.getDate()) {
      totalMonths--
    }
    
    // Convert back to years and months
    const finalYears = Math.floor(totalMonths / 12)
    const finalMonths = totalMonths % 12
    
    if (finalYears === 0) {
      return finalMonths === 1 ? "1 month" : `${finalMonths} months`
    } else if (finalMonths === 0) {
      return finalYears === 1 ? "1 year" : `${finalYears} years`
    } else {
      const yearText = finalYears === 1 ? "1 year" : `${finalYears} years`
      const monthText = finalMonths === 1 ? "1 month" : `${finalMonths} months`
      return `${yearText}, ${monthText}`
    }
  }

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [editValidationErrors, setEditValidationErrors] = useState<{[key: string]: string}>({})

  const validateForm = (form: WorkExperienceDraft) => {
    const errors: {[key: string]: string} = {}
    
    if (!form.company?.name) {
      errors.company = "Company is required"
    }
    if (!form.position.trim()) {
      errors.position = "Position is required"
    }
    if (!form.startDate) {
      errors.startDate = "Start date is required"
    }
    if (!form.current && !form.endDate) {
      errors.endDate = "End date is required when not currently working"
    }
    if (!form.current && form.startDate && form.endDate && form.startDate >= form.endDate) {
      errors.endDate = "End date must be after start date"
    }
    
    return errors
  }

  const validateEditForm = (form: WorkExperience) => {
    const errors: {[key: string]: string} = {}
    
    if (!form.company?.name) {
      errors.company = "Company is required"
    }
    if (!form.position.trim()) {
      errors.position = "Position is required"
    }
    if (!form.startDate) {
      errors.startDate = "Start date is required"
    }
    if (!form.current && !form.endDate) {
      errors.endDate = "End date is required when not currently working"
    }
    if (!form.current && form.startDate && form.endDate && form.startDate >= form.endDate) {
      errors.endDate = "End date must be after start date"
    }
    
    return errors
  }

  const handleEdit = (exp: WorkExperience) => {
    setEditingId(exp.id)
    setEditForm({ ...exp })
  }

  const handleSave = () => {
    if (editForm) {
      const errors = validateEditForm(editForm)
      if (Object.keys(errors).length > 0) {
        setEditValidationErrors(errors)
        return
      }
      
      setExperiences((prev) => prev.map((exp) => (exp.id === editForm.id ? editForm : exp)))
      setEditingId(null)
      setEditForm(null)
      setEditValidationErrors({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
    setEditValidationErrors({})
  }

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const handleAdd = () => {
    const errors = validateForm(newForm)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    
    const newExp: WorkExperience = {
      // dates are guaranteed by validation above
      ...(newForm as Omit<WorkExperience, "id"> & { startDate: Date; endDate: Date }),
      id: Date.now().toString(),
    }
    setExperiences((prev) => [newExp, ...prev])
    setNewForm({
      company: null,
      position: "",
      startDate: undefined,
      endDate: undefined,
      current: false,
      description: "",
      skills: [],
    })
    setIsAdding(false)
    setValidationErrors({})
  }

  const handleSkillsChange = (skillsString: string, isEdit = false) => {
    const skillsArray = skillsString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)
    if (isEdit && editForm) {
      setEditForm({ ...editForm, skills: skillsArray })
    } else {
      setNewForm({ ...newForm, skills: skillsArray })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant={isEditing ? "destructive" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit"}
            </Button>
            <Button size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isAdding && (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-position" className="flex items-center gap-1">
                        Position <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="new-position"
                        value={newForm.position}
                        onChange={(e) => setNewForm({ ...newForm, position: e.target.value })}
                        placeholder="e.g. Software Engineer"
                        className={validationErrors.position ? "border-red-500" : ""}
                      />
                      {validationErrors.position && (
                        <span className="text-red-500 text-sm">{validationErrors.position}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label className="flex items-center gap-1">
                        Company <span className="text-red-500">*</span>
                      </Label>
                      <CompanyAutoComplete
                        value={newForm.company?.name || ""}
                        onChange={(val) => setNewForm({ ...newForm, company: { 
                          name: val.name, 
                          domain: val.domain || "", 
                          logo_url: val.logo_url || "" 
                        }})}
                        selectedCompany={newForm.company}
                      />
                      {validationErrors.company && (
                        <span className="text-red-500 text-sm">{validationErrors.company}</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-start" className="flex items-center gap-1">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <MonthPicker
                        date={newForm.startDate}
                        onDateChange={(date) => setNewForm({ ...newForm, startDate: date })}
                        placeholder="Select start month"
                        className={validationErrors.startDate ? "border-red-500" : ""}
                      />
                      {validationErrors.startDate && (
                        <span className="text-red-500 text-sm">{validationErrors.startDate}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-end" className="flex items-center gap-1">
                        End Date {!newForm.current && <span className="text-red-500">*</span>}
                      </Label>
                      <MonthPicker
                        date={newForm.endDate}
                        onDateChange={(date) => setNewForm({ ...newForm, endDate: date })}
                        placeholder="Select end month"
                        disabled={newForm.current}
                        className={validationErrors.endDate ? "border-red-500" : ""}
                      />
                      {validationErrors.endDate && (
                        <span className="text-red-500 text-sm">{validationErrors.endDate}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-current"
                      checked={newForm.current}
                      onCheckedChange={(checked) => {
                        setNewForm({ ...newForm, current: !!checked, endDate: checked ? new Date() : newForm.endDate })
                        if (checked) {
                          // Clear end date validation error when "currently working" is checked
                          setValidationErrors(prev => {
                            const newErrors = { ...prev }
                            delete newErrors.endDate
                            return newErrors
                          })
                        }
                      }}
                    />
                    <Label htmlFor="new-current">Currently working here</Label>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea
                      id="new-description"
                      value={newForm.description}
                      onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                      placeholder="Describe your role and achievements..."
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="new-skills">Skills (comma-separated)</Label>
                    <Input
                      id="new-skills"
                      value={newForm.skills.join(", ")}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      placeholder="React, Node.js, TypeScript"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAdd}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setIsAdding(false)
                      setValidationErrors({})
                    }}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {experiences.map((exp) => (
            <div key={exp.id} className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />

              {editingId === exp.id && editForm ? (
                <Card className="border-primary">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">  
                          <Label htmlFor="edit-position" className="flex items-center gap-1">
                            Position <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="edit-position"
                            value={editForm.position}
                            onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                            className={editValidationErrors.position ? "border-red-500" : ""}
                          />
                          {editValidationErrors.position && (
                            <span className="text-red-500 text-sm">{editValidationErrors.position}</span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-company" className="flex items-center gap-1">
                            Company <span className="text-red-500">*</span>
                          </Label>
                          <CompanyAutoComplete
                            value={editForm.company?.name || ""}
                            onChange={(val) => setEditForm({ ...editForm, company: { 
                              name: val.name, 
                              domain: val.domain || "", 
                              logo_url: val.logo_url || "" 
                            }})}
                            selectedCompany={editForm.company}
                          />
                          {editValidationErrors.company && (
                            <span className="text-red-500 text-sm">{editValidationErrors.company}</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-start" className="flex items-center gap-1">
                            Start Date <span className="text-red-500">*</span>
                          </Label>
                          <MonthPicker
                            date={editForm.startDate}
                            onDateChange={(date) => setEditForm({ ...editForm, startDate: date || new Date() })}
                            placeholder="Select start month"
                            className={editValidationErrors.startDate ? "border-red-500" : ""}
                          />
                          {editValidationErrors.startDate && (
                            <span className="text-red-500 text-sm">{editValidationErrors.startDate}</span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-end" className="flex items-center gap-1">
                            End Date {!editForm.current && <span className="text-red-500">*</span>}
                          </Label>
                          <MonthPicker
                            date={editForm.endDate}
                            onDateChange={(date) => setEditForm({ ...editForm, endDate: date || new Date() })}
                            placeholder="Select end month"
                            disabled={editForm.current}
                            className={editValidationErrors.endDate ? "border-red-500" : ""}
                          />
                          {editValidationErrors.endDate && (
                            <span className="text-red-500 text-sm">{editValidationErrors.endDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="edit-current"
                          checked={editForm.current}
                          onCheckedChange={(checked) => {
                            setEditForm({ ...editForm, current: !!checked, endDate: checked ? new Date() : editForm.endDate })
                            if (checked) {
                              // Clear end date validation error when "currently working" is checked
                              setEditValidationErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.endDate
                                return newErrors
                              })
                            }
                          }}
                        />
                        <Label htmlFor="edit-current">Currently working here</Label>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
                        <Input
                          id="edit-skills"
                          value={editForm.skills.join(", ")}
                          onChange={(e) => handleSkillsChange(e.target.value, true)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {exp.company?.logo_url ? (
                        <img
                          src={exp.company.logo_url}
                          alt={`${exp.company.name} logo`}
                          className="w-16 h-16 rounded-lg object-contain border bg-white"
                        />
                      ) : exp.company ? (
                         <img
                        src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${exp.company} company logo`)}`}
                        alt={`${exp.company} logo`}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center">
                          <span className="text-lg font-semibold text-muted-foreground">?</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg">{exp.position}</h4>
                        <p className="text-primary font-medium">{exp.company?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          {exp.current && (
                            <Badge variant="secondary" className="ml-2">
                              Current
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                          {calculateExperience(exp.startDate, exp.endDate, exp.current)} experience
                        </p>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(exp)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(exp.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
