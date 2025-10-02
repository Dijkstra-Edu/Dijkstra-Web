"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Plus, Heart, Save, X, Trash2 } from "lucide-react"

interface Volunteering {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  skills: string[]
  hoursContributed: number
}

export function Volunteering() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [volunteering, setVolunteering] = useState<Volunteering[]>([
    {
      id: "1",
      organization: "Code for Good",
      role: "Full-Stack Developer",
      startDate: "2023-09",
      endDate: "",
      current: true,
      description:
        "Developing web applications for non-profit organizations to help them manage their operations more efficiently. Leading a team of volunteer developers on various projects.",
      skills: ["React", "Node.js", "Project Management", "Team Leadership"],
      hoursContributed: 120,
    },
    {
      id: "2",
      organization: "Local Food Bank",
      role: "IT Support Volunteer",
      startDate: "2023-01",
      endDate: "2023-08",
      current: false,
      description:
        "Provided technical support for the food bank's computer systems and helped digitize their inventory management process.",
      skills: ["Technical Support", "Database Management", "Process Improvement"],
      hoursContributed: 80,
    },
    {
      id: "3",
      organization: "Youth Coding Bootcamp",
      role: "Mentor",
      startDate: "2022-06",
      endDate: "",
      current: true,
      description:
        "Mentoring high school students in programming fundamentals and helping them build their first web applications.",
      skills: ["Teaching", "Mentoring", "JavaScript", "Python"],
      hoursContributed: 200,
    },
  ])

  const [tempVolunteering, setTempVolunteering] = useState<Partial<Volunteering>>({})

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const totalHours = volunteering.reduce((sum, vol) => sum + vol.hoursContributed, 0)

  const handleEdit = (vol: Volunteering) => {
    setEditingId(vol.id)
    setTempVolunteering({ ...vol })
  }

  const handleSave = () => {
    if (editingId && tempVolunteering.id) {
      setVolunteering(
        volunteering.map((vol) => (vol.id === editingId ? { ...(tempVolunteering as Volunteering) } : vol)),
      )
      setEditingId(null)
      setTempVolunteering({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempVolunteering({})
  }

  const handleDelete = (id: string) => {
    setVolunteering(volunteering.filter((vol) => vol.id !== id))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setTempVolunteering({
      id: Date.now().toString(),
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: [],
      hoursContributed: 0,
    })
  }

  const handleAddSave = () => {
    if (tempVolunteering.organization && tempVolunteering.role) {
      setVolunteering([...volunteering, tempVolunteering as Volunteering])
      setIsAdding(false)
      setTempVolunteering({})
    }
  }

  const handleAddCancel = () => {
    setIsAdding(false)
    setTempVolunteering({})
  }

  const updateTempVolunteering = (field: keyof Volunteering, value: any) => {
    setTempVolunteering((prev) => ({ ...prev, [field]: value }))
  }

  const renderEditForm = (vol: Volunteering) => (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={tempVolunteering.organization || ""}
            onChange={(e) => updateTempVolunteering("organization", e.target.value)}
            placeholder="Organization"
          />
          <Input
            value={tempVolunteering.role || ""}
            onChange={(e) => updateTempVolunteering("role", e.target.value)}
            placeholder="Role"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="month"
            value={tempVolunteering.startDate || ""}
            onChange={(e) => updateTempVolunteering("startDate", e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="month"
            value={tempVolunteering.endDate || ""}
            onChange={(e) => updateTempVolunteering("endDate", e.target.value)}
            placeholder="End Date"
            disabled={tempVolunteering.current}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={tempVolunteering.current || false}
            onCheckedChange={(checked) => {
              updateTempVolunteering("current", checked)
              if (checked) updateTempVolunteering("endDate", "")
            }}
          />
          <label className="text-sm">Currently volunteering here</label>
        </div>
        <Input
          type="number"
          value={tempVolunteering.hoursContributed || 0}
          onChange={(e) => updateTempVolunteering("hoursContributed", Number.parseInt(e.target.value))}
          placeholder="Hours Contributed"
        />
        <Textarea
          value={tempVolunteering.description || ""}
          onChange={(e) => updateTempVolunteering("description", e.target.value)}
          placeholder="Description"
          rows={3}
        />
        <Input
          value={tempVolunteering.skills?.join(", ") || ""}
          onChange={(e) =>
            updateTempVolunteering(
              "skills",
              e.target.value.split(", ").filter((s) => s.trim()),
            )
          }
          placeholder="Skills (comma separated)"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button size="sm" variant="destructive" onClick={handleCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Volunteering
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{totalHours} hours contributed</Badge>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isEditing ? "destructive" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleAdd}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isAdding && (
            <div className="space-y-4">
              <h4 className="font-semibold">Add New Volunteering Experience</h4>
              {renderEditForm({} as Volunteering)}
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
                <Button size="sm" variant="destructive" onClick={handleAddCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {volunteering.map((vol) => (
            <div key={vol.id}>
              {editingId === vol.id ? (
                renderEditForm(vol)
              ) : (
                <div className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />

                  {isEditing && (
                    <div className="flex gap-2 mb-3">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(vol)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(vol.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Existing code */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <img
                        src={`/abstract-geometric-shapes.png?key=flpqa&height=48&width=48&query=${encodeURIComponent(`${vol.organization} organization logo`)}`}
                        alt={`${vol.organization} logo`}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{vol.role}</h4>
                        <p className="text-primary font-medium">{vol.organization}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>
                            {formatDate(vol.startDate)} - {vol.current ? "Present" : formatDate(vol.endDate)}
                          </span>
                          <span>{vol.hoursContributed} hours</span>
                          {vol.current && <Badge variant="secondary">Ongoing</Badge>}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{vol.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {vol.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
