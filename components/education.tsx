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

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  current: boolean
  description: string
}

export function Education() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2022-08",
      endDate: "2026-05",
      gpa: "3.8",
      current: true,
      description:
        "Relevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning, Software Engineering, Computer Networks",
    },
    {
      id: "2",
      institution: "Community College of San Francisco",
      degree: "Associate of Science",
      field: "Mathematics",
      startDate: "2020-08",
      endDate: "2022-05",
      gpa: "3.9",
      current: false,
      description: "Completed general education requirements and advanced mathematics courses",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Education | null>(null)
  const [newForm, setNewForm] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    current: false,
    description: "",
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id)
    setEditForm({ ...edu })
  }

  const handleSave = () => {
    if (editForm) {
      setEducation((prev) => prev.map((edu) => (edu.id === editForm.id ? editForm : edu)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id))
  }

  const handleAdd = () => {
    const newEdu: Education = {
      ...newForm,
      id: Date.now().toString(),
    }
    setEducation((prev) => [newEdu, ...prev])
    setNewForm({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      current: false,
      description: "",
    })
    setIsAdding(false)
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
                    <div>
                      <Label htmlFor="new-degree">Degree</Label>
                      <Input
                        id="new-degree"
                        value={newForm.degree}
                        onChange={(e) => setNewForm({ ...newForm, degree: e.target.value })}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-field">Field of Study</Label>
                      <Input
                        id="new-field"
                        value={newForm.field}
                        onChange={(e) => setNewForm({ ...newForm, field: e.target.value })}
                        placeholder="Computer Science"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-institution">Institution</Label>
                    <Input
                      id="new-institution"
                      value={newForm.institution}
                      onChange={(e) => setNewForm({ ...newForm, institution: e.target.value })}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="new-start">Start Date</Label>
                      <Input
                        id="new-start"
                        type="month"
                        value={newForm.startDate}
                        onChange={(e) => setNewForm({ ...newForm, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-end">End Date</Label>
                      <Input
                        id="new-end"
                        type="month"
                        value={newForm.endDate}
                        onChange={(e) => setNewForm({ ...newForm, endDate: e.target.value })}
                        disabled={newForm.current}
                      />
                    </div>
                    <div>
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
                      onCheckedChange={(checked) =>
                        setNewForm({ ...newForm, current: !!checked, endDate: checked ? "" : newForm.endDate })
                      }
                    />
                    <Label htmlFor="new-current">Currently studying here</Label>
                  </div>
                  <div>
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
                        <div>
                          <Label htmlFor="edit-degree">Degree</Label>
                          <Input
                            id="edit-degree"
                            value={editForm.degree}
                            onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-field">Field of Study</Label>
                          <Input
                            id="edit-field"
                            value={editForm.field}
                            onChange={(e) => setEditForm({ ...editForm, field: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-institution">Institution</Label>
                        <Input
                          id="edit-institution"
                          value={editForm.institution}
                          onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="edit-start">Start Date</Label>
                          <Input
                            id="edit-start"
                            type="month"
                            value={editForm.startDate}
                            onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-end">End Date</Label>
                          <Input
                            id="edit-end"
                            type="month"
                            value={editForm.endDate}
                            onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                            disabled={editForm.current}
                          />
                        </div>
                        <div>
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
                          onCheckedChange={(checked) =>
                            setEditForm({ ...editForm, current: !!checked, endDate: checked ? "" : editForm.endDate })
                          }
                        />
                        <Label htmlFor="edit-current">Currently studying here</Label>
                      </div>
                      <div>
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
                      <img
                        src={`/abstract-geometric-shapes.png?key=uovw9&height=48&width=48&query=${encodeURIComponent(`${edu.institution} university logo`)}`}
                        alt={`${edu.institution} logo`}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-primary font-medium">{edu.institution}</p>
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
