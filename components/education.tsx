"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Edit, Plus, GraduationCap, Trash2, Save, X } from "lucide-react"
import { MonthPicker } from "@/components/ui/date-picker"
import { InstitutionAutoComplete } from "./institution-autocomplete"
interface Institution{
  name: string
  domain: string
  logo_url?: string
}

interface Education {
  id: string
  institution: Institution | null
  degree: string
  field: string
  startDate: Date
  endDate: Date
  gpa: string
  current: boolean
  description: string
}

export function Education() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [editValidationErrors, setEditValidationErrors] = useState<{[key: string]: string}>({})
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: {name: "University of California, Berkeley", domain: "https://www.berkeley.edu" },
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: new Date(2022, 7), // August 2022
      endDate: new Date(2026, 4), // May 2026
      gpa: "3.8",
      current: true,
      description:
        "Relevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning, Software Engineering, Computer Networks",
    },
    {
      id: "2",
      institution: {name: "Community College of San Francisco" , domain: "https://www.ccsf.edu"},
      degree: "Associate of Science",
      field: "Mathematics",
      startDate: new Date(2020, 7), 
      endDate: new Date(2022, 4), 
      gpa: "3.9",
      current: false,
      description: "Completed general education requirements and advanced mathematics courses",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Education | null>(null)
  const [newForm, setNewForm] = useState<Omit<Education, "id">>({
    institution: null,
    degree: "",
    field: "",
    startDate: new Date(),
    endDate: new Date(),
    gpa: "",
    current: false,
    description: "",
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const validateForm = (form: Omit<Education, "id">) => {
    const errors: {[key: string]: string} = {}
    
    if (!form.institution?.name) {
      errors.institution = "Institution is required"
    }
    if (!form.degree.trim()) {
      errors.degree = "Degree is required"
    }
    if (!form.field.trim()) {
      errors.field = "Field of study is required"
    }
    if (!form.startDate) {
      errors.startDate = "Start date is required"
    }
    if (!form.current && !form.endDate) {
      errors.endDate = "End date is required when not currently studying"
    }
    if (!form.current && form.startDate && form.endDate && form.startDate >= form.endDate) {
      errors.endDate = "End date must be after start date"
    }
    
    return errors
  }

  const validateEditForm = (form: Education) => {
    const errors: {[key: string]: string} = {}
    
    if (!form.institution?.name) {
      errors.institution = "Institution is required"
    }
    if (!form.degree.trim()) {
      errors.degree = "Degree is required"
    }
    if (!form.field.trim()) {
      errors.field = "Field of study is required"
    }
    if (!form.startDate) {
      errors.startDate = "Start date is required"
    }
    if (!form.current && !form.endDate) {
      errors.endDate = "End date is required when not currently studying"
    }
    if (!form.current && form.startDate && form.endDate && form.startDate >= form.endDate) {
      errors.endDate = "End date must be after start date"
    }
    
    return errors
  }

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id)
    setEditForm({ ...edu })
  }

  const handleSave = () => {
    if (editForm) {
      const errors = validateEditForm(editForm)
      setEditValidationErrors(errors)
      
      if (Object.keys(errors).length === 0) {
        setEducation((prev) => prev.map((edu) => (edu.id === editForm.id ? editForm : edu)))
        setEditingId(null)
        setEditForm(null)
        setEditValidationErrors({})
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
    setEditValidationErrors({})
  }

  const handleDelete = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id))
  }

  const handleAdd = () => {
    const errors = validateForm(newForm)
    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      const newEdu: Education = {
        ...newForm,
        id: Date.now().toString(),
      }
      setEducation((prev) => [newEdu, ...prev])
      setNewForm({
        institution: null,
        degree: "",
        field: "",
        startDate: new Date(),
        endDate: new Date(),
        gpa: "",
        current: false,
        description: "",
      })
      setIsAdding(false)
      setValidationErrors({})
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </CardTitle>
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
                      <Label htmlFor="new-degree" className="flex items-center gap-1">
                        Degree <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="new-degree"
                        value={newForm.degree}
                        onChange={(e) => setNewForm({ ...newForm, degree: e.target.value })}
                        placeholder="Bachelor of Science"
                        className={validationErrors.degree ? "border-red-500" : ""}
                      />
                      {validationErrors.degree && (
                        <span className="text-red-500 text-sm">{validationErrors.degree}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-field" className="flex items-center gap-1">
                        Field of Study <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="new-field"
                        value={newForm.field}
                        onChange={(e) => setNewForm({ ...newForm, field: e.target.value })}
                        placeholder="Computer Science"
                        className={validationErrors.field ? "border-red-500" : ""}
                      />
                      {validationErrors.field && (
                        <span className="text-red-500 text-sm">{validationErrors.field}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="new-institution" className="flex items-center gap-1">
                      Institution <span className="text-red-500">*</span>
                    </Label>
                    <InstitutionAutoComplete
                        apiKey={process.env.NEXT_PUBLIC_LOGODEV_API_KEY!}
                        value={newForm.institution?.name || ""}
                        onChange={(val) => setNewForm({ ...newForm, institution: { 
                          name: val.name, 
                          domain: val.domain || "", 
                          logo_url: val.logo_url || "" 
                        }})}
                        selectedInstitution={newForm.institution}
                      />
                    {validationErrors.institution && (
                      <span className="text-red-500 text-sm">{validationErrors.institution}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-start" className="flex items-center gap-1">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <MonthPicker
                        date={newForm.startDate}
                        onDateChange={(date) => setNewForm({ ...newForm, startDate: date || new Date() })}
                        placeholder="Select start date"
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
                        onDateChange={(date) => setNewForm({ ...newForm, endDate: date || new Date() })}
                        placeholder="Select end date"
                        disabled={newForm.current}
                        className={validationErrors.endDate ? "border-red-500" : ""}
                      />
                      {validationErrors.endDate && (
                        <span className="text-red-500 text-sm">{validationErrors.endDate}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-gpa">GPA</Label>
                      <Input
                        id="new-gpa"
                        value={newForm.gpa}
                        onChange={(e) => setNewForm({ ...newForm, gpa: e.target.value })}
                        placeholder="3.8"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-current"
                      checked={newForm.current}
                      onCheckedChange={(checked) => {
                        setNewForm({ ...newForm, current: !!checked, endDate: checked ? new Date() : newForm.endDate })
                        if (checked) {
                          // Clear end date validation error when "currently studying" is checked
                          setValidationErrors(prev => {
                            const newErrors = { ...prev }
                            delete newErrors.endDate
                            return newErrors
                          })
                        }
                      }}
                    />
                    <Label htmlFor="new-current">Currently studying here</Label>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea
                      id="new-description"
                      value={newForm.description}
                      onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                      placeholder="Relevant coursework, achievements, etc."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAdd}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsAdding(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {education.map((edu) => (
            <div key={edu.id} className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />

              {editingId === edu.id && editForm ? (
                <Card className="border-primary">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-degree" className="flex items-center gap-1">
                            Degree <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="edit-degree"
                            value={editForm.degree}
                            onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                            className={editValidationErrors.degree ? "border-red-500" : ""}
                          />
                          {editValidationErrors.degree && (
                            <span className="text-red-500 text-sm">{editValidationErrors.degree}</span>
                          )}
                        </div>
                        <div  className="flex flex-col space-y-2">
                          <Label htmlFor="edit-field" className="flex items-center gap-1">
                            Field of Study <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="edit-field"
                            value={editForm.field}
                            onChange={(e) => setEditForm({ ...editForm, field: e.target.value })}
                            className={editValidationErrors.field ? "border-red-500" : ""}
                          />
                          {editValidationErrors.field && (
                            <span className="text-red-500 text-sm">{editValidationErrors.field}</span>
                          )}
                        </div>
                      </div>
                      <div  className="flex flex-col space-y-2">
                        <Label htmlFor="edit-institution" className="flex items-center gap-1">
                          Institution <span className="text-red-500">*</span>
                        </Label>
                        <InstitutionAutoComplete
                            apiKey={process.env.NEXT_PUBLIC_LOGODEV_API_KEY!}
                            value={editForm.institution?.name || ""}
                            onChange={(val) => setEditForm({ ...editForm, institution: { 
                              name: val.name, 
                              domain: val.domain || "", 
                              logo_url: val.logo_url || "" 
                            }})}
                            selectedInstitution={editForm.institution}
                          />
                        {editValidationErrors.institution && (
                          <span className="text-red-500 text-sm">{editValidationErrors.institution}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div  className="flex flex-col space-y-2">
                          <Label htmlFor="edit-start" className="flex items-center gap-1">
                            Start Date <span className="text-red-500">*</span>
                          </Label>
                          <MonthPicker
                            date={editForm.startDate}
                            onDateChange={(date) => setEditForm({ ...editForm, startDate: date || new Date() })}
                            placeholder="Select start date"
                            className={editValidationErrors.startDate ? "border-red-500" : ""}
                          /> 
                          {editValidationErrors.startDate && (
                            <span className="text-red-500 text-sm">{editValidationErrors.startDate}</span>
                          )}
                        </div>
                        <div  className="flex flex-col space-y-2">
                          <Label htmlFor="edit-end" className="flex items-center gap-1">
                            End Date <span className="text-red-500">*</span>
                          </Label>
                          <MonthPicker
                            date={editForm.endDate}
                            onDateChange={(date) => setEditForm({ ...editForm, endDate: date || new Date() })}
                            placeholder="Select end date"
                            disabled={editForm.current}
                            className={editValidationErrors.endDate ? "border-red-500" : ""}
                          />
                          {editValidationErrors.endDate && (
                            <span className="text-red-500 text-sm">{editValidationErrors.endDate}</span>
                          )}
                        </div>
                        <div  className="flex flex-col space-y-2">
                          <Label htmlFor="edit-gpa">GPA</Label>
                          <Input
                            id="edit-gpa"
                            value={editForm.gpa}
                            onChange={(e) => setEditForm({ ...editForm, gpa: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="edit-current"
                          checked={editForm.current}
                          onCheckedChange={(checked) => {
                            setEditForm({ ...editForm, current: !!checked, endDate: checked ? new Date() : editForm.endDate })
                            if (checked) {
                              // Clear end date validation error when "currently studying" is checked
                              setEditValidationErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.endDate
                                return newErrors
                              })
                            }
                          }}
                        />
                        <Label htmlFor="edit-current">Currently studying here</Label>
                      </div>
                      <div  className="flex flex-col space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
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
                     {edu.institution?.logo_url ? (
                        <img
                          src={edu.institution.logo_url}
                          alt={`${edu.institution.name} logo`}
                          className="w-16 h-16 rounded-lg object-contain border bg-white"
                        />
                      ) : edu.institution ? (
                         <img
                        src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${edu.institution} company logo`)}`}
                        alt={`${edu.institution} logo`}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center">
                          <span className="text-lg font-semibold text-muted-foreground">?</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-primary font-medium">{edu.institution?.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>
                            {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                          </span>
                          <span>GPA: {edu.gpa}</span>
                          {edu.current && <Badge variant="secondary">Current</Badge>}
                        </div>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(edu)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(edu.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
