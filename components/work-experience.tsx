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
import { CompanyAutoComplete } from "./company-autocomplete"

interface Company {
  name: string
  domain?: string
  logo_url?: string
}

interface WorkExperience {
  id: string
  company: Company | null
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  skills: string[]
}

export function WorkExperience() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      company: { name: "TechCorp Inc.", domain: "techcorp.com" },
      position: "Software Engineering Intern",
      startDate: "2024-06",
      endDate: "2024-08",
      current: false,
      description:
        "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes. Participated in code reviews and agile development processes.",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    },
    {
      id: "2",
      company: { name: "University Research Lab" },
      position: "Research Assistant",
      startDate: "2024-01",
      endDate: "",
      current: true,
      description:
        "Conducting research on machine learning algorithms for natural language processing. Implementing and testing various ML models using Python and TensorFlow.",
      skills: ["Python", "TensorFlow", "Machine Learning", "NLP"],
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<WorkExperience | null>(null)
  const [newForm, setNewForm] = useState<Omit<WorkExperience, "id">>({
    company: null,
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: [],
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const handleEdit = (exp: WorkExperience) => {
    setEditingId(exp.id)
    setEditForm({ ...exp })
  }

  const handleSave = () => {
    if (editForm) {
      setExperiences((prev) => prev.map((exp) => (exp.id === editForm.id ? editForm : exp)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const handleAdd = () => {
    const newExp: WorkExperience = {
      ...newForm,
      id: Date.now().toString(),
    }
    setExperiences((prev) => [newExp, ...prev])
    setNewForm({
      company: null,
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: [],
    })
    setIsAdding(false)
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
                      <Label htmlFor="new-position">Position</Label>
                      <Input
                        id="new-position"
                        value={newForm.position}
                        onChange={(e) => setNewForm({ ...newForm, position: e.target.value })}
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div  className="flex flex-col space-y-2">
                      <Label>Company</Label>
                      <CompanyAutoComplete
                        apiKey={process.env.NEXT_PUBLIC_LOGODEV_API_KEY!}
                        value={newForm.company?.name || ""}
                        onChange={(val) => setNewForm({ ...newForm, company: { 
                          name: val.name, 
                          domain: val.domain || "", 
                          logo_url: val.logo_url || "" 
                        }})}
                        selectedCompany={newForm.company}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-start">Start Date</Label>
                      <Input
                        id="new-start"
                        type="month"
                        value={newForm.startDate}
                        onChange={(e) => setNewForm({ ...newForm, startDate: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="new-end">End Date</Label>
                      <Input
                        id="new-end"
                        type="month"
                        value={newForm.endDate}
                        onChange={(e) => setNewForm({ ...newForm, endDate: e.target.value })}
                        disabled={newForm.current}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-current"
                      checked={newForm.current}
                      onCheckedChange={(checked) =>
                        setNewForm({ ...newForm, current: !!checked, endDate: checked ? "" : newForm.endDate })
                      }
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
                    <Button variant="outline" onClick={() => setIsAdding(false)}>
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
                        <div className="flex flex-col space-y-2" >  
                          <Label htmlFor="edit-position">Position</Label>
                          <Input
                            id="edit-position"
                            value={editForm.position}
                            onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-company">Company</Label>
                          <CompanyAutoComplete
                            apiKey={process.env.NEXT_PUBLIC_LOGODEV_API_KEY!}
                            value={editForm.company?.name || ""}
                            onChange={(val) => setEditForm({ ...editForm, company: { 
                              name: val.name, 
                              domain: val.domain || "", 
                              logo_url: val.logo_url || "" 
                            }})}
                            selectedCompany={editForm.company}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-start">Start Date</Label>
                          <Input
                            id="edit-start"
                            type="month"
                            value={editForm.startDate}
                            onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="edit-end">End Date</Label>
                          <Input
                            id="edit-end"
                            type="month"
                            value={editForm.endDate}
                            onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                            disabled={editForm.current}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="edit-current"
                          checked={editForm.current}
                          onCheckedChange={(checked) =>
                            setEditForm({ ...editForm, current: !!checked, endDate: checked ? "" : editForm.endDate })
                          }
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
